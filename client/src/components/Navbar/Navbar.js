import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import { AuthContext } from "../../context/auth-context";
import classes from "./navbar.module.css";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prevState) => !prevState);
    };

    let links = null;

    if (!auth.token) {
        links = (
            <ul className={classes.navUl}>
                <li>
                    <Link
                        to="/signin"
                        className={[classes.Link, classes.BtnInverse].join(" ")}
                    >
                        SIGNIN
                    </Link>
                </li>
                <li>
                    <Link
                        to="/signup"
                        className={[classes.Link, classes.BtnSolid].join(" ")}
                    >
                        SIGNUP
                    </Link>
                </li>
            </ul>
        );
    } else {
        links = (
            <ul className={classes.navUl}>
                <li>
                    <Link
                        to="/polls"
                        className={[classes.Link, classes.BtnInverse].join(" ")}
                    >
                        POLLS
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/profile`}
                        className={[classes.Link, classes.BtnInverse].join(" ")}
                    >
                        PROFILE
                    </Link>
                </li>
                <li>
                    <div
                        className={[classes.Link, classes.BtnSolid].join(" ")}
                        onClick={() => {
                            history.push('/');
                            auth.logout();
                        }}
                    >
                        LOGOUT
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <div className={classes.Toolbar}>
            <div className={classes.Navbar}>
                <nav className={classes.Nav}>
                    <Link to="/" className={classes.Brand}>
                        POLL BOOTH
                    </Link>
                    <FaBars
                        className={classes.Hamburger}
                        onClick={toggleSidebar}
                    />
                    {links}
                </nav>
            </div>
            <Sidebar isOpen={isOpen} clicked={toggleSidebar} />
        </div>
    );
};

export default Navbar;

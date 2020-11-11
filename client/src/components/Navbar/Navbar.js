import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./navbar.module.css";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prevState) => !prevState);
    };

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
                    <ul className={classes.navUl}>
                        <li>
                            <Link
                                to="/signin"
                                className={[classes.Link, classes.BtnInverse].join(' ')}
                            >
                                SIGNIN
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={[classes.Link, classes.BtnSolid].join(' ')}
                            >
                                SIGNUP
                            </Link>
                        </li>
                        {/* <li>
                            <NavLink
                                to="/gethired"
                                className={classes.Link}
                                activeClassName={classes.Selected}
                            >
                                Jobs
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <Sidebar isOpen={isOpen} clicked={toggleSidebar} />
        </div>
    );
};

export default Navbar;

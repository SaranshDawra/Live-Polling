import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { FaTimes } from "react-icons/fa";
import classes from "./sidebar.module.css";

const Sidebar = (props) => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const closeHandler = () => {
        history.push("/");
        auth.logout();
        props.clicked();
    };

    let links = null;

    if (!auth.token) {
        links = (
            <ul className={classes.sideUl}>
                <li className={classes.HeaderLi}>
                    <Link
                        to="/"
                        onClick={props.clicked}
                        className={classes.Menu}
                    >
                        HOME
                    </Link>
                    <FaTimes
                        className={classes.Cross}
                        onClick={props.clicked}
                    />
                </li>
                <li>
                    <Link
                        to="/signin"
                        className={classes.Link}
                        onClick={props.clicked}
                    >
                        SIGNIN
                    </Link>
                </li>
                <li>
                    <Link
                        to="/signup"
                        className={classes.Link}
                        onClick={props.clicked}
                    >
                        SIGNUP
                    </Link>
                </li>
            </ul>
        );
    } else {
        links = (
            <ul className={classes.sideUl}>
                <li className={classes.HeaderLi}>
                    <Link
                        to="/"
                        onClick={props.clicked}
                        className={classes.Menu}
                    >
                        HOME
                    </Link>
                    <FaTimes
                        className={classes.Cross}
                        onClick={props.clicked}
                    />
                </li>
                <li>
                    <Link
                        to="/polls"
                        className={classes.Link}
                        onClick={props.clicked}
                    >
                        POLLS
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/profile`}
                        className={classes.Link}
                        onClick={props.clicked}
                    >
                        PROFILE
                    </Link>
                </li>
                <li>
                    <div className={classes.Link} onClick={closeHandler}>
                        LOGOUT
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <div className={props.isOpen ? classes.Sidebar : classes.SidebarClosed}>
            <nav className={props.isOpen ? classes.Side : classes.SideClosed}>
                {links}
            </nav>
        </div>
    );
};

export default Sidebar;

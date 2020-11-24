import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import classes from "./sidebar.module.css";

const Sidebar = (props) => {
    return (
        <div
            className={
                props.isOpen ? classes.Sidebar : classes.SidebarClosed
            }
        >
            <nav
                className={
                    props.isOpen ? classes.Side : classes.SideClosed
                }
            >
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
            </nav>
        </div>
    );
};

export default Sidebar;

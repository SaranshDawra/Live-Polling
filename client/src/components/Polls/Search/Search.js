import React from "react";
import { FaSearch } from "react-icons/fa";
import classes from "./search.module.css";

const Search = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Form}>
                <form onSubmit={props.onSubmit}>
                    <span className={classes.SearchIcon}>
                        <FaSearch />
                    </span>
                    <input className={classes.Input} value={props.value} onChange={props.onChange} placeholder="Username"/>
                </form>
            </div>
        </div>
    );
};

export default Search;

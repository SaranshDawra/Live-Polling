import React from "react";
import StatBox from './StatBox/StatBox';
import classes from "./statscard.module.css";

const StatsCard = (props) => {

    return (
        <div className={classes.Container}>
            <StatBox count={props.total} heading="Total Polls"/>
            <StatBox count={props.totalUsers} heading="Total Users"/>
            <StatBox count={props.max} heading="Most Voted"/>
            <StatBox count={props.min} heading="Least Voted"/>
        </div>
    );
};

export default StatsCard;

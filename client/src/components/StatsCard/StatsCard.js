import React from "react";
import StatBox from './StatBox/StatBox';
import classes from "./statscard.module.css";

const StatsCard = () => {
    return (
        <div className={classes.Container}>
            <StatBox count="105"/>
            <StatBox count="2"/>
            <StatBox count="15"/>
            <StatBox count="1534"/>
        </div>
    );
};

export default StatsCard;

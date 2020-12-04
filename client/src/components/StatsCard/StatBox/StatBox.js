import React from 'react';
import classes from './statbox.module.css';

const StatBox = (props) => {
    return (
        <div className={classes.StatBox}>
                <div className={classes.Count}>{props.count}</div>
                <div className={classes.Heading}>{props.heading}</div>
        </div>
    )
}

export default StatBox;

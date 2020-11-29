import React from "react";
import classes from "./pollcard.module.css";

const Clickable = (props) => {
    return (
        <div className={classes.OptionCard} onClick={props.onClick}>
            {props.option}
        </div>
    );
};

const NonClickable = (props) => {
    return (
        <div className={classes.OptionCard}>
            {props.option}
            <div className={classes.Count}>{props.votes}</div>
        </div>
    );
};

const PollCard = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.PollSection}>
                <div className={classes.Question}>{props.data.question}</div>
                <div className={classes.OptionSection}>
                    {props.clickable ? (
                        <>
                            <Clickable
                                option={props.data.optionA}
                                onClick={() => props.clicked(0)}
                            />
                            <Clickable
                                option={props.data.optionB}
                                onClick={() => props.clicked(1)}
                            />
                        </>
                    ) : (
                        <>
                            <NonClickable
                                option={props.data.optionA}
                                votes={props.data.votesA.length}
                            />
                            <NonClickable
                                option={props.data.optionB}
                                votes={props.data.votesB.length}
                            />
                        </>
                    )}
                </div>
            </div>
            {props.delete && (
                <>
                    <div className={classes.Line}></div>
                    <div className={classes.Btn} onClick={props.clicked}>
                        <div className={classes.DeleteBtn}>DELETE POLL</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PollCard;

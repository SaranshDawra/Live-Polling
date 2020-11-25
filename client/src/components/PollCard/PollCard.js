import React from "react";
import classes from "./pollcard.module.css";

const Clickable = (props) => {
    return (
        <div className={classes.OptionCard} onClick={props.onClick}>
            {props.option}
            {
                props.votes ? <div className={classes.Count}>{props.votes}</div> : null
            }
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
                                option={props.data.options[0]}
                                votes={props.data.votes ? props.data.votes[0] : null}
                                onClick={() => props.clicked(0)}
                            />
                            <Clickable
                                option={props.data.options[1]}
                                votes={props.data.votes ? props.data.votes[1] : null}
                                onClick={() => props.clicked(1)}
                            />
                        </>
                    ) : (
                        <>
                            <NonClickable
                                option={props.data.options[0]}
                                votes={props.data.votes[0]}
                            />
                            <NonClickable
                                option={props.data.options[1]}
                                votes={props.data.votes[1]}
                            />
                        </>
                    )}
                </div>
            </div>
            {props.delete && (
                <>
                    <div className={classes.Line}></div>
                    <div className={classes.Btn}>
                        <div className={classes.DeleteBtn}>DELETE POLL</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PollCard;

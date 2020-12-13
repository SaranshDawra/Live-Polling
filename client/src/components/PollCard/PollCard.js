import React from "react";
import classes from "./pollcard.module.css";

const Clickable = (props) => {
    return (
        <div
            className={[classes.Option, classes.Clickable].join(" ")}
            onClick={props.onClick}
        >
            {props.option}
        </div>
    );
};

const NonClickable = (props) => {
    return (
        <div className={classes.Option}>
            {props.option}: {props.votes}
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
                                onClick={() => props.clicked(0)}
                                option={props.data.optionA}
                            />
                            <Clickable
                                onClick={() => props.clicked(1)}
                                option={props.data.optionB}
                            />
                            <Clickable
                                onClick={() => props.clicked(2)}
                                option={props.data.optionC}
                            />
                            <Clickable
                                onClick={() => props.clicked(3)}
                                option={props.data.optionD}
                            />
                        </>
                    ) : (
                        <>
                            <NonClickable
                                data={props.data}
                                option={props.data.optionA}
                                votes={props.data.votesA.length}
                            />
                            <NonClickable
                                data={props.data}
                                option={props.data.optionB}
                                votes={props.data.votesB.length}
                            />
                            <NonClickable
                                data={props.data}
                                option={props.data.optionC}
                                votes={props.data.votesC.length}
                            />
                            <NonClickable
                                data={props.data}
                                option={props.data.optionD}
                                votes={props.data.votesD.length}
                            />
                        </>
                    )}
                </div>
                <div>
                    {props.halted ? (
                        <>
                            <div className={classes.RedBullet}></div>
                            <div className={classes.Stopped}>Poll Stopped</div>
                        </>
                    ) : props.clickable ? (
                        <>
                            <div className={classes.GreenBullet}></div>
                            <div className={classes.Active}>Active</div>
                        </>
                    ) : (
                        <>
                            <div className={classes.YellowBullet}></div>
                            <div className={classes.Voted}>Already Voted</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollCard;

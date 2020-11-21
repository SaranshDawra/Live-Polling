import React from "react";
import classes from "./pollcard.module.css";

const PollCard = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.PollSection}>
                <div className={classes.Question}>
                    Laboris fugiat veniam ut anim mollit. Laboris fugiat veniam
                    ut tempor anim mollit. Laboris fugiat veniam ut tempor anim
                    mollit.
                </div>
                <div className={classes.OptionSection}>
                    <div className={classes.OptionCard}>
                        Pariatur reprehenderit amet est ex adipisicing nulla
                        commodo.
                        <div className={classes.Count}>
                            205
                        </div>
                    </div>
                    <div className={classes.OptionCard}>
                        Deserunt culpa esse deserunt adipisicing eu velit id
                        veniam et ea ea minim.
                        <div className={classes.Count}>
                            80
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.Line}></div>
            <div className={classes.Btn}>
                <div className={classes.DeleteBtn}>DELETE POLL</div>
            </div>
        </div>
    );
};

export default PollCard;

import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom';
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import classes from "./addpoll.module.css";

const AddPoll = () => {
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");

    const auth = useContext(AuthContext);
    const userId = auth.userId;

    const history = useHistory();

    const pollSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post(
                "/api/polls",
                {
                    question,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    userId,
                },
                {
                    headers: {
                        "Auth-Token": auth.token,
                    },
                }
            )
            .then((res) => {
                history.push('/polls');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.AddContainer}>
                    <form onSubmit={pollSubmitHandler} className={classes.Form}>
                        <div className={classes.Heading}>ADD POLL</div>
                        <div className={classes.Label}>Question</div>
                        <input
                            type="text"
                            required
                            placeholder="Favourite Sport?"
                            className={classes.Input}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div className={classes.Label}>Option A</div>
                        <input
                            type="text"
                            required
                            placeholder="Cricket"
                            className={classes.Input}
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                        />
                        <div className={classes.Label}>Option B</div>
                        <input
                            type="text"
                            required
                            placeholder="Football"
                            className={classes.Input}
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
                        />
                        <div className={classes.Label}>Option C</div>
                        <input
                            type="text"
                            required
                            placeholder="Tennis"
                            className={classes.Input}
                            value={optionC}
                            onChange={(e) => setOptionC(e.target.value)}
                        />
                        <div className={classes.Label}>Option D</div>
                        <input
                            type="text"
                            required
                            placeholder="Badminton"
                            className={classes.Input}
                            value={optionD}
                            onChange={(e) => setOptionD(e.target.value)}
                        />
                        <div className={classes.BtnContainer}>
                            <button
                                className={classes.Btn}
                                onClick={pollSubmitHandler}
                            >
                                CREATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPoll;

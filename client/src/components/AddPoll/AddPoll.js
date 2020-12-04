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
                            placeholder="How are you?"
                            className={classes.Input}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div className={classes.Label}>Option A</div>
                        <input
                            type="text"
                            required
                            placeholder="Good"
                            className={classes.Input}
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                        />
                        <div className={classes.Label}>Option B</div>
                        <input
                            type="text"
                            required
                            placeholder="Bad"
                            className={classes.Input}
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
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

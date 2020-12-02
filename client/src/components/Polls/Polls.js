import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUndoAlt } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Search from "./Search/Search";
import PollCard from "../PollCard/PollCard";
import { AuthContext } from "../../context/auth-context";
import classes from "./polls.module.css";
import axios from "axios";

const Polls = () => {
    const [value, setValue] = useState("");
    const [polls, setPolls] = useState([]);
    const auth = useContext(AuthContext);
    const userId = auth.userId;

    useEffect(() => {
        axios
            .get("/api/polls", {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((polls) => {
                setPolls(polls.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth.token]);

    const inputChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const getAllHandler = () => {
        axios
            .get("/api/polls", {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((polls) => {
                setPolls(polls.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        axios
            .get(`/api/user/${value}`, {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((user) => {
                if (user.data.hasOwnProperty("found") && !user.data.found) {
                    console.log(user.data.msg);
                } else {
                    axios
                        .get(`/api/polls/${user.data._id}`, {
                            headers: {
                                "Auth-Token": auth.token,
                            },
                        })
                        .then((poll) => {
                            console.log(poll.data);
                            if (poll && poll.data.length !== 0) {
                                setPolls(poll.data);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setValue("");
    };

    const voteDisplayHandler = (option, qid) => {
        console.log("Clicked", option);
        axios
            .put(
                `/api/polls/${qid}`,
                { option, userId },
                {
                    headers: {
                        "Auth-Token": auth.token,
                    },
                }
            )
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.ContainerFluid}>
                    <Search
                        value={value}
                        onChange={inputChangeHandler}
                        onSubmit={formSubmitHandler}
                    />
                </div>
                <div className={classes.IconBtn}>
                    <div>
                        <div className={classes.IconContainer}>
                            <Link className={classes.Link} to="/add/poll">
                                <FaPlus className={classes.Icon} />
                            </Link>
                        </div>
                        <h3 className={classes.Typo}>ADD A POLL</h3>
                    </div>
                    <div>
                        <div
                            className={classes.IconContainer}
                            onClick={getAllHandler}
                        >
                            <div className={classes.Link}>
                                <FaUndoAlt className={classes.Icon} />
                            </div>
                        </div>
                        <h3 className={classes.Typo}>GET ALL POLLS</h3>
                    </div>
                </div>

                <div className={classes.PollContainer}>
                    {polls.length === 0 && (
                        <>
                            <div className={classes.NoPolls}>
                                No Polls Found
                            </div>
                        </>
                    )}
                    {polls.map((poll) => {
                        if (poll.votes.includes(userId)) {
                            return (
                                <PollCard
                                    clickable={false}
                                    data={poll}
                                    key={poll._id}
                                />
                            );
                        } else {
                            return (
                                <PollCard
                                    clickable={true}
                                    data={poll}
                                    key={poll._id}
                                    clicked={(option) =>
                                        voteDisplayHandler(option, poll._id)
                                    }
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
};

export default Polls;

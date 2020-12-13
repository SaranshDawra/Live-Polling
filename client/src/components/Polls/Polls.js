import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUndoAlt, FaFilter } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Search from "./Search/Search";
import PollCard from "../PollCard/PollCard";
import { AuthContext } from "../../context/auth-context";
import classes from "./polls.module.css";
import axios from "axios";

const Polls = () => {
    const [value, setValue] = useState("");
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState({ err: false, msg: "" });
    const auth = useContext(AuthContext);
    const userId = auth.userId;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError({ err: false, msg: "" });
        }, 5000);

        return () => clearTimeout(timeout);
    }, [error]);

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
                    setError({ err: true, msg: "USER NOT FOUND" });
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

                            if (poll && poll.data.length === 0) {
                                setError({ err: true, msg: "NO POLLS FOUND" });
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

    const filterHandler = (e) => {
        console.log("Clicked", e.target.value);
        axios
            .get("/api/polls", {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((polls) => {
                setPolls(polls.data);
                if (e.target.value === "stopped") {
                    const pollCopy = polls.data.filter((poll) => {
                        if (poll.isHalted) {
                            return true;
                        }
                        return false;
                    });

                    setPolls(pollCopy);
                } else if (e.target.value === "active") {
                    const pollCopy = polls.data.filter((poll) => {
                        if (!poll.isHalted) {
                            return true;
                        }
                        return false;
                    });

                    setPolls(pollCopy);
                } else if(e.target.value === "latest") {
                    const pollCopy = [...polls.data];
                    pollCopy.reverse();
                    setPolls(pollCopy);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                {error.err ? (
                    <div className={classes.Error}>{error.msg}</div>
                ) : null}
                <div className={classes.ContainerFluid}>
                    <Search
                        value={value}
                        onChange={inputChangeHandler}
                        onSubmit={formSubmitHandler}
                    />
                </div>
            </div>
            <div className={classes.Poll}>
                <div className={classes.SideCard}>
                    <div className={classes.IconContainer}>
                        <span className={classes.Icon}>
                            <Link to="/add/poll" className={classes.Link}>
                                <FaPlus />
                            </Link>
                        </span>
                        <span className={classes.Title}>
                            <Link to="/add/poll" className={classes.Link}>
                                ADD POLL
                            </Link>
                        </span>
                    </div>
                    <div className={classes.IconContainer}>
                        <span className={classes.Icon} onClick={getAllHandler}>
                            <FaUndoAlt />
                        </span>
                        <span className={classes.Title} onClick={getAllHandler}>
                            ALL POLLS
                        </span>
                    </div>
                    <div className={classes.IconContainer}>
                        <span className={classes.Icon}>
                            <FaFilter />
                        </span>
                        <span className={classes.Title}>FILTER</span>
                        <div className={classes.Options}>
                            <input
                                type="radio"
                                name="options"
                                value="latest"
                                onChange={filterHandler}
                            />
                            <label htmlFor="latest">LATEST</label>
                            <br />
                            <input
                                type="radio"
                                name="options"
                                value="oldest"
                                onChange={filterHandler}
                            />
                            <label htmlFor="oldest">OLDEST</label>
                            <br />
                            <input
                                type="radio"
                                name="options"
                                value="active"
                                onChange={filterHandler}
                            />
                            <label htmlFor="active">ACTIVE</label>
                            <br />
                            <input
                                type="radio"
                                name="options"
                                value="stopped"
                                onChange={filterHandler}
                            />
                            <label htmlFor="stopped">STOPPED</label>
                            <br />
                        </div>
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
                        if (poll.votes.includes(userId) || poll.isHalted) {
                            return (
                                <PollCard
                                    clickable={false}
                                    data={poll}
                                    key={poll._id}
                                    halted={poll.isHalted}
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Search from "./Search/Search";
import PollCard from "../PollCard/PollCard";
import classes from "./polls.module.css";
import axios from "axios";

// const userId = "5fbfe3857fbcdf5b44acdb42";
const userId = "5fbfe36f7fbcdf5b44acdb41";
// const userId = "5fbebd9f0cab5953880f1334";

const Polls = () => {
    const [value, setValue] = useState("");
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        axios
            .get("/api/polls")
            .then((polls) => {
                setPolls(polls.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const inputChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        axios
            .get(`/api/user/${value}`)
            .then((user) => {
                if(user.data.hasOwnProperty("found") && !user.data.found) {
                    console.log(user.data.msg);
                } else {
                    axios
                    .get(`/api/polls/${user.data._id}`)
                    .then((poll) => {
                        setPolls(poll.data);
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
            .put(`/api/polls/${qid}`, { option, userId })
            .then(() => {
                window.location.reload();
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
                <div className={classes.IconContainer}>
                    <Link className={classes.Link} to="/add/poll">
                        <FaPlus className={classes.Icon} />
                    </Link>
                </div>
                <h3 className={classes.Typo}>ADD A POLL</h3>
                <div className={classes.PollContainer}>
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

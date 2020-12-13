import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AiOutlineStop } from "react-icons/ai";
import { FaTrashAlt, FaPlay } from "react-icons/fa";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import StatsCard from "../StatsCard/StatsCard";
import { AuthContext } from "../../context/auth-context";
import classes from "./profile.module.css";

const Profile = () => {
    const [profile, setProfile] = useState();
    const [total, setTotal] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pollId, setPollId] = useState("");

    const auth = useContext(AuthContext);
    const uid = auth.userId;

    useEffect(() => {
        axios
            .get(`/api/polls/${uid}`, {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((profile) => {
                setProfile(profile.data);
                statsHandler(profile.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [uid, auth.token]);

    const pollDeleteHandler = (qid) => {
        axios
            .delete(`/api/polls/${qid}`, {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((profile) => {
                setProfile(profile.data);
                statsHandler(profile.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const pollHaltHandler = (qid) => {
        axios
            .get(`/api/polls/halt/${qid}`, {
                headers: {
                    "Auth-Token": auth.token,
                },
            })
            .then((poll) => {
                const profileCopy = [...profile];
                profileCopy.forEach((item) => {
                    if (item._id === poll.data._id) {
                        item.isHalted = !item.isHalted;
                    }
                });
                setProfile(profileCopy);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const statsHandler = (data) => {
        setTotal(data.length);
        let min = 0,
            max = 0;
        data.forEach((poll) => {
            const tempMax = Math.max(
                poll.votesA.length,
                poll.votesB.length,
                poll.votesC.length,
                poll.votesD.length
            );
            if (tempMax > max) {
                max = tempMax;
            }

            const tempMin = Math.min(
                poll.votesA.length,
                poll.votesB.length,
                poll.votesC.length,
                poll.votesD.length
            );
            if (tempMin < min) {
                min = tempMin;
            }
        });

        setMax(max);
        setMin(min);

        const users = [];

        data.forEach((poll) => {
            poll.votes.forEach((uid) => {
                if (!users.includes(uid)) {
                    users.push(uid);
                }
            });
        });

        setTotalUsers(users.length);
    };

    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.InnerContainer}>
                    <Banner />
                    <div className={classes.PollSection}>
                        <StatsCard
                            total={total}
                            min={min}
                            max={max}
                            totalUsers={totalUsers}
                        />
                        <div className={classes.Polls}>
                            {profile && profile.length === 0 ? (
                                <div className={classes.NoPolls}>
                                    No Polls Found
                                </div>
                            ) : null}
                            {profile &&
                                profile.map((poll) => {
                                    const chartData = {
                                        labels: [
                                            poll.optionA,
                                            poll.optionB,
                                            poll.optionC,
                                            poll.optionD,
                                        ],
                                        datasets: [
                                            {
                                                label: "Poll Result",
                                                data: [
                                                    poll.votesA.length,
                                                    poll.votesB.length,
                                                    poll.votesC.length,
                                                    poll.votesD.length,
                                                ],
                                                backgroundColor: [
                                                    "rgba(255, 99, 132, 0.2)",
                                                    "rgba(54, 162, 235, 0.2)",
                                                    "rgba(255, 206, 86, 0.2)",
                                                    "rgba(75, 192, 192, 0.2)",
                                                ],
                                                borderColor: [
                                                    "rgba(255, 99, 132, 1)",
                                                    "rgba(54, 162, 235, 1)",
                                                    "rgba(255, 206, 86, 1)",
                                                    "rgba(75, 192, 192, 1)",
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    };

                                    return (
                                        <React.Fragment key={poll._id}>
                                            <div className={classes.Card}>
                                                <div
                                                    className={classes.Question}
                                                >
                                                    {poll.question}
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        if (
                                                            pollId === poll._id
                                                        ) {
                                                            setPollId("");
                                                        } else {
                                                            setPollId(poll._id);
                                                        }
                                                    }}
                                                    className={
                                                        classes.GraphView
                                                    }
                                                >
                                                    Graph View
                                                </div>
                                                {pollId === poll._id ? (
                                                    <Chart
                                                        cName={classes.Closed}
                                                        chartData={chartData}
                                                    />
                                                ) : (
                                                    <Chart
                                                        cName={classes.Open}
                                                        chartData={chartData}
                                                    />
                                                )}
                                                <div
                                                    className={classes.Line}
                                                ></div>
                                                <div
                                                    className={
                                                        classes.CardFooter
                                                    }
                                                >
                                                    {poll.isHalted ? (
                                                        <div
                                                            className={
                                                                classes.StatusStop
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    classes.Stop
                                                                }
                                                            ></div>
                                                            <div>Stopped</div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={
                                                                classes.StatusAct
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    classes.Active
                                                                }
                                                            ></div>
                                                            <div>Active</div>
                                                        </div>
                                                    )}
                                                    <div
                                                        className={
                                                            classes.IconContainer
                                                        }
                                                    >
                                                        {poll.isHalted ? (
                                                            <span
                                                                className={
                                                                    classes.IconSpan
                                                                }
                                                            >
                                                                <FaPlay
                                                                    className={
                                                                        classes.Icon
                                                                    }
                                                                    onClick={() =>
                                                                        pollHaltHandler(
                                                                            poll._id
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={
                                                                    classes.IconSpan
                                                                }
                                                            >
                                                                <AiOutlineStop
                                                                    className={
                                                                        classes.Icon
                                                                    }
                                                                    onClick={() =>
                                                                        pollHaltHandler(
                                                                            poll._id
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                        )}
                                                        <span
                                                            className={
                                                                classes.IconSpan
                                                            }
                                                        >
                                                            <FaTrashAlt
                                                                className={
                                                                    classes.Icon
                                                                }
                                                                onClick={() =>
                                                                    pollDeleteHandler(
                                                                        poll._id
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Chart = (props) => {
    return (
        <div className={props.cName}>
            <Bar data={props.chartData} />
        </div>
    );
};

export default Profile;

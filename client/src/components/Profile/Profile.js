import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import StatsCard from "../StatsCard/StatsCard";
import PollCard from "../PollCard/PollCard";
import { AuthContext } from "../../context/auth-context";
import classes from "./profile.module.css";

const Profile = () => {
    const [profile, setProfile] = useState();
    const [total, setTotal] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

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

    const statsHandler = (data) => {
        setTotal(data.length);
        let min = Number.MAX_VALUE,
            max = 0;
        data.forEach((poll) => {
            if (poll.votesA.length >= max) {
                max = poll.votesA.length;
            }
            
            if (poll.votesB.length >= max) {
                max = poll.votesB.length;
            }

            if (poll.votesA.length <= min) {
                min = poll.votesA.length;
            } 
            
            if (poll.votesB.length <= min) {
                min = poll.votesB.length;
            }
        });

        if(min === Number.MAX_VALUE) {
            min = 0;
        }

        setMax(max);
        setMin(min);

        const users = [];

        data.forEach(poll => {
            poll.votes.forEach(uid => {
                if(!users.includes(uid)) {
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
                        <StatsCard total={total} min={min} max={max} totalUsers={totalUsers}/>
                        <div className={classes.Polls}>
                            {profile && profile.length === 0 ? (
                                <div className={classes.NoPolls}>
                                    No Polls Found
                                </div>
                            ) : null}
                            {profile &&
                                profile.map((poll) => {
                                    return (
                                        <PollCard
                                            clickable={false}
                                            delete={true}
                                            data={poll}
                                            key={poll._id}
                                            clicked={() =>
                                                pollDeleteHandler(poll._id)
                                            }
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

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

    const auth = useContext(AuthContext);
    const uid = auth.userId;

    useEffect(() => {
        axios
            .get(`/api/polls/${uid}`)
            .then((profile) => {
                setProfile(profile.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [uid]);

    const pollDeleteHandler = (qid) => {
        axios
            .delete(`/api/polls/${qid}`)
            .then((profile) => {
                setProfile(profile.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.InnerContainer}>
                    <Banner />
                    <div className={classes.PollSection}>
                        <StatsCard />
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

import React from 'react';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import StatsCard from '../StatsCard/StatsCard';
import PollCard from '../PollCard/PollCard';
import classes from './profile.module.css';

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.InnerContainer}>
                    <Banner username="Saransh"/>
                    <div className={classes.PollSection}>
                        <StatsCard />
                        <div className={classes.Polls}>
                            <PollCard />
                            <PollCard />
                            <PollCard />
                            <PollCard />
                            <PollCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;

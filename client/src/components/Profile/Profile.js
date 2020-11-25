import React from 'react';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import StatsCard from '../StatsCard/StatsCard';
import PollCard from '../PollCard/PollCard';
import classes from './profile.module.css';

const DUMMY_DATA = {
    question: "Ea commodo reprehenderit irure do. Id non dolore eu officia. Ea commodo deserunt nostrud voluptate nulla culpa do et. Deserunt consectetur commodo mollit deserunt. ",
    options: [
        "Pariatur reprehenderit amet est ex adipisicing nulla commodo.",
        "Deserunt culpa esse deserunt adipisicing eu velit id veniam et ea ea minim."
    ],
    votes: [
        205, 80
    ]
};

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
                            <PollCard delete={true} data={DUMMY_DATA} clickable={false}/>
                            <PollCard delete={true} data={DUMMY_DATA} clickable={false}/>
                            <PollCard delete={true} data={DUMMY_DATA} clickable={false}/>
                            <PollCard delete={true} data={DUMMY_DATA} clickable={false}/>
                            <PollCard delete={true} data={DUMMY_DATA} clickable={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;

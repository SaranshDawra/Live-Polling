import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Search from "./Search/Search";
import PollCard from "../PollCard/PollCard";
import classes from "./polls.module.css";

const DUMMY_DATA = {
    question: "Deserunt culpa esse deserunt adipisicing eu velit id veniam et ea ea minim.",
    options: [
        "Pariatur reprehenderit amet est ex adipisicing nulla commodo.",
        "Deserunt culpa esse deserunt adipisicing eu velit id veniam et ea ea minim."
    ],
    votes: [
        205, 80
    ]
};

const Polls = () => {
    const [value, setValue] = useState("");

    const inputChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(value);
        setValue("");
    };

    const voteDisplayHandler = (option) => {
        console.log('Clicked', option);
    }

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
                    <PollCard data={DUMMY_DATA} clickable={true} clicked={voteDisplayHandler}/>
                    <PollCard data={DUMMY_DATA} clickable={true} clicked={voteDisplayHandler}/>
                    <PollCard data={DUMMY_DATA} clickable={true} clicked={voteDisplayHandler}/>
                </div>
            </div>
        </>
    );
};

export default Polls;

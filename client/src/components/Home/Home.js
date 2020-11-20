import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/innovation.svg";
import classes from "./home.module.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    return (
        <React.Fragment>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.Hero}>
                    <div className={classes.HeroText}>
                        <h2 className={classes.Heading}>
                            Lorem{" "}
                            <span className={classes.Highlight}>ipsum</span>{" "}
                            dolor sit amet, consectetur{" "}
                            <span className={classes.Highlight}>
                                adipiscing
                            </span>{" "}
                            elit. Morbi{" "}
                            <span className={classes.Highlight}>
                                ultricies.
                            </span>
                        </h2>
                        <p className={classes.SubHeading}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi ultricies.
                        </p>
                        <div className={classes.Btn}>
                            <Link to="/signin" className={classes.BtnLink}>
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className={classes.ImgContainer}>
                        <img
                            src={HeroImg}
                            alt="HeroImage"
                            className={classes.Img}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;

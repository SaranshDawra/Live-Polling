import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/innovation.svg";
import classes from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../context/auth-context";

const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <React.Fragment>
            <Navbar />
            <div className={classes.Container}>
                <div className={classes.Hero}>
                    <div className={classes.HeroText}>
                        <h2 className={classes.Heading}>
                            <span className={classes.Highlight}>
                                Poll Booth
                            </span>{" "}
                            is a <span className={classes.Highlight}>free</span>{" "}
                            live polling tool for engaging{" "}
                            <span className={classes.Highlight}>audience</span>{" "}
                            of all{" "}
                            <span className={classes.Highlight}>size</span>.
                        </h2>
                        <p className={classes.SubHeading}>
                            Capture powerful feedback instantly during virtual
                            meetings, classes, events, and more.
                        </p>
                        {!auth.token && (
                            <div className={classes.Btn}>
                                <Link to="/signin" className={classes.BtnLink}>
                                    Get Started
                                </Link>
                            </div>
                        )}
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

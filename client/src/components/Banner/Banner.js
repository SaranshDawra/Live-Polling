import React from "react";
import Img from "../../assets/pie_chart_isometric.svg";
import classes from "./banner.module.css";

const Banner = () => {
    return (
        <div className={classes.Banner}>
            <div className={classes.BannerText}>
                <h3>Welcome back!</h3>
                <div>
                    Increasing engagement and getting instant feedback has never
                    been easier. Polls take seconds to create. Type your
                    question and hit “Create”. That’s it!
                </div>
            </div>
            <div className={classes.ImgContainer}>
                <img src={Img} alt="banner-img" className={classes.BannerImg} />
            </div>
        </div>
    );
};

export default Banner;

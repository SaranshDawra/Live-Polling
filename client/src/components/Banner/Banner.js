import React from "react";
import Img from "../../assets/pie_chart_isometric.svg";
import classes from "./banner.module.css";

const Banner = () => {
    return (
        <div className={classes.Banner}>
            <div className={classes.BannerText}>
                <h3>Welcome back!</h3>
                <div>
                    Velit reprehenderit proident magna velit duis ea proident
                    occaecat ex nisi dolor consequat ullamco nisi.
                </div>
            </div>
            <div className={classes.ImgContainer}>
                <img src={Img} alt="banner-img" className={classes.BannerImg} />
            </div>
        </div>
    );
};

export default Banner;

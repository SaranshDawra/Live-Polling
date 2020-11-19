import React from "react";
import { Link } from "react-router-dom";
import classes from "./login.module.css";

const Login = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.TextArea}>
                <h2 className={classes.SignupTitle}>Hello, Friend!</h2>
                <p className={classes.SignupPara}>
                    Enter your personal details <br /> and start journey with
                    us.
                </p>
                <div className={classes.SignupBtn}>
                    <Link to="/signup" className={classes.SignupLink}>
                        SIGNUP
                    </Link>
                </div>
            </div>
            <div className={classes.FormContainer}>
                <h2 className={classes.Heading}>
                    Welcome To <br />{" "}
                    <Link to="/" className={classes.Title}>Poll Booth</Link>
                </h2>
                <form className={classes.Form}>
                    <div className={classes.InputDiv}>
                        <label htmlFor="Email" className={classes.Label}>
                            Email
                        </label>
                        <input
                            type="email"
                            className={classes.Field}
                            placeholder="test@test.com"
                        />
                    </div>
                    <div className={classes.InputDiv}>
                        <label htmlFor="Password" className={classes.Label}>
                            Password
                        </label>
                        <input
                            type="password"
                            className={classes.Field}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                        />
                    </div>

                    <button className={classes.Btn}>SIGNIN</button>
                </form>
                <Link to="/signup" className={classes.CreateAccount}>CREATE ACCOUNT</Link>
            </div>
        </div>
    );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import classes from "./signup.module.css";

const Signup = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.FormContainer}>
                <h2 className={classes.Heading}>
                    Create Account
                </h2>
                <form className={classes.Form}>
                    <div className={classes.InputDiv}>
                        <label htmlFor="Username" className={classes.Label}>
                            Username
                        </label>
                        <input
                            type="test"
                            className={classes.Field}
                            placeholder="John Doe"
                        />
                    </div>
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

                    <button className={classes.Btn}>SIGNUP</button>
                </form>
                <Link to="/signin" className={classes.CreateAccount}>
                    ALREADY HAVE AN ACCOUNT
                </Link>
            </div>
            <div className={classes.TextArea}>
                <h2 className={classes.SignupTitle}>Welcome Back!</h2>
                <p className={classes.SignupPara}>
                    To keep connected with us please <br /> login using your personal info.
                </p>
                <div className={classes.SignupBtn}>
                    <Link to="/signin" className={classes.SignupLink}>
                        SIGNIN
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

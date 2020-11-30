import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import classes from "./signup.module.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const auth = useContext(AuthContext);

    const signupHandler = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/signup", {
                username,
                email,
                password,
            })
            .then((user) => {
                console.log(user.data);
                auth.login(user.data.token, user.data.userId);
                history.push("/polls");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={classes.Container}>
            <div className={classes.FormContainer}>
                <h2 className={classes.Heading}>Create Account</h2>
                <form className={classes.Form} onSubmit={signupHandler}>
                    <div className={classes.InputDiv}>
                        <label htmlFor="Username" className={classes.Label}>
                            Username
                        </label>
                        <input
                            type="text"
                            className={classes.Field}
                            placeholder="John Doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={classes.Btn} onClick={signupHandler}>
                        SIGNUP
                    </button>
                </form>
                <Link to="/signin" className={classes.CreateAccount}>
                    ALREADY HAVE AN ACCOUNT
                </Link>
            </div>
            <div className={classes.TextArea}>
                <h2 className={classes.SignupTitle}>Welcome Back!</h2>
                <p className={classes.SignupPara}>
                    To keep connected with us please <br /> login using your
                    personal info.
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

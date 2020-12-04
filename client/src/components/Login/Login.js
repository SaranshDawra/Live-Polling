import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import classes from "./login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const history = useHistory();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [error]);

    const signinHandler = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/signin", {
                email,
                password,
            })
            .then((user) => {
                auth.login(user.data.token, user.data.userId);
                history.replace("/polls");
            })
            .catch((err) => {
                setError(true);
            });
    };

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
                        SIGN UP
                    </Link>
                </div>
            </div>
            <div className={classes.FormContainer}>
                <h2 className={classes.Heading}>
                    Welcome To <br />{" "}
                    <Link to="/" className={classes.Title}>
                        Poll Booth
                    </Link>
                </h2>
                <form className={classes.Form} onSubmit={signinHandler}>
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

                    {error ? (
                        <div className={classes.Err}>
                            Could not log you in, please check your credentials
                            and try again.
                        </div>
                    ) : null}

                    <button className={classes.Btn} onClick={signinHandler}>
                        SIGN IN
                    </button>
                </form>
                <Link to="/signup" className={classes.CreateAccount}>
                    CREATE ACCOUNT
                </Link>
            </div>
        </div>
    );
};

export default Login;

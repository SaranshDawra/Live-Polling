import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Polls from "./components/Polls/Polls";
import AddPoll from "./components/AddPoll/AddPoll";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/auth-context";

const App = () => {
    const { token, userId, login, logout } = useAuth();

    let router;
    if (!token) {
        router = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Redirect to="/" />
            </Switch>
        );
    } else {
        router = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profile/:uid" exact component={Profile} />
                <Route path="/polls" exact component={Polls} />
                <Route path="/add/poll" exact component={AddPoll} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <AuthContext.Provider
            value={{
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <Router>{router}</Router>
        </AuthContext.Provider>
    );
};

export default App;

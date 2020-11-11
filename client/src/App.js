import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact />
                <Route path="signup" exact />
            </Switch>
        </Router>
    );
};

export default App;

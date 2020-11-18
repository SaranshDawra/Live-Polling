import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

const App = () => {
    return (
        <Router>
            
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
            </Switch>
        </Router>
    );
};

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './Registration';
import LoginForm from './Login';

const App = () => {
    return ( <
        Router >
        <
        h1 > Сайт < /h1> <
        div >
        <
        Routes >
        <
        Route path = "/register"
        element = { < RegistrationForm / > }
        /> <
        Route path = "/login"
        element = { < LoginForm / > }
        /> <
        /Routes> <
        /div> <
        /Router>
    );
};

export default App;
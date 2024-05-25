import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( <
        div >
        <
        h1 > Home < /h1> <
        nav >
        <
        ul >
        <
        li > < Link to = "/registration" > Registration < /Link></li >
        <
        li > < Link to = "/edit" > Edit < /Link></li >
        <
        /ul> <
        /nav> <
        /div>
    );
};

export default Home;
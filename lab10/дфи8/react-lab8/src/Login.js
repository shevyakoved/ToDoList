import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth', { nickname, password });
            console.log(response.data);
            if (response) {
                window.location.replace('/')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return ( <
        form onSubmit = { handleLogin } >
        <
        input type = "text"
        placeholder = "Nickname"
        value = { nickname }
        onChange = {
            (e) => setNickname(e.target.value)
        }
        /> <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        /> <
        button type = "submit" > Login < /button> < /
        form >
    );
}

export default LoginForm;
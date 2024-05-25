import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user', ({ nickname, password }));
            console.log(response.data);
            if (response) {
                window.location.replace('/login')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return ( <
        form onSubmit = { handleRegister } >
        <
        input type = "text"
        placeholder = "Nickname"
        value = { nickname }
        onChange = {
            (e) => setNickname(e.target.value) }
        /> <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        /> <
        button type = "submit" > Register < /button> <
        /form>
    );
}

export default RegistrationForm;
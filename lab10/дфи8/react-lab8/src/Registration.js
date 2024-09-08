import React, { useState } from 'react';
import axios from 'axios';
import MoonLoader from 'react-spinners/MoonLoader';

function RegistrationForm() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loaderStyle = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/user', {
                nickname,
                password
            });

            console.log(response.data);

            if (response) {
                window.location.replace('/login');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input 
                type="text" 
                placeholder="Nickname" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)} 
            />

            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />

            <button type="submit">
                Register
            </button>

            <MoonLoader 
                loading={loading} 
                cssOverride={loaderStyle} 
                size={150} 
                aria-label="Loading Spinner" 
                data-testid="loader" 
            />
        </form>
    );
}

export default RegistrationForm;

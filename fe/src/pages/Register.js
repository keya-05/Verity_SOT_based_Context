import React from "react";
import './Registrations.css';
import { useState } from 'react'; 
import { Link } from 'react-router-dom';

function Register () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        //send rqst to backend to create account-later

        if (!username) {
            <Link to="/Dashboard"></Link>
        }
    }

    return (
        <div>
            <form className='RegisterForm' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                    placeholder='Username'
                    type="text"    
                    id="username" 
                    name="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                 />
                <br />
                <input 
                    placeholder='Email'
                    type="email"
                    id="email" 
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <br />
                <input 
                    placeholder='Password'
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    required

                />
                <br />
                <input 
                    placeholder='Confirm Password'
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
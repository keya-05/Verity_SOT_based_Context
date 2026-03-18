import React, { use } from 'react';
import './Registrations.css';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link,useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState(''); //''-initial state, variable name- username, 
    //function name- setUsername to change the state
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

     const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/api/auth/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, }) // state variables from your form
        });

        const data = await response.json();

        if (response.ok) {
            // Save to browser storage
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('username', data.user.username);

            // Redirect based on role
            if (data.user.role === 'admin') {
                navigate('/adminDashboard');
            } else {
                navigate('/userDashboard');
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Connection error:", error);
    }
};
    return (
        <div>
            <form className='LoginForm' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input 
                    placeholder='Username'
                    type="text"    
                    id="username" 
                    name="username"
                    value={username} //shows current state
                    onChange={(e) => setUsername(e.target.value)} // updates state when typing
                 />

                <br />
                <input 
                    placeholder='Password'
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
                <p>
                    <div className='divider'>
                        Or Continue with
                    </div>
                    <div className='SSO'>
                        <GoogleLogin 
                            onSuccess={ 
                                credentialResponse => {
                                console.log(credentialResponse);
                            }}   
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <p>Facebook</p>
                        <p>Outlook</p>
                    </div>
                </p>
                <p>Dont have an account?  
                <Link to="/Register">Signup</Link></p>
            </form>
        </div>
    );
}

export default Login;
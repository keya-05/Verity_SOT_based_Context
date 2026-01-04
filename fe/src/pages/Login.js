import React, { use } from 'react';
import './Login.css';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {

    const [username, setUsername] = useState(''); //''-initial state, variable name- username, 
    //function name- setUsername to change the state
    const [password, setPassword] = useState('');

     const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        //send rqst to backend to verify-later
     }
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
                <a href=''>Signup</a></p>
            </form>
        </div>
    );
}

export default Login;
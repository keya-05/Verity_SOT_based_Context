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

     const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }); 
            const data = await response.json(); // Parse backend response

            if (response.ok) {
                // Success!
                console.log("Login Success:", data);
                
                // 5. Redirect the user to Dashboard
                navigate('/AdminDashboard'); 
            } else {
                // Failure (Wrong password, etc.)
                alert(data.message || "Login failed");
            }
        } catch (error) { 
            console.error('Error during login:', error);
        }
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
                <Link to="/Register">Signup</Link></p>
            </form>
        </div>
    );
}

export default Login;
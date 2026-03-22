import React from "react";
import './Registrations.css';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import AdminDashboard from "../admin/AdminDashboard.js";

function Register () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [orgCode, setOrgCode] = useState('');

    const [showPassword, setshowPassword] = useState(false);

    const navigate = useNavigate();

    const validations = [
        { check: password.length >= 8, message: "8 chars," },
        { check: /[A-Z]/.test(password), message: "uppercase letter," },
        { check: /[a-z]/.test(password), message: "lowercase letter," },
        { check: /[0-9]/.test(password), message: "number," },
        { check: /[@$!%*?&]/.test(password), message: "special char (@$!%*?&)" }
    ];

    const isPasswordValid = validations.every((rule) => rule.check);

    const failedRules = validations.filter(rule => !rule.check);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        //send rqst to backend to create account-later

        if (!isPasswordValid) {
            alert("Please fix the password errors.");
            return;
        }

        try {
            const response =await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password, email, role, orgCode }),
            }); 
            
            const data = await response.json(); // Parse backend response

            if (response.ok) {
                console.log("Registration Success:", data);
                
                // 1. Save data to localStorage so the rest of the app knows who is logged in
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', role);
                
                // 2. Handle Admin vs User Navigation
                if (role === 'admin') {
                    // Alert the Admin with their new code!
                    alert(`Success! Your Organization Code is: ${data.orgCode}\n\nPlease save this and share it with your users.`);
                    
                    // Save the orgCode to local storage
                    if (data.orgCode) {
                        localStorage.setItem('orgCode', data.orgCode);
                    }
                    
                    navigate('/AdminDashboard'); 
                } else {
                    // It's a User
                    localStorage.setItem('orgCode', orgCode); // The one they typed into the form
                    navigate('/userDashboard');
                }
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) { 
            console.error('Error during registration:', error   
            )
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
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="role-select"
                    style={{width: '100%', padding: '10px', marginBottom: '10px'}}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <br />
                {role === 'user' && (
                    <>
                        <input 
                            placeholder='Organization Code'
                            type="text"
                            id="orgCode" 
                            name="orgCode"
                            value={orgCode}
                            onChange={(e)=> setOrgCode(e.target.value)}
                            required // Make it required only when it's visible
                        />
                        <br />
                    </>
                )}
                <div className="password-wrapper">
                    <input 
                        placeholder='Password'
                        type={showPassword ? "text": "password" }
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required

                    />
                    <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setshowPassword(!showPassword)}
                    >
                        { showPassword ? 
                            <img src="/images/hide.png" alt="Hide" style={{width:'20px', height:'20px'}} /> : 
                            <img src="/images/view.png" alt="View" style={{width:'20px', height:'20px'}} /> 
                        }
                    </button>
                </div>
                {password && (
                    <div className="validation-box">
                        {failedRules.map((rule, index) => (
                             <span key={index} style={{ color: 'red', fontSize: '12px' }}>
                                 {rule.message}
                            </span>
                        ))}
                    </div>
                )}
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
                <div>
                    <div className='divider'>
                        Or Continue with
                    </div>
                    <div className='SSO' style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <GoogleLogin 
                            type="icon"
                            shape="circle"
                            onSuccess={ 
                                credentialResponse => {
                                console.log(credentialResponse);
                            }}   
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />

                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
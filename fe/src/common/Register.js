import React from "react";
import './Registrations.css';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AdminDashboard from "../admin/AdminDashboard.js";

function Register () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                body: JSON.stringify({ username, password, email }),
            }); 
            
            const data = await response.json(); // Parse backend response

            if (response.ok) {
                // Success!
                console.log("Login Success:", data);
                
                navigate('/AdminDashboard'); 
            } else {
                alert(data.message || "Login failed");
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
            </form>
        </div>
    );
}

export default Register;
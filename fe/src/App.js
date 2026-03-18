import React, { useState } from 'react';
import './App.css';
import Login from './common/Login';
import Register from './common/Register';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';
import AboutUs from './common/About';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path ="/AdminDashboard" element={<AdminDashboard />} /> // redirect based on role- change needs to be made
        <Route path ="/UserDashboard" element={<UserDashboard />} /> // redirect based on role- change needs to be made
        <Route path="/" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;

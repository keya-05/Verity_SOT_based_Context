import React, { useState } from 'react';
import './App.css';
import Login from './common/Login';
import Register from './common/Register';
import Dashboard from './admin/Dashboard';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path ="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to ThoughtSphere</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;

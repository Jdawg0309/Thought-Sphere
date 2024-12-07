import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentProfile from './components/StudentProfile';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <div className='container'>
                <h1>Welcome to ThoughtSphere</h1>
            </div>
            } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentProfile" element={<StudentProfile />} />
      </Routes>
    </div>
  );
};

export default App;

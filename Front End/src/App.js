import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentProfile from './components/StudentProfile';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null); // State to manage logged-in user

  return (
    <div>
      {/* Pass user and setUser to Navbar */}
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="container">
              <h1>Welcome to ThoughtSphere</h1>
            </div>
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Student Profile Route */}
        <Route
          path="/studentProfile"
          element={
            user ? (
              <StudentProfile user={user} />
            ) : (
              <div className="container">
                <h2>Please log in to view your profile.</h2>
              </div>
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <div className="container">
                <h2>Please log in to access the dashboard.</h2>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;

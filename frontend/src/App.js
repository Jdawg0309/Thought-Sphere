import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentProfile from './components/StudentProfile';
import Dashboard from './components/Dashboard';
import FlashcardList from './components/FlashcardList'; // Import FlashcardList component

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<h1>Welcome to ThoughtSphere</h1>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/studentProfile"
          element={
            user ? (
              <StudentProfile user={user} />
            ) : (
              <h2>Please log in to view your profile.</h2>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <h2>Please log in to access the dashboard.</h2>
          }
        />
        <Route
          path="/flashcards"
          element={
            user ? <FlashcardList /> : <h2>Please log in to access your flashcards.</h2>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

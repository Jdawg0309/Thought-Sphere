import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentProfile from './components/StudentProfile';
import Dashboard from './components/Dashboard';
import FlashcardList from './components/FlashcardList';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={
          <div className="text-center mt-5">
            <h1>Welcome to ThoughtSphere</h1>
            <p>Revolutionize your learning experience with our unique flashcard system!</p>
          </div>
        } />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/studentProfile"
          element={
            user ? (
              <StudentProfile user={user} />
            ) : (
              <div className="alert alert-info text-center" role="alert">
                Please log in to view your profile.
              </div>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <div className="alert alert-info text-center" role="alert">
              Please log in to access the dashboard.
            </div>
          }
        />
        <Route
          path="/flashcards"
          element={
            user ? <FlashcardList /> : <div className="alert alert-info text-center" role="alert">
              Please log in to access your flashcards.
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

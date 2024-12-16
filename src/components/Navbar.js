import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../components/styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand" to="/">ThoughtSphere</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/studentProfile">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/flashcards">
                    Flashcards
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

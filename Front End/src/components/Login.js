import React, { useState } from 'react';
import '../components/styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Simulate successful login
    console.log('Logged In:', { email, password });
    setErrorMessage('');
    setIsLoggedIn(true); // Update state to show welcome message

    // Change the login button text dynamically
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.innerText = 'Logging In...';
      setTimeout(() => {
        loginButton.innerText = 'Logged In';
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button id="login-button" type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      ) : (
        <div className="welcome-message">
          <h2>Welcome, {email}!</h2>
          <p>You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Login;

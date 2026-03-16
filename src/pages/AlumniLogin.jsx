import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAlumniByEmail } from '../utils/localStorage';
import './AlumniLogin.css';

const AlumniLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = findAlumniByEmail(formData.email);

    if (!user || user.password !== formData.password) {
      setErrors({ email: "Invalid email or password" });
      setIsLoading(false);
      return;
    }

    // Save to localStorage & Update App state
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setUser(user); 
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Alumni Login</h2>
          <p>Welcome back to the alumni network</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {errors.email && <span className="error-msg">{errors.email}</span>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-footer">
            <p>New to our network? <a href="/alumni-register">Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumniLogin;
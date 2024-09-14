// src/components/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';


const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and success message before submission
    setErrors({});
    setSuccessMessage('');

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    try {
      // Sending form data to the backend API
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      if (response.data.success) {
        // Handle successful signup
        setSuccessMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          window.location.href = '/login'; // Adjust based on your routing setup
        }, 2000);
      } else {
        // Handle validation errors from the backend
        setErrors(response.data.errors || { general: 'An unexpected error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('Error in signup route:', error);
      if (error.response && error.response.data) {
        // Display specific error message from the backend
        setErrors(error.response.data.errors || { general: 'An unexpected error occurred. Please try again.' });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="header-content">
        
          <h1>Welcome to the ABC Restaurant</h1>
        </div>
      </div>

      {/* Signup Section */}
      <div className="login-container">
       
        <div className="auth-section">
          <h2>Signup Portal</h2>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="signup-username">Username</label>
              <input
                type="text"
                id="signup-username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            {/* Display general errors */}
            {errors.general && <div className="error">{errors.general}</div>}

            {/* Display success message */}
            {successMessage && <div className="success">{successMessage}</div>}

            <div className="btn-container">
              <button type="submit" className="auth-btn">Signup</button>
            </div>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

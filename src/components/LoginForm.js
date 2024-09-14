import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Ensure this CSS file has the correct styles or adapt as needed.
import companyLogo from '../assets/images/companylogo.png';
import loginImage from '../assets/images/loging.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
    setErrors({});
    setSuccessMessage('');

    try {
      // Sending form data to the backend API
      const response = await axios.post('http://localhost:5000/api/login', formData);

      if (response.data.success) {
        const { token, userId } = response.data; // Extract userId from response

        // Store the JWT token and userId in localStorage for future requests
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId); // Save userId in localStorage

        // Store user data in localStorage or Context (optional)
        localStorage.setItem('user', JSON.stringify({ email: formData.email, userId }));

        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/'); // Redirect to the homepage or another protected route
        }, 2000);
      } else {
        // Handle validation errors from the backend
        setErrors(response.data.errors || { general: 'An unexpected error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data) {
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
          <img src='' alt="" className="logo" />
          <h1>Welcome To The ABC Restaurant</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="login-container">
        <img src='' alt="" className="left-image" />
       

        <div className="auth-section">
          <h2>Login Portal</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {/* Display general errors */}
            {errors.general && <div className="error">{errors.general}</div>}

            {/* Display success message */}
            {successMessage && <div className="success">{successMessage}</div>}

            <div className="btn-container">
              <button type="submit" className="auth-btn">Login</button>
            </div>
          </form>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

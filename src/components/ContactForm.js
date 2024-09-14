// src/components/ContactForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactForm = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for userId from localStorage
  const storedUserId = localStorage.getItem('userId') || '';

  // State for success or error messages
  const [responseMessage, setResponseMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', {
        ...formData,
        userId: storedUserId, // Include userId if available
      });

      // Handle successful submission
      if (response.status === 201) {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      // Handle errors
      setResponseMessage('Failed to send your message. Please try again.');
      console.error('Error sending contact form:', error);
    }
  };

  return (
    <main className="contact-container" >
      {/* Left Section: Restaurant Image */}
      <section className="contact-info">
      <img src='' alt="" className="restaurant-image" />
      </section>

      {/* Right Section: Contact Form */}
      <section className="contact-form">
        <h2>Contact Form</h2>

        <form onSubmit={handleSubmit} >
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px', padding: '8px' }}
          />

          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px', padding: '8px' }}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
         
          ></textarea>

          <button type="submit" >
            Submit
          </button>

          {/* Response message display */}
          {responseMessage && <p>{responseMessage}</p>}
        </form>
      </section>
    </main>
  );
};

export default ContactForm;

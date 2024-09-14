// src/components/Reservation.js
import React, { useState } from 'react';
import axios from 'axios';
import './Reservation.css'; // Ensure you have corresponding styles





const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    seats: 1,
    paymentSlip: null,
  });

  const [loading, setLoading] = useState(false);

  // Get stored userId from localStorage
  const storedUserId = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'paymentSlip') {
      setFormData({ ...formData, paymentSlip: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append('userId', storedUserId); // Append userId to the form data
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/reservations/reserve',
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(`Reservation successful! Your Reservation ID is: ${response.data.reservationId}`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        seats: 1,
        paymentSlip: null,
      });
    } catch (error) {
      alert('Failed to make a reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='reservation-main'>
    
    <section id="reservation-section">
      <div className="creative-content">
        
      

       
      </div>

      <div className="reservation-form">
        <h2>Reservation Form</h2>
        <form onSubmit={handleSubmit} id="reservation-form-details">
          <div className="form-field">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="seats">Number of Seats:</label>
            <input
              type="number"
              id="seats"
              name="seats"
              min="1"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="paymentSlip">Payment Slip:</label>
            <input
              type="file"
              id="paymentSlip"
              name="paymentSlip"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="reserve-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Reserve'}
            </button>
          </div>
        </form>
      </div>
    </section>
    </div>
  );
};

export default Reservation;

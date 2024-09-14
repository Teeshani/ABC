// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have corresponding styles

const UserDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorReservations, setErrorReservations] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  const [statuses, setStatuses] = useState({}); // For managing status changes

  // Get stored userId from localStorage
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchReservations = async () => {
      if (!storedUserId) {
        setErrorReservations('No user ID found');
        setLoadingReservations(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/userreservations', {
          params: { userId: storedUserId }, // Pass userId as query parameter
        });
        setReservations(response.data);
      } catch (error) {
        setErrorReservations('Failed to fetch reservations');
      } finally {
        setLoadingReservations(false);
      }
    };

    const fetchOnlineOrders = async () => {
      if (!storedUserId) {
        setErrorOrders('No user ID found');
        setLoadingOrders(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/user-online-orders', {
          params: { userId: storedUserId }, // Pass userId as query parameter
        });
        setOnlineOrders(response.data);

        // Initialize statuses state
        const initialStatuses = response.data.reduce((acc, order) => {
          acc[order._id] = order.status || 'Pending';
          return acc;
        }, {});
        setStatuses(initialStatuses);
      } catch (error) {
        setErrorOrders('Failed to fetch online orders');
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchReservations();
    fetchOnlineOrders();
  }, [storedUserId]);

  const handleStatusChange = (orderId) => (e) => {
    setStatuses({ ...statuses, [orderId]: e.target.value });
  };

  const handleStatusSubmit = async (e, orderId) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/update-order-status', {
        orderId,
        status: statuses[orderId],
      });
      alert('Order status updated successfully.');
    } catch (error) {
      alert('Failed to update order status.');
    }
  };

  return (
    <div className="dashboard">
           <h2 className="section-featurestitle">Your History</h2>
      <section id="reservation-list-container">
        <h2>Reservations</h2>
        {loadingReservations ? (
          <p>Loading reservations...</p>
        ) : errorReservations ? (
          <p>{errorReservations}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Reservation ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.userId}</td>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>{new Date(reservation.date).toLocaleDateString()}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.seats}</td>
                  <td>{reservation.status || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section id="online-order-list-container">
        <h2>Online Order</h2>
        {loadingOrders ? (
          <p>Loading online orders...</p>
        ) : errorOrders ? (
          <p>{errorOrders}</p>
        ) : (
          <table id="OnlineOrdertable">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Order ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Payment Method</th>
                <th>Order Details</th>
                <th>Total Price</th>
                <th>Timestamp</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {onlineOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.userId}</td>
                  <td>{order.orderId}</td>
                  <td>{order.billingDetails.firstName}</td>
                  <td>{order.billingDetails.lastName}</td>
                  <td>{order.billingDetails.address}</td>
                  <td>{order.billingDetails.contact}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.cartItems.map((item, index) => (
                      <div key={index}>
                        {item.product_name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{order.newTotal}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    {order.status || 'Pending'}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;

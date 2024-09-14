// src/components/OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './OrderConfirmation.css'; // Add styles as needed

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve the stored userId from localStorage

  useEffect(() => {
    if (!userId) {
      toast.error('You must be logged in to view order details.');
      navigate('/login');
      return;
    }

    // Fetch the latest order for the logged-in user
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/latest/${userId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to fetch order details.');
        navigate('/'); // Redirect to the homepage or another fallback page
      }
    };

    fetchOrderDetails();
  }, [userId, navigate]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <p>Order ID: <strong>{order.orderId}</strong></p>
      <p>Thank you for your purchase, {order.billingDetails.firstName}!</p>

      <div className="order-details">
        <h2>Order Summary2</h2>
        <ul>
          {order.cartItems && order.cartItems.length > 0 ? (
            order.cartItems.map((item) => (
              <li key={item.productId}>
                {item.product_name} - {item.size} x {item.quantity} - LKR{' '}
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))
          ) : (
            <li>No items found</li>
          )}
        </ul>
        
        <p>Gems Discount: LKR {order.discountAmount.toFixed(2)}</p>
        <p>Final Total: LKR {order.newTotal.toFixed(2)}</p>
      </div>

      <div className="billing-details">
        <h2>Billing Information</h2>
        <p>
          <strong>Name:</strong> {order.billingDetails.firstName}{' '}
          {order.billingDetails.lastName}
        </p>
        <p>
          <strong>Email:</strong> {order.billingDetails.email}
        </p>
        <p>
          <strong>Contact No:</strong> {order.billingDetails.contact}
        </p>
        <p>
          <strong>Address:</strong> {order.billingDetails.address},{' '}
          {order.billingDetails.district}
        </p>
      </div>

      <div className="payment-method">
        <h2>Payment Method</h2>
        <p>{order.paymentMethod}</p>
      </div>

      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;

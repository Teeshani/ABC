import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const [userGems, setUserGems] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    address: '',
    district: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the subtotal
    const calculateSubTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(calculateSubTotal);
    setNewTotal(calculateSubTotal - discountAmount);

    // Fetch user gems from backend if logged in
    if (user && user.isLoggedIn) {
      fetchUserGems();
    }
  }, [cart, discountAmount]);

  const fetchUserGems = async () => {
    try {
      const response = await axios.get(`/api/user-gems/${user.id}`);
      setUserGems(response.data.gems || 0);
    } catch (error) {
      console.error('Error fetching user gems:', error);
      toast.error('Failed to fetch gems data.');
    }
  };

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    const maxDiscount = userGems * 0.1; // Assuming 1 gem = 0.1 LKR discount
    setDiscountAmount(Math.min(maxDiscount, subTotal));
    setNewTotal(subTotal - discountAmount);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    

    // Fetch userId from localStorage
  const storedUserId = localStorage.getItem('userId');

  if (!storedUserId) {
    toast.error('Please log in to proceed with the order.');
    navigate('/login');
    return;
  }

    try {
      const orderDetails = {
        userId: storedUserId, // Use the userId from localStorage,
        cartItems: cart,
        billingDetails,
        paymentMethod,
        discountAmount,
        newTotal,
      };
      console.log('Order Details:', orderDetails); 

      // Send order details to the backend
      await axios.post('http://localhost:5000/api/orders', orderDetails);
      clearCart(); // Clear the cart after successful order
      toast.success('Order placed successfully!');
      navigate('/Confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order.');
    }
  };

  return (
    <div className="checkout-container">
      <div className="left-contents">
        <div className="order-summary">
          <h2>Your Order:</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.productId}>
                <span>{`${item.product_name} - ${item.size} x ${item.quantity}`}</span>
                <span>LKR {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p>SubTotal: LKR {subTotal.toFixed(2)}</p>
          <p>Gems Discount: LKR {discountAmount.toFixed(2)}</p>
          <p>Final Total: LKR {newTotal.toFixed(2)}</p>
        </div>

        
      </div>

      <div className="container">
        <div className="checkout-form">
          <form onSubmit={handlePlaceOrder}>
            <h2>Billing Details</h2>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={billingDetails.firstName}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={billingDetails.lastName}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={billingDetails.email}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Contact No:</label>
              <input
                type="text"
                value={billingDetails.contact}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, contact: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                value={billingDetails.address}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, address: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>District:</label>
              <select
                value={billingDetails.district}
                onChange={(e) =>
                  setBillingDetails({ ...billingDetails, district: e.target.value })
                }
                required
              >
                <option value="">Select District</option>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                {/* Add more districts as needed */}
              </select>
            </div>

            <div className="form-group">
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="CashOnDelivery">Cash On Delivery</option>
                <option value="credit_card">Credit Card</option>
              </select>
            </div>

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

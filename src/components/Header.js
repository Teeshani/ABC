// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Header.css';

import searchImage from '../assets/images/search.png';
import userImage from '../assets/images/user.png';
import cartImage from '../assets/images/shopping-cart.png';

import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { cart, clearCart } = useCart();
  const { user, handleLogout } = useUser();
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate(); 
  
  const calculateSubtotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cart]); // Recalculate subtotal whenever cart changes

  return (
    <header>
      <div id="overlay"></div>
      <div className="top-row">
        <div className="logo-container">
          
          <div id="logo">ABC Restaurant</div>
        </div>

        <nav>
          <button className="hamburger" id="hamburgerBtn">
            <img src="/resources/hamburger.png" alt="Menu" />
          </button>
          <ul id="navList">
            <li className="search-icon">
              <a href="#" id="search-icon-link">
                <img id="search-icon-img" src={searchImage} alt="Search Icon" />
              </a>
            </li>
            <div id="search-bar" style={{ display: 'none' }}>
              <div className="search-container">
                <input type="text" id="search-input" placeholder="Search..." />
                <div id="search-results" className="search-results"></div>
              </div>
            </div>

            <li>
              <div className="cart-container">
                <div className="cart-icon">
                  <img src={cartImage} alt="Shopping Cart Icon" />
                  <div className="cart-dropdown">
                    {cart.length > 0 ? (
                      <>
                        <div className="cart-items">
                          {cart.map((item, index) => (
                            <div className="cart-item" key={index}>
                              <img
                                src={`http://localhost:5000/images/${item.main_image}`}
                                alt={item.product_name}
                                className="cart-item-image"
                              />
                              {item.product_name} <br /> X {item.quantity}
                              <br /> LKR {(item.price * item.quantity).toFixed(2)}
                            </div>
                          ))}
                        </div>
                        <div className="price-section" >
                          <p className="sub">SubTotal: LKR {subtotal.toFixed(2)}</p>
                        </div>
                        <div className="cart-butt">
                          <button className="checkout-butt" onClick={() => navigate('/checkout')}>
                            Go to Checkout
                          </button>
                          <button className="clear-cart-butt" onClick={clearCart}>
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="empty-cart">Your cart is empty</div>
                    )}
                  </div>
                </div>
              </div>
            </li>

           

            <li className="account-dropdown">
              <a href="#" onClick={toggleDropdown}>
                <img src={userImage} alt="User Account" className="login-icon" />
              </a>
              <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                {user ? (
                  <>
                    <Link to="/dashboard">Profile</Link>
                    <Link to="/history">Order History</Link>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="bottom-section">
      <nav>
      <ul>
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/overview" activeClassName="active" className="nav-link">
            Overview
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/menu" activeClassName="active" className="nav-link">
            Menu
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/reservation" activeClassName="active" className="nav-link">
            Reservation
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/gallery" activeClassName="active" className="nav-link">
            Gallery
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/facilities" activeClassName="active" className="nav-link">
            Facilities
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/Offers" activeClassName="active" className="nav-link">
            Offers
          </NavLink>
        </li>

        <li className="nav-item has-dropdown">
          <NavLink to="/contact" activeClassName="active" className="nav-link">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
      </div>
    </header>
  );
};


export default Header;
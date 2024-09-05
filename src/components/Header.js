// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css'; // Make sure your CSS file path is correct
import companylogoImage from '../assets/images/companylogo.png';
import searchImage from '../assets/images/search.png';
import userImage from '../assets/images/account.png';
import cartImage from '../assets/images/shopping-bag.png';
import wishlistImage from '../assets/images/love.png';


const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [gemCount, setGemCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch cart items and user details from backend or local storage
    fetchCartItems();
    fetchUserDetails();
  }, []);

  const fetchCartItems = () => {
    // Fetch cart items logic here (replace with your API endpoint)
    // For example: setCartItems([{product_name: 'Shirt', quantity: 1, size: 'M', product_price: 1500}]);
  };

  const fetchUserDetails = () => {
    // Fetch user details (like gem count and session info)
    // For example: setUser({ username: 'John Doe', gems: 20 });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const showCartDetails = () => {
    document.getElementById('cart-dropdown-content').style.display = 'block';
  };

  const hideCartDetails = () => {
    document.getElementById('cart-dropdown-content').style.display = 'none';
  };

  return (
    <header>
      <div id="overlay"></div>
      <div className="top-row">
        <div className="logo-container">
          <Link to="/">
            <img src={companylogoImage} alt="Signature Cuisine Logo" className="logoicon" />
          </Link>
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
                <div className="cart-icon" onMouseOver={showCartDetails} onMouseOut={hideCartDetails}>
                  <img src={cartImage} alt="Shopping Cart Icon" />
                  <div className="cart-dropdown" id="cart-dropdown-content">
                    {cartItems.length > 0 ? (
                      <div className="cart-items">
                        {cartItems.map((item, index) => (
                          <div className="cart-item" key={index}>
                            <img src={item.main_image} alt="Product Image" className="cart-item-image" />
                            {item.product_name} <br /> X {item.quantity} <br /> Size: {item.size}
                            <br /> LKR {item.product_price.toFixed(2)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-cart">Your cart is empty</div>
                    )}
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link to="/wishlist_items" className="wishlist-link">
                <div className="wishlist-ico">
                  <img src={wishlistImage} alt="Wishlist Icon" />
                </div>
              </Link>
            </li>

        

            <li className="account-dropdown">
              {user ? (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={userImage}  alt="User Account" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/history">Order History</Link>
                    <Link to="/logout">Logout</Link>
                  </div>
                </>
              ) : (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={userImage} alt="Login/Register" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                  </div>
                </>
              )}
            </li>
          </ul>
          
        </nav>
        </div>
        <div className="bottom-section">
          <nav>
            <ul>
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
             
            <li class="nav-item has-dropdown">
            <Link to="/overview">Overview</Link>
                
            </li>
            
            <li class="nav-item has-dropdown">
            <Link to="/overview">Menu</Link>
                
            </li>

            <li class="nav-item has-dropdown">
            <Link to="/overview">Reservation</Link>
                
            </li>
            </ul>
          </nav>
        </div>
      
    </header>
  );
};

export default Header;

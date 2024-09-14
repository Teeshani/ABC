// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Header.css';


import { useUser } from '../context/UserContext';

const AdminHeader = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { user, handleLogout } = useUser();



  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  

  return (
    <header>
      <div id="overlay"></div>
      <div className="top-row">
        <div className="logo-container">
          <Link to="/">
           
          </Link>
          <div id="logo">ABC Restaurant - Admin Dashboard</div>
        </div>

        <nav>
          
        <ul id="navList">
           

            <li className="account-dropdown">
              <a href="#" onClick={toggleDropdown}>
          
              </a>
              <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                {user ? (
                  <>
                    <Link to="/dashboard">Profile</Link>
                   
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
    </header>
  );
};


export default AdminHeader;
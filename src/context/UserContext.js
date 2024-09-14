// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for userId
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Fetch user details from backend
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

// src/services/api.js

const API_URL = 'http://localhost:5000/api';

// Function to make a reservation
export const makeReservation = async (reservationData) => {
    try {
        const response = await fetch(`${API_URL}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Propagate the error
    }
};

// Function to submit a query
export const submitQuery = async (queryData) => {
    try {
        const response = await fetch(`${API_URL}/queries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Propagate the error
    }
};

// Function to fetch carousel items
export const getCarousels = async () => {
    try {
        const response = await fetch(`${API_URL}/carousels`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Propagate the error
    }
};

// Function to fetch popular products
export const getPopularProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products/popular`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Propagate the error
    }
};



// Function to fetch a product by ID
export const getProductById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Propagate the error
    }
  };

  export const getSimilarProducts = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/similar/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch similar products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching similar products:', error);
      throw error;
    }
  };


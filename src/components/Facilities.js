// src/components/Facilities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Facilities.css'; 
import restImage from '../assets/images/restaurant.jpg';



const Facilities = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facilities');
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <main className='facilities-main'>
      {/* Overview Section */}
      <section className="overview-sec">
        <div className="overview-te">
          <h1>Facilities</h1>
          <p>ABC Restaurant offers a wide range of facilities to ensure a delightful dining experience for all our guests. From spacious indoor seating and scenic outdoor dining to free Wi-Fi and ample parking, we prioritize your comfort and convenience. Our restaurant is fully wheelchair accessible, making it welcoming for everyone. Families will love our dedicated kids' play area, and for special occasions, 
            we offer private dining rooms to host your celebrations.</p>
          
        </div>

        <div className="overview-imag">
        <img src={restImage} alt="" />
        
       

        </div>
      </section>

      {/* Facilities Display Section */}
      <section className="explore-section">
        {facilities.map((facility, index) => (
          <div className={`explore-content ${index % 2 === 0 ? 'even' : 'odd'}`} key={facility._id}>
            <img
              src={`http://localhost:5000/images/${facility.image}`}
              alt={facility.facility_name}
              className="explore-image"
             
            />
            <div className="explore-text">
              <h3>{facility.facility_name}</h3>
              <p>{facility.description}</p>
            </div>
          </div>
        ))}
      </section>

     

    </main>
  );
};

export default Facilities;

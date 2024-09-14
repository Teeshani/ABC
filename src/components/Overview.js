// src/components/Overview.js

import React from 'react';
import './Overview.css'; // Import your CSS file here
import restImage from '../assets/images/restaurant.jpg';
import popularImage from '../assets/images/populardish1.jpg';
import eximage from '../assets/images/conference_rooms.jpg';
import ex2image from '../assets/images/facilities.jpg';
import ex3image from '../assets/images/specialoffer.jpeg';


const Overview = () => {
  return (
    <div className='main-overview'>
      {/* Overview Main Content */}
      <section className="overview-section">
        <div className="overview-text">
          <h1>Welcome</h1>
          <p>
          At ABC Restaurant, we provide an exceptional dining experience that blends delicious cuisine, a warm ambiance, and excellent service. Our diverse menu features dishes crafted from the freshest ingredients, ensuring there's something to satisfy every taste. Whether you're enjoying a meal in our elegantly designed dining spaces or ordering takeout for the comfort of home, 
          we aim to make every moment memorable. 
          </p>
          <a href="/menu" className="cta-button">
            Explore Menu
          </a>
        </div>

        <div className="overview-images">
        <img src={restImage} alt="" />
      
       

        </div>
      </section>

      {/* Explore More Section */}
      <section className="explore-section">
        {/* First content block with image on the left */}
        <div className="explore-content">
          <img src={eximage}  alt="Explore Image 1" className="explore-image" />
          <div className="explore-text">
            <h3>Explore Location</h3>
            <p>
            Immerse yourself in breathtaking scenery as you dine with a panoramic view that captivates the senses. Whether it's the golden hues of a sunset, the serene calm of a lake, or a skyline adorned with city lights, 
            our picturesque setting offers the perfect backdrop for any occasion. Relax and unwind as the natural beauty around you complements your dining experience, creating a truly unforgettable moment.
            </p>
          </div>
        </div>

        {/* Second content block with image on the right */}
        <div className="explore-content reverse">
          <img src={ex2image} alt="Explore Image 2" className="explore-imagesecond" />
          <div className="explore-textsecond">
            <h3>Services</h3>
            <p>
            At ABC Restaurant, we offer a complete dining experience tailored to your needs. Whether you're dining in to enjoy our cozy atmosphere, ordering takeout for a night in, or booking us for a special event, our team is dedicated to providing exceptional service. With easy online reservations, fast delivery, and customizable menus, 
            we ensure every meal is a memorable one. Let us bring flavor and convenience to your table."
            </p>
            <a href="/facilities" className="explore-btn">
              Explore
            </a>
          </div>
        </div>
      </section>

      {/* Exclusive Offers Section */}
      <section className="explore-section">
        <div className="explore-content">
          <img  src={ex3image}  alt="Explore Image 1" className="explore-image3" />
          <div className="explore-text3">
            <h3>Offers</h3>
            <p>
            Enjoy unbeatable deals at ABC Restaurant with our exciting offers designed to satisfy your cravings without breaking the bank! From exclusive discounts on family meals to limited-time deals on your favorite dishes,
             there's always something special waiting for you
            </p>
            <a href="/offers" className="explore-btn">
              Explore 
            </a>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Overview;

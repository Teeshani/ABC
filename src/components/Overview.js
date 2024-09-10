// src/components/Overview.js

import React from 'react';
import './Overview.css'; // Import your CSS file here
import exploreImage from '../assets/images/explorearound.jpg';
import fitnessImage from '../assets/images/fitness_center.jpg';
import exclusiveImage from '../assets/images/Exlusive.jpeg';



const Overview = () => {
  return (
    <div className='main-cont'>
      {/* Overview Main Content */}
      <section className="overview-section">
        <div className="overview-text">
          <h1>ABC Restaurant</h1>
          <p>
          This provides a brief summary of the restaurant, highlighting key aspects such as its cuisine,
          atmosphere, location, and special offerings. It typically includes details like the type of food 
          served, dining style (casual, fine dining), and any unique features, aiming to give potential 
          customers a quick insight into what makes the restaurant stand out.
          </p>
          <a href="/menu" className="cta-button">
            Explore
          </a>
        </div>

        
      </section>

      {/* Explore More Section */}
      <section className="explore-section">
       
        <div className="explore-content">
          <img src={exploreImage}  alt="Explore Image 1" className="explore-image" />
          <div className="explore-text">
            <h3>Location</h3>
            <p>
            Our restaurant is located at 123 Main Street, Nawala Rajagiriya, near the Nawala Bridge. 
            We are a 5-minute walk from the Nawala bus stop and have ample parking available for diners. 
            The restaurant is easily accessible by public transportation, and we are close to popular 
            landmarks like the Rajagiriya Shopping Mall. You can find us on Google Maps for detailed 
            directions.
            </p>
          </div>
        </div>

        
        <div className="explore-content reverse">
          <img src={fitnessImage}  alt="Explore Image 2" className="explore-imagesecond" />
          <div className="explore-textsecond">
            <h3> Facilities</h3>
            <p>
            This section highlights the amenities available to guests, such as free Wi-Fi, outdoor
             seating, private dining areas, wheelchair accessibility, and parking. It may also include 
             features like a bar, live entertainment, or kid-friendly options, ensuring a comfortable and 
             enjoyable dining experience for all guests.
            </p>
            <a href="/facilities" className="explore-btn">
              Explore 
            </a>
          </div>
        </div>
      </section>

     
      <section className="explore-section">
        <div className="explore-content">
          <img src={exclusiveImage}  alt="Explore Image 1" className="explore-image3" />
          <div className="explore-text3">
            <h3>Exclusive offers </h3>
            <p>
            The exclusive offers section showcases special promotions, discounts, or deals available at the 
            restaurant. This may include seasonal discounts, happy hour specials, loyalty programs, 
            or limited-time offers on specific menu items, encouraging customers to take advantage of unique
            savings and dining experiences.
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

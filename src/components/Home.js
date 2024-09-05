// src/components/Home.js
import React from 'react';
import './Home.css';
import Carousel from './Carousel'; // Import the Carousel component
import NewArrivals from './NewArrivals'; // Import the Carousel component
import Testimonials from './Testimonials'; // Import the Testimonials component

import aboutImage from '../assets/images/about.jpg';
import specialImage from '../assets/images/specialoffer.jpeg';
import earlyImage from '../assets/images/earlybird.jpeg';
import getImage from '../assets/images/getonefree.jpeg';

import dish1Image from '../assets/images/grid1.jpg';
import dish4Image from '../assets/images/grid2.jpg';



function Home() {
  return (
    <div className="home">
      {/* Carousel Section */}
      <Carousel /> 

     

<h2 class="section-title">About Us</h2>
<section id="about-us">

 <div class="about-container">

 <img src={aboutImage} alt="About Us" class="about-img"/>

   <div class="about-text">
     <h3>Story</h3>
     <p>We began our journey in 2010 with a vision to bring world-class cuisine to the heart of the city. 
      Over the years, ABC Restaurant has become a landmark for culinary excellence, receiving numerous accolades and awards.</p>
     <h3>Commitment</h3>
     <p>At ABC Restaurant, we're dedicated to sourcing the finest ingredients, crafting exquisite dishes, and delivering an unparalleled dining experience.</p>
     <a href="overview.php" class="learn-more">Learn More</a>
   </div>

 </div>

</section>




{/* Menu Introduction Section */}
<section className="menu-introduction">
        <div className="intro-content">
          <h2>Discover Our Menu</h2>
          <p>
            Dive into the world of exquisite flavors and embark on a culinary journey like no other. 
            Every dish we serve has a story, an origin, and a soul of its own.
          </p>
          <a href="/menu" className="view-btn">View All</a>
        </div>

        <div className="images-grid">
          <img src={dish1Image} alt="Dish 1" />
          
          <img src={dish4Image} alt="Dish 4" />
        </div>
      </section>

      <section id="exclusive-offers">

  <h2>Exclusive Offers</h2>

  <div class="offers-container">

 
   <div class="offer-card">
    <img src={specialImage} alt="Offer Image 1"/>
    <h3>50% off</h3>
    <p>Satisfy your pizza cravings for half the price with our limited time offer: 
    50% off all pizzas! Treat yourself without breaking the bank.</p>
  
   </div>

   
   <div class="offer-card">
     <img src={getImage} alt="Offer Image 2"/>
     <h3>Get one free</h3>
     <p>Double your burger fun with our Buy one, get one free on all burgers offer! 
      This offer is valid for a limited time only, so don't miss!</p>
   
   </div>


   <div class="offer-card">
    <img src={earlyImage} alt="Offer Image 3"/>
    <h3>Early bird</h3>
    <p>Save money on a delicious meal and beat the rush with our early bird specials. 
     Available from 4pm to 7pm.</p>
    
   </div>

  </div>

   <div class="view-all">
    <a href="offers_page.php" class="view-all-b">View All</a>
   </div>

</section>


      


      
<NewArrivals /> 

      


    </div>
  );
}

export default Home;

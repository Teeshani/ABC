// src/components/Home.js
import React from 'react';
import './Home.css';

import Carousel from './Carousel'; 
import NewArrivals from './NewArrivals'; 

import aboutImage from '../assets/images/about.jpg';
import specialImage from '../assets/images/grid1.jpg';
import earlyImage from '../assets/images/specialoffer.jpeg';
import getImage from '../assets/images/getonefree.jpg';

import dish1Image from '../assets/images/grid1.jpg';


function Home() {
  return (
    <div className="home">
     
      <Carousel /> 
     
     

<h2 class="section-title">About</h2>
<section id="about-us">

 <div class="about-container">

 <img src={aboutImage} alt="About Us" class="about-img"/>

   <div class="about-text">
     <h3>Bit About Us</h3>
     <p>Discover a culinary journey at ABC. Our passion for cuisines shines through in every dish, 
      crafted with fresh, locally-sourced ingredients. Join us for a memorable dining experience.</p>
    
     <a href="overview.php" class="learn-more">Learn</a>
   </div>

 </div>

</section>



{/* Menu Introduction Section */}
<section className="menu-introduction">
        <div className="intro-content">
          <h2>Menu</h2>
          <p>
          Explore the flavors of ABC Restaurant with our diverse and mouth-watering menu. Whether you're craving savory starters, hearty main courses, or delightful desserts, we’ve got something to tantalize your taste buds. 
          Indulge in our chef's signature dishes made from the freshest ingredients, crafted to perfection just for you. 
          </p>
          <a href="/menu" className="view-button">View</a>
        </div>

        <div className="images-gr">
          <img src={dish1Image} alt="Dish 1" />
          
        </div>
      </section>

      <section id="exclusive-offers">

  <h2>Offers</h2>

  <div class="offers-container">

 
   <div class="offer-card">
    <img src={specialImage} alt="Offer Image 1"/>
    <h3>Family Feast Combo</h3>
    <p>
    Savor a delightful meal with our Family Feast Combo! Perfect for 4, enjoy an array of appetizers, main courses, and desserts, carefully curated to satisfy everyone's taste buds. 
    Available at a special price for a limited time.
    </p>
  
   </div>

   
   <div class="offer-card">
     <img src={getImage} alt="Offer Image 2"/>
     <h3>Weekday Lunch Special</h3>
     <p>
     Enjoy a delicious and budget-friendly lunch with our Weekday Lunch Special! 
     Choose from a variety of classic dishes at an unbeatable price, available Monday to Friday from 12 PM to 3 PM.
     </p>
   
   </div>


   <div class="offer-card">
    <img src={earlyImage} alt="Offer Image 3"/>
    <h3> Get One Free</h3>
    <p>
    Treat yourself with our Buy One, Get One Free offer! 
    Order any main dish and get a second one absolutely free. Hurry, this delicious deal won't last long!
    </p>
    
   </div>

  </div>

   <div class="view-all">
    <a href="/offers" class="view-all-b">View</a>
   </div>

</section>




      
<NewArrivals /> 

      


    </div>
  );
}

export default Home;

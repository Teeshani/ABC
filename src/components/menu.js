// frontend/src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import './menu.css'; 
import dish1Image from '../assets/images/grid1.jpg';
import dish2Image from '../assets/images/grid2.jpg';
import dish3Image from '../assets/images/grid3.jpg';
import dish4Image from '../assets/images/grid4.jpg';
import AllDishes from './AllDishes'; 
import AllBeverages from './AllBeverages'; 

const menu = () => {
  return (

    <div className="main-menu">
      {/* Menu Introduction Section */}
      <section className="menu-in">
        <div className="intro-c">
          <h2>Menu</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. 
          Curabitur vestibulum sapien sed neque facilisis, sit amet ullamcorper justo auctor.</p>
        </div>

        {/* Static images */}
        <div className="images-g">
        <img src={dish1Image} alt="Dish 1" />
          
          <img src={dish4Image} alt="Dish 4" />
        </div>
      </section>

      <AllDishes /> 
      
      <AllBeverages /> 
 
    </div>
     
  );
};

export default menu;

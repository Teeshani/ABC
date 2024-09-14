// frontend/src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import './menu.css'; 
import dish1Image from '../assets/images/grid1.jpg';
import dish2Image from '../assets/images/grid2.jpg';

import DiscountItems from './DiscountItems';

const menu = () => {
  return (

    <div className="main-menu">
      {/* Menu Introduction Section */}
      <section className="menu-in">
        <div className="intro-c">
          <h2>Offers </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. 
          Curabitur vestibulum sapien sed neque facilisis, sit amet ullamcorper justo auctor.</p>
        </div>

        {/* Static images */}
        <div className="images-g">
        <img src={dish1Image} alt="Dish 1" />
          <img src={dish2Image} alt="Dish 2" />
        
        </div>
      </section>

      
      
      <DiscountItems/>
     
    </div>
     
  );
};

export default menu;

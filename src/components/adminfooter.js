import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css'; 



const Footer = () => {
  return (
    <footer id="footer">
      <section id="Other-Details">
        <div className="branches">
          <h3>Branch Locations</h3>
   

          <div className="branch-locations">
            <div className="branch main-branch">
              <h4>Main Branch</h4>
              <p>Address: 456 Lakeview St, Hambanthota, Sri Lanka</p>
              <p>Contact: (94) 456-7890</p>
            </div>

            <div className="branch other-branch">
              <h4>Other Branch</h4>
              <p>Address: 246 Main St, Colombo, Sri Lanka</p>
              <p>Contact: (94) 765-4321</p>
            </div>
          </div>

          <div id="faq">
            <h4>©2024 ABC Restaurant All Rights Reserved</h4>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Footer.css'; // Make sure your CSS file path is correct
import companylogoImage from '../assets/images/companylogo.png';


const Footer = () => {
  return (
    <footer id="footer">
     

      <section id="Other-Details">
        <div className="branches">
          <h3>Locations</h3>
          <img src={companylogoImage} alt="Company Logo" />

          <div className="branch-locations">
            <div className="branch main-branch">
              <h4>Main Branch</h4>
              <p>Address: 456 Lakeview St, Sri Lanka</p>
              <p>Contact: (94) 456-7890</p>
            </div>

            <div className="branch other-branch">
              <h4>Other Branch</h4>
              <p>Address: Main St, Colombo, Sri Lanka</p>
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

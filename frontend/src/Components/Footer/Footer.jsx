// import React from 'react' // Import statement for React (commented out as it's not needed in React 17+)
import { assets } from '../../assets/assets'; // Import assets
import './Footer.css'; // Import the CSS file for styling

// Define the Footer component
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          {/* Display the company logo */}
          <img src={assets.logo} alt='' />
          {/* Display the footer text */}
          <p>
            Prices and availability are subject to change. Delivery times may vary based on location and traffic conditions. Please review your order before finalizing. For any issues or inquiries, contact our support team. Follow us on:
          </p>
          {/* Display social media icons */}
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          {/* Display company links */}
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Private Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          {/* Display contact information */}
          <ul>
            <li>+234 813 715 3234</li>
            <li>abdullaahjumah7@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      {/* Display copyright information */}
      <p className="footer-copyright">Copyright 2024 @ AbduLlaah.com - All Right Reserved</p>
    </div>
  );
};

export default Footer; // Export the Footer component

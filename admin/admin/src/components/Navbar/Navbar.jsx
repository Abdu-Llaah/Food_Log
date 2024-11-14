import React from 'react' // Import statement for React (commented out as it's not needed in React 17+)
import './Navbar.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Corrected the import statement for assets

// Define the Navbar component
const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Display the logo */}
      <img className='logo' src={assets.logo} alt="Logo" />
      {/* Display the profile image */}
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar; // Export the Navbar component

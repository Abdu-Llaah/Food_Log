// import React from 'react' // Import statement for React (commented out as it's not needed in React 17+)
import './Header.css'; // Import the CSS file for styling

// Define the Header component
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        {/* Display the main heading */}
        <h2>Order your favorite food here</h2>
        {/* Display the description text */}
        <p>
          Explore our diverse menu, offering a delightful selection of dishes made with the highest quality ingredients and expert culinary skill. Each meal is crafted to satisfy your cravings and enhance your dining experience, one exceptional bite at a time.
        </p>
        {/* Display the View Menu button */}
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header; // Export the Header component

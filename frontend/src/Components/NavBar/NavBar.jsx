import { useContext, useState } from 'react'; // Import necessary modules from React and other libraries
import './NavBar.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Import assets
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management

// Define the NavBar component with props
const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home"); // State to manage the active menu item
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State to manage profile dropdown visibility
  const { getTotalCartAmount, token, setToken, cartItems } = useContext(StoreContext); // Use the StoreContext to access cart amount, token, and setToken
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handler for logging out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setToken(null); // Clear the token in the context
    navigate("/"); // Navigate to the home page
  };

  // Handler to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev); // Toggle the profile dropdown
  };

  console.log('object', cartItems, cartItems?.length)

  return (
    <div className='navbar'>
      {/* Logo Link */}
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      {/* Navigation Menu */}
      <ul className="navbar-menu">
        {["home", "menu", "mobile-app", "contact-us"].map((item) => (
          <li key={item}>
            <Link 
              to={item === "home" ? '/' : `#${item}`}
              onClick={() => setMenu(item)}
              className={menu === item ? "active" : ""}
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right-side Icons */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt='Search Icon' />

        {/* Cart Icon with Dot */}
        <div className="navbar-search-icon">
          <Link to='/Cart'>
            <img src={assets.basket_icon} alt='Basket Icon' />
          </Link>
          {cartItems?.length > 0 && <div className="dot">{cartItems?.length}</div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile' onMouseLeave={() => setIsProfileDropdownOpen(false)}>
            <img src={assets.profile_icon} alt="Profile Icon" onClick={toggleProfileDropdown} />
            {isProfileDropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')} key="orders">
                  <img src={assets.bag_icon} alt="Bag Icon" />
                  <p>Orders</p>
                </li>
                <hr />
                <li key="logout" onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="Logout Icon" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar; // Export the NavBar component

// Import necessary libraries and assets
import { NavLink } from 'react-router-dom'; // NavLink for navigation with active styling
import { assets } from '../../assets/assets'; // Corrected the import statement for assets
import './Sidebar.css'; // Import CSS for sidebar styling

// Define the Sidebar component
const Sidebar = () => {
  return (
    <div className='sidebar'> {/* Container for the sidebar */}
        
        {/* Wrapper for sidebar options */}
        <div className="sidebar-options">
            
            {/* Link to the Add Items page */}
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="Add Icon" /> {/* Icon for Add Items */}
                <p>Add Items</p> {/* Text label for Add Items */}
            </NavLink>
            
            {/* Link to the List Items page */}
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="Order Icon" /> {/* Icon for List Items */}
                <p>List Items</p> {/* Text label for List Items */}
            </NavLink>
            
            {/* Link to the Orders page */}
            <NavLink to='/order' className="sidebar-option">
                <img src={assets.order_icon} alt="Order Icon" /> {/* Icon for Orders */}
                <p>Orders</p> {/* Text label for Orders */}
            </NavLink>
            
        </div>
    </div>
  );
};

// Export the Sidebar component as default
export default Sidebar;

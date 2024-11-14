// Import necessary libraries and components
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Navbar component for navigation
import Sidebar from "./components/Sidebar/Sidebar"; // Sidebar component for additional navigation
import Add from "./pages/Add/Add"; // Add page component for adding items
import List from "./pages/List/List"; // List page component for listing items
import Order from "./pages/Orders/Order"; // Order page component for managing orders
import { ToastContainer } from 'react-toastify'; // Toast container for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS for styling notifications

// Define the main App component
const App = () => {
  const url = "http://localhost:4000"; // Define the base URL for API requests
  return (
    <div>
      {/* Toast container to display notifications globally */}
      <ToastContainer />
      
      {/* Navbar component at the top of the app */}
      <Navbar />
      
      {/* Horizontal line separator */}
      <hr />
      
      {/* Main content area of the app */}
      <div className="app-content">
        
        {/* Sidebar component for navigation links */}
        <Sidebar />
        
        {/* Define routes for different pages */}
        <Routes>
          <Route path="/add" element={<Add url={url} />} /> {/* Route for Add page */}
          <Route path="/list" element={<List url={url} />} /> {/* Route for List page */}
          <Route path="/order" element={<Order url={url} />} /> {/* Route for Order page */}
        </Routes>
      </div>
    </div>
  );
};

// Export the App component as default
export default App;

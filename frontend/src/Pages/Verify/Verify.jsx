// import React fromt 'react'
import  { useContext, useEffect } from 'react'; // Import necessary modules from React and other libraries
import './Verify.css'; // Import the CSS file for styling
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useNavigate and useSearchParams from react-router-dom for navigation and URL parameters
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import axios from 'axios'; // Import axios for making HTTP requests

// Define the Verify component
const Verify = () => {
  const [searchParams] = useSearchParams(); // Hook to access URL parameters
  const success = searchParams.get("success"); // Get the 'success' parameter from the URL
  const orderId = searchParams.get("orderId"); // Get the 'orderId' parameter from the URL
  const { url } = useContext(StoreContext); // Use the StoreContext to access the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to verify the payment
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myorders"); // Navigate to the 'myorders' page if verification is successful
    } else {
      navigate("/"); // Navigate to the home page if verification fails
    }
  };

  // useEffect to verify payment when the component mounts
  useEffect(() => {
    verifyPayment();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className='verify'>
      <div className="spinner"></div> {/* Display a spinner while verifying */}
    </div>
  );
};

export default Verify; // Export the Verify component

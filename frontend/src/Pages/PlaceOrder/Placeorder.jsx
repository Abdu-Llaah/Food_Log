//use to display users address and info to place orders
import { useContext, useEffect, useState } from 'react'; // Import necessary modules from React and other libraries
import './placeorder.css'; // Import the CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

// Define the PlaceOrder component
const PlaceOrder = () => { 
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext); // Use the StoreContext to access necessary state and functions

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2; // Calculate the delivery fee
  const totalAmount = getTotalCartAmount() + deliveryFee; // Calculate the total amount

  // Local state for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: formData,
      items: orderItems,
      amount: totalAmount
    };
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  // useEffect to handle redirection if token is not available or cart is empty
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      {/* Left Section: Delivery Information */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="email" name="email" placeholder='Email Address' value={formData.email} onChange={handleChange} required />
        <input type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange} required />
        <div className="multi-fields">
          <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} required />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" placeholder='Zip Code' value={formData.zipCode} onChange={handleChange} required />
          <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} required />
        </div>
        <input type="text" name="phoneNumber" placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} required />
      </div>

      {/* Right Section: Cart Total Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount().toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${totalAmount.toFixed(2)}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder; // Export the PlaceOrder component

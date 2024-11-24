//use to display users address and info to place orders
import { useContext, useEffect, useState } from 'react'; // Import necessary modules from React and other libraries
import './placeorder.css'; // Import the CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

// Define the PlaceOrder component
const PlaceOrder = () => { 
  const { getTotalCartAmount, food_list, cartItems, url } = useContext(StoreContext); // Use the StoreContext to access necessary state and functions
  const token = localStorage.getItem('token')
  console.log('TOKEN', token)
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //useEffect(() => {console.log('formdata', formData)}, [formData])

  // Handler for form submission
  const [ loading, setLoading ] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item.id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: formData,
      items: cartItems,
      amount: totalAmount
    };
    try {
      setLoading(true)
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.log('object',response.data.data)
        alert('ERROR:',response.data.data);
      }
    } catch (error) {
      console.log('PLACE ORDER ERROR', error.response.data.data)
      alert('ERROR: ' + JSON.stringify(error.response.data.data));
    } finally {
      setLoading(false)
    }
  };

  const navigate = useNavigate();

  // useEffect to handle redirection if token is not available or cart is empty
  //useEffect(() => {
  //  if (!token) {
  //    //navigate('/cart');
  //    navigate('/cart');
  //  } else if (getTotalCartAmount() === 0) {
  //    navigate('/cart');
  //  }
  //}, [token, getTotalCartAmount, navigate]);

  return (
    <form className='place-order'>
      {/* Left Section: Delivery Information */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" id="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
          <input type="text" id="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
        </div>
        <input type="email" id="email" placeholder='Email Address' value={formData.email} onChange={handleChange} required />
        <input type="text" id="street" placeholder='Street' value={formData.street} onChange={handleChange} required />
        <div className="multi-fields">
          <input type="text" id="city" placeholder='City' value={formData.city} onChange={handleChange} required />
          <input type="text" id="state" placeholder='State' value={formData.state} onChange={handleChange} required />
        </div>
        <div className="multi-fields">
          <input type="text" id="zipCode" placeholder='Zip Code' value={formData.zipCode} onChange={handleChange} required />
          <input type="text" id="country" placeholder='Country' value={formData.country} onChange={handleChange} required />
        </div>
        <input type="text" id="phoneNumber" placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} required />
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
          <button disabled={loading} onClick={handleSubmit} className='place-order-button' type="submit">{ loading ? 'Please wait ....' : 'PROCEED TO PAYMENT'}</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder; // Export the PlaceOrder component

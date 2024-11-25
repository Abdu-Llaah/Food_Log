// import React from 'react'
import { useContext, useEffect, useState } from 'react'; // Import necessary modules from React and other libraries
import './MyOrders.css'; // Import the CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import axios from 'axios'; // Import axios for making HTTP requests
import { assets } from '../../assets/assets'; // Import assets

// Define the MyOrders component
const MyOrders = () => {
  const [data, setData] = useState([]); // State to manage the list of orders
  const token = localStorage.getItem('token')
  // Function to fetch orders from the API
  const fetchOrders = async () => {
    const response = await axios.post("http://localhost:4000/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
    console.log(response.data.data);
  };

  // useEffect to fetch orders when the token changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  },[token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data?.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              {/* Display the parcel icon */}
              <img src={assets.parcel_icon} alt="" />
              {/* Display the order items */}
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ",";
                  }
                })}
              </p>
              {/* Display the order amount */}
              <p>${order.amount}.00</p>
              {/* Display the number of items in the order */}
              <p>Items: {order.items.length}</p>
              {/* Payment refrence */}
              <p>Payment ID: {order?.paymentRefrence}</p>
              {/* Display the order status */}
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              {/* Button to track the order */}
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders; // Export the MyOrders component

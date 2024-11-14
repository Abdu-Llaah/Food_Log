// Import necessary libraries and components
import { useEffect, useState } from 'react';
import './Order.css'; // Import CSS file for styling
import { toast } from 'react-toastify'; // Import toast for displaying notifications
import axios from 'axios'; // Import axios for HTTP requests
import { assets } from "../../assets/assets"; // Corrected the import statement for assets

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]); // State to store the list of orders

  // Function to fetch all orders from the server
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data); // Update state with retrieved orders
        console.log(response.data.data); // Log response data for debugging
      } else {
        toast.error("Error"); // Show error toast if not successful
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      toast.error("Failed to fetch orders"); // Show error toast if request fails
    }
  };

  // Function to handle status change of an order
  const statushandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the list after status update
      } else {
        toast.error("Error updating status"); // Show error toast if not successful
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      toast.error("Failed to update status"); // Show error toast if request fails
    }
  };

  // useEffect hook to fetch all orders when the component mounts
  useEffect(() => {
    fetchAllOrders(); // Initial fetch when component mounts
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statushandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order; // Export the Order component

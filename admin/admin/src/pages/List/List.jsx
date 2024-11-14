// Import necessary libraries and components
import { useEffect, useState } from 'react';
import './List.css'; // Import CSS file for styling
import axios from "axios"; // Axios for HTTP requests
import { toast } from "react-toastify"; // Toast for displaying notifications

// Define the List component
const List = ({ url }) => {
  
    // Define state to store the list of food items
    const [list, setList] = useState([]);

    // Function to fetch the list of food items from the server
    const fetchList = async () => {
        try {
            // Send GET request to retrieve food list
            const response = await axios.get(`${url}/api/food/list`);
            console.log(response.data); // Log response data for debugging

            // Check if request was successful
            if (response.data.success) {
                setList(response.data.data); // Update state with retrieved data
            } else {
                toast.error("Error"); // Show error toast if not successful
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            toast.error("Failed to fetch list"); // Show error toast if request fails
        }
    };

    // Function to remove a food item by its ID
    const removeFood = async (foodId) => {
        try {
            // Send POST request to remove food item by ID
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            await fetchList(); // Refresh the list after removal

            // Check if request was successful
            if (response.data.success) {
                toast.success(response.data.message); // Show success toast with message
            } else {
                toast.error("Error"); // Show error toast if not successful
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            toast.error("Failed to remove item"); // Show error toast if request fails
        }
    };

    // useEffect hook to fetch the list of food items when the component mounts
    useEffect(() => {
        fetchList(); // Initial fetch when component mounts
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                {/* Header row for the table */}
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {/* Map through the list and render each food item */}
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        {/* Display food item image */}
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p> {/* Display food item name */}
                        <p>{item.category}</p> {/* Display food item category */}
                        <p>${item.price}</p> {/* Display food item price */}
                        {/* Remove button, calls removeFood on click */}
                        <p onClick={() => removeFood(item._id)} className="cursor">X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Export the List component as default
export default List;

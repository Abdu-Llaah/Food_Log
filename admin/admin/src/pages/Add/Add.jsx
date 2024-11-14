// Import necessary libraries and components
import { useState } from 'react';
import { assets } from '../../assets/assets'; // Corrected the import statement for assets
import './Add.css'; // Import CSS file for styling
import axios from "axios"; // Axios for making HTTP requests
import { toast } from 'react-toastify'; // Toast for displaying notifications

// Define the Add component
const Add = ({ url }) => {
    
    // State to store selected image file
    const [image, setImage] = useState(false); // Initialize as false, updated to store the image file
    // State to store form data for a new product
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad", // Default category is "Salad"
    });

    // Function to handle input changes in form fields
    const onChangeHandler = (event) => {
        const name = event.target.name; // Get name of the field
        const value = event.target.value; // Get value of the field
        setData(data => ({ ...data, [name]: value })); // Update corresponding field in data state
    };

    // Function to handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create a new FormData object to hold form fields and files
        const formData = new FormData();
        formData.append("name", data.name); // Append name
        formData.append("description", data.description); // Append description
        formData.append("price", Number(data.price)); // Convert price to a number and append
        formData.append("category", data.category); // Append category
        formData.append("image", image); // Append image file

        // Send POST request to add new product
        const response = await axios.post(`${url}/api/food/add`, formData);
        
        // Check if the API response indicates success
        if (response.data.success) {
            // Reset form data if product is added successfully
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            });
            setImage(false); // Reset image selection
            toast.success(response.data.message); // Show success message with toast
        } else {
            toast.error(response.data.message); // Show error message with toast
        }
    };

    return (
        <div className='add'>
            {/* Form to add a new product */}
            <form className='flex-col' onSubmit={onSubmitHandler}>
                
                {/* Image upload section */}
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {/* Display selected image or a default upload area image */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
                    </label>
                    {/* Hidden file input for selecting an image */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                {/* Product name input */}
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>

                {/* Product description input */}
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content here' required></textarea>
                </div>

                {/* Category and price section */}
                <div className="add-category-price">
                    
                    {/* Category selection dropdown */}
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Juice">Juice</option>
                        </select>
                    </div>

                    {/* Price input */}
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
                    </div>
                </div>

                {/* Submit button */}
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

// Export the Add component as default
export default Add;

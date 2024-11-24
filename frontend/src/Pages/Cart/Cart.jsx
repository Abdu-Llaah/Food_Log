import { useContext } from 'react'; // Import necessary modules from React and other libraries
import './cart.css'; // Import the CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

// Define the Cart component
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext); // Use the StoreContext to access cart items, food list, removeFromCart function, total cart amount, and URL

  const navigate = useNavigate(); // Hook to navigate programmatically

  console.log(cartItems)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          {/* Display the titles for the cart columns */}
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {/* Map through the food list and display items that are in the cart */}
        {food_list.map((item) => {
          const cartItem = cartItems.find(cartItem => cartItem.id === item._id);
          if (cartItem) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  {/* Display the item image */}
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  {/* Display the item name */}
                  <p>{item.name}</p>
                  {/* Display the item price */}
                  <p>${item.price}</p>
                  {/* Display the item quantity */}
                  <p>{cartItem.quantity}</p>
                  {/* Display the total price for the item */}
                  <p>${item.price * cartItem.quantity}</p>
                  {/* Display the remove button */}
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Ensure something is always returned
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              {/* Display the subtotal */}
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              {/* Display the delivery fee */}
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              {/* Display the total amount */}
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          {/* Button to proceed to checkout */}
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            {/* Display the promo code input */}
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; // Export the Cart component

import { useContext } from 'react'; // Import necessary modules from React and other libraries
import './cart.css'; // Import the CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

// Define the Cart component
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext); // Use the StoreContext to access cart items, food list, removeFromCart function, total cart amount, and URL

  const navigate = useNavigate(); // Hook to navigate programmatically

  console.log('cartItems', cartItems)

  const handleNavigateToOrder = () => {
    navigate('/order')
  }

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
        {
          cartItems && (
            cartItems?.length < 1 ? (
              <div className="error">
                <p>No Items in Cart</p>
              </div>
            ) : (
              cartItems?.map((item) => (
                <div key={item.id}>
                  <div className='cart-items-title cart-items-item'>
                    {/* Display the item image */}
                    <img src={`${item.image}`} alt={item.name} />
                    {/* Display the item name */}
                    <p>{item.name}</p>
                    {/* Display the item price */}
                    <p>${item.price}</p>
                    {/* Display the item quantity */}
                    <p>{item.quantity}</p>
                    {/* Display the total price for the item */}
                    <p>${item.price * item.quantity}</p>
                    {/* Display the remove button */}
                    <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
          ))
            )

          )
        }
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
          <Link className='button' to={`/order`} >PROCEED TO CHECKOUT</Link>
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

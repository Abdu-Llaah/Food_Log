import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [food_list, setFoodList] = useState([]);
  const getToken = localStorage.getItem('token')
  const [token, setToken] = useState(getToken || '');
  const url = 'http://localhost:4000';

  // Add to cart
  const addToCart = async (product) => {
    setCartItems((prev) => {
      const cartArray = Array.isArray(prev) ? prev : [];
      const existingItem = cartArray.find((item) => item.id === product.id);
      if (existingItem) {
        return cartArray.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cartArray, { ...product, quantity: 1 }];
      }
    });
  
    if (token) {
      try {
        await axios.post(url + '/api/cart/add', { productId: product.id }, { headers: { token } });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };
  

  // Remove from cart
  const removeFromCart = async (productId) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem?.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.id !== productId);
      }
    });

    if (token) {
      try {
        await axios.post(url + '/api/cart/remove', { productId }, { headers: { token } });
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Fetch food list
const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
    console.log('Fetched food list:', response.data.data);
  } catch (error) {
    console.error('Error fetching food list:', error.message);
    // Handle the error gracefully, e.g., show a message to the user
  }
};


  // Load cart data from server
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
      setCartItems(response.data.cartData || []);
      console.log('Loaded cart data:', response.data.cartData);
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  // Save cart items to localStorage whenever cartItems updates
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }

      await fetchFoodList();
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;

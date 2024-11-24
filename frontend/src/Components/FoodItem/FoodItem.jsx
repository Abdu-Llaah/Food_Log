import { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const itemData = Array.isArray(cartItems) ? cartItems : [];
  const itemCount = itemData.find((item) => item.id === id)?.quantity || 0;

  const data = { id, name, price, description, image };

  const handleClick = () => {
    addToCart(data);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${image}`} alt={name} />
        {itemCount === 0 ? (
          <img
            className="add"
            onClick={handleClick}
            src={assets.add_icon_white}
            alt="Add item"
          />
        ) : (
          <div className="food-item-container">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove item"
            />
            <p>{itemCount}</p>
            <img
              onClick={handleClick}
              src={assets.add_icon_green}
              alt="Add more item"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {assets.rating_icon && <img src={assets.rating_icon} alt="Rating icon" />}
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

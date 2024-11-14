// // import React from 'react'
// import { useContext } from 'react';
// import './FoodItem.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../Context/StoreContext';
// import { Link } from 'react-router-dom';

// const FoodItem = ({ id, name, price, description, image }) => {
//   const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
//   const itemCount = cartItems[id] || 0;

//   console.log('FoodItem props:', { id, name, price, description, image });
//   console.log('Image URL:', `${url}/images/${image}`);


//   return (
//     <div className='food-item'>
//       <div className="food-item-img-container">
//         <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
//         {itemCount === 0 ? (
//           <img
//             className='add'
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt='Add item'
//           />
//         ) : (
//           <div className='food-item-container'>
//             <img
//               onClick={() => removeFromCart(id)}
//               src={assets.remove_icon}
//               alt='Remove item'
//             />
//             <p>{itemCount}</p>
//             <Link to='/Cart'>
//               <img
//                 onClick={() => addToCart(id)}
//                 src={assets.add_icon_green}
//                 alt='Add more item'
//               />
//             </Link>
//           </div>
//         )}
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-description">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
// import React from 'react'
import { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {
  console.log("foodItem",id);
  
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0;

  console.log('FoodItem props:', { id, name, price, description, image });
  console.log('Image URL:', `${url}/images/${image}`);

  const handleClick = (id) => {
    console.log('PASED ID', id)
    addToCart(id)
    }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${image}`} alt={name} />
        {itemCount === 0 ? (
          <img
            className='add'
            onClick={() => handleClick(id)}
            src={assets.add_icon_white}
            alt='Add item'
          />
        ) : (
          <div className='food-item-container'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt='Remove item'
            />
            <p>{itemCount}</p>
            <Link to='/Cart'>
              <img
               onClick={() => handleClick(id)}
                src={assets.add_icon_green}
                alt='Add more item'
              />
            </Link>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {assets.rating_icon && (
            <img src={assets.rating_icon} alt='Rating icon' />
          )}
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
// // import React from 'react'
// import{ useContext } from 'react';
// import './Fooddisplay.css';
// import { StoreContext } from '../../Context/StoreContext';
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   console.log(food_list); // Check the contents of food_list

//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {food_list.map((item, index) => {
//           if (category === "All" || category === item.category) {
//             return (
//               <FoodItem key={index}  id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
//             );
//           }
//           return null; // Ensure something is always returned
//         })}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;
// import React from 'react'
// import { useContext } from 'react';

import './Fooddisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { food_list } from '../../assets/assets';

const FoodDisplay = ({ category }) => {


  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image} 
              />
            );
          }
          return null; // Ensure something is always returned
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
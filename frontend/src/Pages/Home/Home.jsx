import Header from '../../Components/Header/Header';
import './home.css';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import { useState } from 'react';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import AppDownload from '../../Components/AppDownload/AppDownload';

const Home = () => {
  // State for tracking the selected category (default: 'All')
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Header component */}
      <Header />

      <div id="menu">
        {/* ExploreMenu component, passing the category state and setter */}
        <ExploreMenu category={category} setCategory={setCategory} />

        {/* FoodDisplay component, passing the category state */}
        <FoodDisplay category={category} />
      </div>

      <div id="mobile-app">
        <AppDownload />
      </div>

      <div id="contact-us">
        {/* Add your contact us section */}
        <h2>Contact Us</h2>
        <p>Details here...</p>
      </div>
    </div>
  );
};

export default Home;

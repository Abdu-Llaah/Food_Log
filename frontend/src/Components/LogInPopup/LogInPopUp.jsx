// import React from 'react' // Import statement for React (commented out as it's not needed in React 17+)
import { useContext, useState } from 'react'; // Import necessary modules from React and other libraries
import './LogInPopUp.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Import assets
import { StoreContext } from '../../Context/StoreContext'; // Import the StoreContext for state management
import axios from "axios"; // Import axios for making HTTP requests

// Define the LogInPopUp component with props
const LogInPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext); // Use the StoreContext to access url and setToken

  const [currentState, setCurrentState] = useState("Login"); // State to manage the current form state (Login or Sign Up)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  }); // State to manage form data

  // Handler for input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // Handler for form submission
  const onLogin = async (event) => {
    event.preventDefault();
    // API call
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p> By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span> </p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span> </p>
        }
      </form>
    </div>
  );
};

export default LogInPopUp; // Export the LogInPopUp component

// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/PlaceOrder/Placeorder'
import Footer from './Components/Footer/Footer'
import { useState } from 'react'
import LogInPopUp from './Components/LogInPopup/LogInPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'

const App = () => {

  const[showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LogInPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
   
  )
}

export default App
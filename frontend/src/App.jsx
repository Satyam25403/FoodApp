import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';


export const App = () => {

  const [showLogin,setShowLogin]= useState(false);
  return (
    <>

      {/* if showlogin true? display component: return a fragment */}
      {showLogin? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
    
        {/* create multiple routes for the app component: path and the corresponding jsx file to render*/}
        <Routes>
           < Route path='/' element={<Home/>}/>
           < Route path='/cart' element={<Cart/>}/>
           < Route path='/order' element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
    
  )
}

export default App;
import React, { useState } from 'react'
import './LoginPopUp.css'
import {assets} from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {


    const [currentState,setCurrentState] =useState("Login")


  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>

                {/* upon clicking this cross...close the  login form */}
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>

            <div className="login-popup-inputs">

                {/* if loginstate active ? dont render name input : render name input */}
                {currentState==="Login"?<></>:<input type="text" placeholder='Your Name' required/>} 
                <input type="email" placeholder='Your email' required/>
                <input type="password" placeholder='Password' required/>
                <button>{currentState==="Sign Up" ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use and policy</p>
                </div>


                {
                    currentState==="Login" 
                    ? <p>Create a new account?<span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p> 
                    : <p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login</span></p>
                }

                
                
            </div>
        </form>
    </div>
  )
}

export default LoginPopUp
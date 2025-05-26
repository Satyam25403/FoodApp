import { useState,useContext } from 'react'
import './LoginPopUp.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken}= useContext(StoreContext)
    const [currentState,setCurrentState] =useState("Login")
    const [data,setData] =useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin= async(e)=>{
        e.preventDefault()

        let newUrl= url;
        if(currentState==="Login"){
            newUrl+= "/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }

        const res= await axios.post(newUrl,data);
        if(res.data.success){
            setToken(res.data.token);

            // store token to localstorage
            localStorage.setItem("token",res.data.token)

            // hide login page
            setShowLogin(false)
        }
        else{
            alert(res.data.message)
        }
    }

    // // whenever data changes, relect the changes in fields
    // useEffect(()=>{
    //     console.log(data);
    // },[data])


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>

                {/* upon clicking this cross...close the  login form */}
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>

            <div className="login-popup-inputs">

                {/* if loginstate active ? dont render name input : render name input */}
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>} 
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
                <button type="submit">{currentState==="Sign Up" ? "Create Account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use and policy</p>
                </div>


                {
                    currentState==="Login" 
                    ? <p>Don't have an account?<span onClick={()=>setCurrentState("Sign Up")}>Sign Up</span></p> 
                    : <p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login</span></p>
                }
        </form>
    </div>
  )
}

export default LoginPopUp
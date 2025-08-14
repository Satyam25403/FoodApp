import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'


const Navbar = ({setShowLogin}) => {

  // destructure setShowLogin to handle login-signUp
  // to add the underline effect to show which tab home or contcact etc is active
  const [menu,setMenu] =useState("home");

  //to render the red dot if cart is not empty: using dynamic className
  const {getTotalCartAmount,token,setToken} =useContext(StoreContext);

  // useNavigate to redirect user
  const navigate= useNavigate();

  
  const logout=()=>{

    // remove token and redirect
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }

  return (
    <div className="navbar">


        {/* click on logo to go to home */}
        <Link to='/'><img className="logo" src={assets.logo} alt="" /></Link>

        {/* components of navbar: classNames are changed dynamically to active to apply active class properties {underlined effect} on the active tab */}
        <ul className="navbar-menu">
          <Link onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
          <a to='/' href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
        </ul>
        

        {/* items on the right side: sign in, search, basket etc */}
        <div className="navbar-right">
            <img src={assets.search_icon} />
            <div className="navbar-search-icon">

                {/* to link basket icon to 'cart' route */}
                <Link to='/cart'><img src={assets.basket_icon}/></Link>

                {/* if something in basket, display dot otherwise hide the dot */}
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>


            {/* if token not available? render login : render profile */}
            {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>
                    : <div className="navbar-profile">
                        <img src={assets.profile_icon}/>
                        <ul className="nav-profile-dropdown">
                          <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} /><p>Orders</p></li>            
                          <hr/>
                          <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p></li>
                        </ul>
                      </div>
            }

        </div>
    </div>
  )
}

export default Navbar
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {


  // to add the underline effect to show which tab home or contcact etc is active
  const [menu,setMenu] =useState("home");

  return (
    <div className="navbar">
        <img className="logo" src={assets.logo} alt="" />

        {/* components of navbar: classNames are changed dynamically to active to apply active class properties {underlined effect} on the active tab */}
        <ul className="navbar-menu">
          <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
          <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
          <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
          <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</li>
        </ul>
        

        {/* items on the right side: sign in, search, basket etc */}
        <div className="navbar-right">
            <img src={assets.search_icon} />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon}/>

                {/* if something in basket, display dot otherwise hide the dot */}
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}

export default Navbar
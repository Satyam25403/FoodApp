import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>

      <div className="sidebar-options">

        {/* clicking on each routes the app on diff paths */}
        {/* isActive is boolean property provided by react routers navlink component */}

        <NavLink to="/add" className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.add_icon} />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.order_icon} />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar
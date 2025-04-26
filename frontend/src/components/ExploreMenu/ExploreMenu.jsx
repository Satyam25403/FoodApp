import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
    // we have an array of menulist from assets.js...we will display them
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>

        {/* use the list to map listitems to their corresponding images */}
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{

                // to all the categories provide an option to filter a category
                return (
                    
                    // if previous two clicks were on same cat: set category to default: all
                    <div onClick={()=>setCategory(prev => prev===item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item' key={item.menu_name}>

                        {/* add a dynamic classname based on the selected category clicked: add a round circle over category image */}
                        <img className={category===item.menu_name? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>

        <hr/>

    </div>
  )
}

export default ExploreMenu
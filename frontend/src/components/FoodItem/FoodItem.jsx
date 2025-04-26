import React, { useContext,} from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

    // to add a foodItem in cart:but not good practice to create states for each item: 
    // const [itemCount,setItemCount] =useState(0);
    // hence number of items are managed by CartItems Context
    const {cartItems,addToCart,removeFromCart} =useContext(StoreContext);

  return (
    <div className='food-item'>

        <div className="food-item-img-container">

            {/* if countis 0 add button : increase buttons */}
            <img src={image} alt="" className="food-item-image" />
            {
                !cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className='food-item-counter'>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                 </div>
            }
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""></img>
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>

    </div>
  )
}

export default FoodItem
import React, { useContext } from 'react'
import './Cart.css'
import { food_list } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const Cart = () => {

  const {cartItems,food_list,removeFromCart} =useContext(StoreContext)
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{

          // compare cartItems and foodItems, if foodList's item index is available in cartItem list ,cartItem's count for that index>0 hence display it
          if(cartItems[item._id]>0){

            return(
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt=""/>
                  <p>{item.name}</p>
                  <p>${item.price}</p>

                  {/* quantity of the items */}
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <button className='cross' onClick={()=>removeFromCart(item._id)}>Remove</button>
                </div>


                {/* after each product...a line */}
                <hr/>
              </>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Cart
import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Cart = () => {

  const {cartItems,food_list,removeFromCart, getTotalCartAmount,url, token} =useContext(StoreContext)
  const navigate = useNavigate();

  const handleCheckout = () => {
    const total = getTotalCartAmount();

    if (!token || total === 0) {
      toast.error("Not logged in or cart is empty");
      navigate('/cart');
    } else {
      navigate('/order');
    }
  };

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
                  <img src={url+"/images/"+item.image} alt=""/>
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
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>

          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>

            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0 ? 0: 4}</p>
            </div>
            <hr/>

            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+4}</b>
            </div>
          </div>

          {/* in routes place order component is at /order route */}
          <button onClick={()=>handleCheckout()}>PROCEED TO CHECKOUT</button>

        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code enter it here</p>
            <div className="cart-promocode-input">
              <input type='text' placeholder='PROMO CODE' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}



export default Cart
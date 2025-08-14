import "./MyOrders.css";
import {StoreContext} from "../../Context/StoreContext"
import {assets} from "../../assets/assets.js";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MyOrders = () => {

    const {url, token} =useContext(StoreContext);
    const [data, setData] = useState([]);       //order data

    const fetchOrders = async () => {
        const response= await axios.post(`${url}/api/order/userorders`,{},{headers:{token}})
        setData(response.data.data);
    }

    // whenever this component mounts or token is updated(on user login) fetch orders
    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token]);


  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt=""/>
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.lenght-1){
                                return item.name+ " x " + item.quantity;
                            }else{
                                // for last item we don't want a comma
                                return item.name+ " x " + item.quantity + ", ";
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        
                        {/* without needing to refresh page for inspecting the order status */}
                        <button onClick={fetchOrders}>Track order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders
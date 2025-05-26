import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


    // to create seperate states for each of all the items is not good practice:hence we are managing them in cart
    const [cartItems,setCartItems] =useState({});
    const url="http://localhost:4000"

    const [token,setToken]=useState("");

    const addToCart=(itemId)=>{

        // if item with itemId already there in cart ? increase counter : add it first time to cart
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount= ()=>{
        let totalAmount=0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                // if product is available in cart
                let itemInfo=food_list.find((product)=> product._id === item)
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }


    // if user is logged in and refreshes the page... 
    // to prevent logout we restore the token using setToken, unless token is explicitly cleared upon user logout action
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,                 //to access backend url in any component
        token,
        setToken
    };

    // By this, we can access the contexts (food list) in any function or any component
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
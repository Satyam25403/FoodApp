import { createContext, useState, useEffect } from "react";
import axios from "axios"


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


    // to create seperate states for each of all the items is not good practice:hence we are managing them in cart
    const [cartItems,setCartItems] =useState({});
    const url="http://localhost:4000"

    const [token,setToken]=useState("");

    // store list of FoodItems
    const [food_list,setFoodlist] =useState([])

    const addToCart= async(itemId)=>{

        // if item with itemId already there in cart ? increase counter : add it first time to cart
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            // if token available(logged in) and we select the items, update database and set token with itemId in header
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    
    const removeFromCart= async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            // if token available(logged in) and we select the items, update database and set token with itemId in header
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
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

    const fetchFoodList =async ()=>{
        const res=await axios.get(url+"/api/food/list");
        setFoodlist(res.data.data)
    }


    // upon page reload, the added items state is not rerendering on the page....we need to persist the items that we added to cart on the items page
    const loadCartData=async(token)=>{
        // we dont need to send anything in req body hence empty object we are sending
        const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }


    // if user is logged in and refreshes the page... 
    // to prevent logout we restore the token using setToken, unless token is explicitly cleared upon user logout action
    useEffect(()=>{
        // empty dependency array means it is run once when component is mounted i.e page reload here
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadData()
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
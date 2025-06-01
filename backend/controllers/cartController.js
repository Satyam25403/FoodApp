import userModel from "../models/userModel.js"


//these are being written since cart data is lost upon refresh of the page
//hence we are storing it in database

const addToCart= async (req, res)=>{
    try{
        // since the middleware sets the userId field in request,
        let userData= await userModel.findById(req.body.userId)
        let cartData =await userData.cartData;

        // when user needs to add, user will send a token with the itemId
        if(!cartData[req.body.itemId]){
            // if in cartData there is no entry with the itemId
            cartData[req.body.itemId]=1
        }
        else{
            // if already present, increment the count
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "error"})
    }
}


const removeFromCart= async (req, res)=>{
    try{
        // from middleware, get Id
        let userData =await userModel.findById(req.body.userId)
        let cartData =await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from cart"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"An error occured"})
    }
}


const getCart= async (req, res)=>{
    try{
        
        let userData =await userModel.findById(req.body.userId)
        let cartData =await userData.cartData;
        
        res.json({success:true,cartData,message:"Fetched data successfully"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"An error occured"})
    }
}

export {addToCart, removeFromCart, getCart}
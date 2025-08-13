import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder =async (req,res)=>{
    const frontend_url= "http://localhost:5173"
    try{
        const newOrder=new orderModel({
            userId: req.body.userId,                     //from decoding the user token
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();          //save order in db


        //once order placed: stored in db, clear cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items =req.body.items.map((item) =>({
    
            price_data: {
                currency: 'usd',        //the country currency ur stripe is setup in
                product_data:{
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80, // Stripe expects amount in cents
            },
            quantity: item.quantity,  
        }))

        //delivery charges
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 50, 
            },
            quantity: 1,
        })


        //create a session using line items
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true, session_url: session.url})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error placing order"});
    }
}

export {placeOrder}
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

//recommended method is webhooks for payment integration
//but for simplicity, we are using this method

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment verified successfully" });
        }else{
            await orderModel.findByIdAndDelete(orderId); // delete order if payment failed
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.log("Error verifying payment: ", error);
        // Always check res.headersSent in your catch block to avoid crashing if an error occurs after a response was already sent.
        //to gracefully handle the error
        //if res.headersSent is true, it means a response has already been sent to the client, so we should not send another response.
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: "Error verifying payment" });
        }
    }
}


//userOrders to display after payment is done
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId })
        res.json({ success: true, data: orders });
    }
    catch (error) {
        console.log("Error fetching user orders: ", error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
}


//get all orders of all users: for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching orders: ", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

//for updating the order status
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, data: updatedOrder, message: "Order status updated successfully" });
    }
    catch (error) {
        console.log("Error updating order status: ", error);
        res.json({ success: false, message: "Error updating order status" });
    }
}
export {placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus};
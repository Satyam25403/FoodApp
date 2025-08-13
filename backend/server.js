import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config
const app=express();
const PORT=4000;

//middlewares
app.use(express.json())         //whenever request comes from frontend to backend, this will parse it
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());            //we can access backend from any frontend


// use environment variables
dotenv.config();

//db connection
connectDb(process.env.MONGODB_CONNECTION_URI);



//we can access the image in mongodb database and show it to user: uploads folder exposed on this end point
app.use("/images",express.static("uploads"));
//api endpoints : food,user are collections here in mongodb database
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)

app.use("/api/order", orderRouter)




//request data from server from an end point
app.get("/",(req,res)=>{
    res.send("Api working")
});

//run express server
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
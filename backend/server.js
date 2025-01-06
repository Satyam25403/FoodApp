import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";


//app config
const app=express();
const PORT=4000;

//middlewares
app.use(express.json())         //whenever request comes from frontend to backend, this will parse it
app.use(cors());            //we can access backend from any frontend

dotenv.config();

//db connection
connectDb(process.env.MONGODB_CONNECTION_URI);

//api  endpoints

app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);









app.get("/",(req,res)=>{
    res.send("Api working")
});



//run express server
app.listen(PORT,()=>{
    console.log(`Server dtarted on port ${PORT}`)
})
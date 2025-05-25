import mongoose from"mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb=async(string)=>{
    await mongoose.connect(string).then(()=>{
        console.log("Database connected");
    });
}


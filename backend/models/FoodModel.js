import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        typr:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
});

//when file is ran again,the model is created again: to solve this we have used mongoose.models.food if it is present, directly loads
const foodModel=mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;
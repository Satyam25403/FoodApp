import foodModel from "../models/FoodModel.js";
import fs from "fs";


//add food item: working
const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try{
        await food.save();
        console.log(req.body);
        console.log(req.file);
        res.json({success:true,message:"Food added in database successfully"});

    }catch(error){
        console.log(error);
        console.log(req.body); // Check received data
        console.log(req.file); // Ensure file is uploaded
        res.json({success:false,message:"error occured, could not save the food"});
    }
}


//list all fooditems: working 
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true, data:foods});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error occured"});
    }
}

//remove food items: working
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);

        //remove from uploads folder
        fs.unlink(`uploads/${food.image}`,()=>{});
        //remove from database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message: "food removed"});
    }catch(error){
        console.log("error");
        res.json({success:false,message:"Error"})
    }
}

export { addFood,listFood,removeFood };
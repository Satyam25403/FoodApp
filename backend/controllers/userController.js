import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const loginUser=async(req,res)=>{

}

const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email!! please enter a valid email"});
        }

        if(password.length<8){
            return res.json({success:false,message:"please enter a strong password"});
        }

        //hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,message:"User created successfully",token:token});
        
    }catch(err){
        console.log(err);
        res.json({success:false,message:"This is an error"})
    }
}

export{
    loginUser,
    registerUser,
}
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import 'dotenv/config'


// working
const loginUser=async(req,res)=>{
    const {email,password} =req.body
    try{
        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message: "User doesnt exist"})
        }
        if (!user.password) {
            return res.json({ success: false, message: "User has no stored password" });
        }


        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid login credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,message:"logged in successfully",token:token});
    }
    catch (error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const createToken=(id)=>{
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
}


// working
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"});
        }

        if(password.length<8){
            return res.json({success:false,message:"enter a strong password"});
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

        res.json({success:true,message:"User created successfully",userdata:user});
        
    }catch(err){
        console.log(err);
        res.json({success:false,message:"This is an error"})
    }
}

export{
    loginUser,
    registerUser,
}
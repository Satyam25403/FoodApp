import jwt from "jsonwebtoken"
import cartRouter from "../routes/cartRoute.js"
import dotenv from "dotenv"

dotenv.config()

const authMiddleware =async(req, res, next)=>{

    // in the headers we will be having a token from the user
    const {token} =req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorised...Login again"})
    }
    try{
        const decodedToken= jwt.verify(token, process.env.SECRET_KEY)
        // while creating token in loginUser, we have passed userid, hence upon decode we will get the id
        // and set it in request
        req.body.userId = decodedToken.id;
        next()
    }
    catch(error){
        console.log(error)
        res.json({success: false, message:"Error"})
    }
}

export default authMiddleware
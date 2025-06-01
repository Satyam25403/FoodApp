import express from "express"
import { addToCart,removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter=express.Router()

// create endpoints for cart

//middleware is to verify the token and then write to database
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter
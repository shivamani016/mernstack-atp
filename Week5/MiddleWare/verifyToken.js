import jwt from "jsonwebtoken"
import {config} from 'dotenv'
config()
export const verifyToken=async(req,res,next)=>{
    //read ta=oken from req
    let token=req.cookies.token
    if(token === undefined){
        return res.status(400).json({message:"unauthorizez req,PLz login"})
    }
    //verify the validity of the token(decodeing)
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    //console.log("Decoded string",decodedToken)
    //forward to next 
    next()
}
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { UserTypeModel } from '../models/userModel.js'
import {config} from 'dotenv'
//register function 
export const register=async (userObj)=>{
    //create document
    const userDoc =new UserTypeModel(userObj)
    //validate for empty password
    await userDoc.validate()
    //hash and replace plain password
    userDoc.password=await bcrypt.hash(userDoc.password,10)
    //save
    const created=await userDoc.save()
    //convert document to object to remove the pssword
    const newUserObj=created.toObject()
    //remove password
    delete newUserObj.password
    //return user obj without password
    return newUserObj
}

//authenticate function
export const authenticate = async({email,password})=>{
    //check user with email &mail
    const user=await UserTypeModel.findOne({email});
    if(!user){
        const err=new Error("Invalied email")
        err.status=401
        throw err
    }
    //if user valid but blocked by admin

    //compare passwords
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        const err=new Error("Invalied password")
        err.status=401
        throw err
    }
    //user is activestate
    if(user.isActive===false){
        const err=new Error("your account is blocked ,plz contact admin")
        err.status=403
        throw err
    }
    //generate a token
    const token=jwt.sign({userId:user._id,role:user.role,email:user.email},
        process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
    const userObj=user.toObject()
    delete userObj.password
    return {token,user:userObj}
}
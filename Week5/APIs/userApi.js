import exp from 'express'
import { authenticate, register } from '../services/authService.js'
import { config } from 'dotenv'
import { verifyToken } from '../MiddleWare/verifyToken.js'
import { checkAuthor } from '../MiddleWare/checkAuthor.js'
import { UserTypeModel } from '../models/userModel.js'
import {ArticleSchemaModel} from '../models/articleModel.js'
config()

export const userRoute = exp.Router()

// Register USER
userRoute.post("/users", async (req, res) => {
    // get user obj from req
    let userObj = req.body

    // call register
    const newUserObj = await register({ ...userObj, role: "USER" })

    // send res
    res.status(201).json({
        message: "user created",
        payload: newUserObj
    })
})

// Read articles of user(prodtected)
userRoute.get("/articles/:userId",verifyToken, async (req, res) => {
    //find all the active articles
    let uid=req.params.userId
    const user=await UserTypeModel.findById(uid)
    if(!user){
        res.status(401).json({message:"user does not exist"})
    }
    let articles = await ArticleSchemaModel.find({

        isArticleActive: true
    })
    // send res
    res.status(200).json({
        message: "articles",
        payload: articles
    })
})
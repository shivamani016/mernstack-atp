import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { userRoute } from './APIs/userApi.js'
import { authorRoute } from './APIs/authorApi.js'
import { adminRoute } from './APIs/adminApi.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from './APIs/commonApi.js'
config()//process .eve

const app=exp()
//add body parser middlewarer
app.use(exp.json())
//add cookie parser
app.use(cookieParser())
//connect Api
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)
//connect to Db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection success")
    app.listen(process.env.PORT,()=>console.log("server started"))
    }
    catch(err){
        console.log("err in DB connection",err)
    }
}
connectDB()

//dealing with Invalid path
app.use((req,res,next)=>{
    //console.log(req.url)
    res.json({message:req.url + " is Invalid path"})
})


//error handlind middleware
app.use((err, req, res, next) => {
    console.log("error:", err);
    res.status(err.status || 500).json({
        message: "error",
        reason: err.message
    });
});

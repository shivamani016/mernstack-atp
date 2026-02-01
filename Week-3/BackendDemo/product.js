 //create HTTP server
 // import express module
import exp from 'express'
//create server
const app=exp()
//assign port number
app.listen(3000,()=>console.log("HTTp srver listing on port 3000..."))
//body parsing mproductIddleware
app.use(exp.json())
//create USER api
let products=[];
// create API(request handlers - route )

    //get req handlling route 
    app.get('/products',(req,res)=>{
       //send user data in status
       res.status(200).json({message:"All products",payload:products})
    })


    //post req handlling route
    app.post('/products',(req,res)=>{

        //get user resources from req
        let newUser=req.body
        //console.log("new user",newUser)
        products.push(newUser)
        //send res
        res.status(201).json({message:"User created",payload:products})
        
    })
    //put req handlling route
    app.put('/products',(req,res)=>{
        let User1=req.body
        //find user exist in array using productId
        //if user not found,send res as "user not found"
        let userIndex=products.findIndex((userobj)=>userobj.productId===User1.productId)
        if(userIndex===-1){
            return res.status(404).json({message:"User not found"})
        }
        //if user found,then modify the user
        let deleteuser= products.splice(userIndex,1,User1)
            res.status(200).json({message:"User modified"})
    
    })

    app.get('/products-id/:productId',(req,res)=>{

        //read it from url parameter
        let userproductId=Number(req.params.productId)
        //read user bythis productId
        let user=products.find(userobj=>userobj.productId===userproductId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        //sed res
        res.status(200).json({message:"user",payload:user})
    })
    app.get('/products-name/:name',(req,res)=>{

        //read it from url parameter
        let userproductId=req.params.productId
        //read user bythis productId
        let user=products.find(userobj=>userobj.productId===userproductId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        //sed res
        res.status(200).json({message:"user",payload:user})
    })
    //delete req handlling route
    app.delete('/products/:productId',(req,res)=>{
        console.log(req.params)
        //read productId from url
        let userproductId=Number(req.params.productId)
        //read user by this productId
        let userr=products.findIndex(userObj=>userObj.productId===userproductId)
        if(userr===-1){
            return res.status(404).json({message:"User not found"})
        }
        //if user found,then delete the user
        let deleteuser= products.splice(userr,1,userproductId)
            res.status(200).json({message:"User deleted",payload:products})
    })
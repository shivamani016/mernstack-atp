// //create HTTP server
//     // import express module
//     import exp from 'express'
//     //create server
//     const app=exp()
//     //Assign port number
//     app.listen(3000,()=>console.log("HTTP server listening in port 3000...."))


//     //HTTP request are
//     //1.GET- Read resources
//     //2.POST-Create a new resource
//     //3.PUT-Update a resource
//     //4.DELETE-Delete a resource

//     //HTTP Address is:http://127.0.0.1:3000
//     //HTTP Address using domain name is :http://localhost:3000

//     //create API(request handler-route)
    
//         //GET req handling route (read users)
//         app.get('/users',()=>{
//             res.js
//         })
//         //POST req handling route (create user)
//         app.post('/user',()=>{})
//         //PUT req handling route (update user)
//         app.put('/users/id',()=>{})
//         //DELETE req handling route (delete user)
//         app.delete('/users/id',()=>{})


        //create HTTP server
 // import express module

// import exp from 'express'
// //create server
// const app=exp()

// //assign port number
// app.listen(3000,()=>console.log("HTTp srver listing on port 3000..."))

// //body parsing middleware
// app.use(exp.json())
import exp from 'express'
import { productApp } from './apis/productapi.js'
import { userApp } from './apis/userapi.js'

const app = exp()

// middleware
app.use(exp.json())

// mount routers
app.use('/products-api', productApp)
app.use('/users-api', userApp)

// start server
app.listen(3000, () =>
  console.log("HTTP server listening on port 3000...")
)


//create a  custm middleware
// function middleware1(req,res,next){
//     console.log("middleware1 executed")
//     //sed res
//     //res.json({message:"res from middleware"})
//     //next
//     next()
// }

// //to execute  for every incoming req
// app.use(middleware1)

// //create USER api
// let users=[];

// // create API(request handlers - route )

//     //get req handlling route 
//     app.get('/users',(req,res)=>{
//        //send user data in status
//        res.status(200).json({message:"All Users",payload:users})
//     })


//     //post req handlling route
//     app.post('/users',(req,res)=>{

//         //get user resources from req
//         let newUser=req.body
//         //console.log("new user",newUser)
//         users.push(newUser)
//         //send res
//         res.status(201).json({message:"User created",payload:users})
        
//     })
//     //put req handlling route
//     app.put('/users',(req,res)=>{
//         //get modified user from cliend
//         //fine the user is exist in array
//         //if user not found and send res as user not fouud else modify the code


//         // let nuser=req.body;
//         // for(let i=0;i<users.length;i++){
//         //     if(nuser.id==users[i].id){
//         //         users[i].id=101
//         //         users[i].name=nuser.name
//         //         users[i].age=nuser.age
//         //         res.status(200).json({message:"user updated",payload:users})
//         //     }
//         //     else{
//         //         res.status(404).json({message:"usernot found"})
//         //     }
//         // }

//         let User1=req.body
//         //find user exist in array using id
//         //if user not found,send res as "user not found"
//         let userIndex=users.findIndex((userobj)=>userobj.id===User1.id)
//         if(userIndex===-1){
//             return res.status(404).json({message:"User not found"})
//         }
//         //if user found,then modify the user
//         let deleteuser= users.splice(userIndex,1,User1)
//             res.status(200).json({message:"User modified"})
    
//     })

//     app.get('/users/:id',(req,res)=>{

//         //read it from url parameter
//         let userid=Number(req.params.id)
//         //read user bythis id
//         let user=users.find(userobj=>userobj.id===userid)
//         if(!user){
//             return res.status(404).json({message:"user not found"})
//         }
//         //sed res
//         res.status(200).json({message:"user",payload:user})
//     })
//     //delete req handlling route
//     app.delete('/users/:id',(req,res)=>{
//         console.log(req.params)
//         //read id from url
//         let userId=Number(req.params.id)
//         //read user by this id
//         let userr=users.findIndex(userObj=>userObj.id===userId)
//         if(userr===-1){
//             return res.status(404).json({message:"User not found"})
//         }
//         //if user found,then delete the user
//         let deleteuser= users.splice(userr,1,userId)
//             res.status(200).json({message:"User deleted",payload:users})
//     })


import {Schema,model} from 'mongoose'

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true," First name is requird"]
    },
    lastName:{
        type:String,
        //required:[true," Last name is requird"]
    },
    email:{
        type:String,
        required:[true," Email is requird"],
        unique:[true,"email is already existed"]
    },
    password:{
        type:String,
        required:[true," password is requird"]
    },
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:['AUTHOR','USER','ADMIN'],
        required:[true," {value} is an Invaild Role"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})

//create model

export const UserTypeModel=model("user",userSchema)
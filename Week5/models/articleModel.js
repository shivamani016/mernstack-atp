import {Schema,model} from 'mongoose'

const userCommentSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    comment:{
        type:String
    }
})

//Article Schema
const articleSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"author id is required"]
    },
    title:{
        type:String,
        required:[true,"Title is requires"]
    },
    category:{
        type:String,
        required:[true,"category is requires"]
    },
    content:{type:String,
        required:[true,"content is requires"]
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})

//create odel
export const ArticleSchemaModel=model("article",articleSchema)
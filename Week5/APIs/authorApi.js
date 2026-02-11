import exp from 'express'
import { register, authenticate } from '../services/authService.js'
import { UserTypeModel } from '../models/userModel.js'
import { ArticleSchemaModel } from '../models/articleModel.js'
import { checkAuthor } from '../MiddleWare/checkAuthor.js'
import { verifyToken } from '../MiddleWare/verifyToken.js'

export const authorRoute = exp.Router()

// Register AUTHOR
authorRoute.post('/users', async (req, res) => {
    // get user obj from req
    let userObj = req.body

    // call register
    const newUserObj = await register({ ...userObj, role: "AUTHOR" })

    // send res
    res.status(201).json({
        message: "author created",
        payload: newUserObj
    })
})

// Create articles (AUTHOR only)(prodtected)
authorRoute.post("/articles",verifyToken, checkAuthor, async (req, res) => {
    // get article from req
    let article = req.body

    // create article document
    let newArticleDoc = new ArticleSchemaModel(article)

    // save
    let createdArticle = await newArticleDoc.save()

    // send res
    res.status(201).json({
        message: "article created",
        payload: createdArticle
    })
})

// Read articles of author(prodtected)
authorRoute.get("/articles/:authorId", verifyToken,checkAuthor, async (req, res) => {
    // get author id
    let authorId = req.params.authorId

    // find articles
    let articles = await ArticleSchemaModel.find({
        author: authorId,
        isArticleActive: true
    }).populate("author","firstName email")

    // send res
    res.status(200).json({
        message: "articles",
        payload: articles
    })
})
//edit article(prodtected)
authorRoute.put("/articles",verifyToken,checkAuthor,async(req,res)=>{
    //get modifiest article from req
    let {articleId,title,category,content,author}=req.body
    //find article
    let articleofDB=await ArticleSchemaModel.findOne({_id:articleId,author:author})
    if(!articleofDB){
        return res.status(400).json({message:"article not found"})
    }
    //update the article
    let updatedArticle=await ArticleSchemaModel.findByIdAndUpdate(articleId,
        {
            $set:{title,category,content}
        },
        {new:true}
    )

    //send res
    res.status(200).json({message:"article updated",payload:updatedArticle})
})

// Soft delete an article
authorRoute.put("/articles/soft-delete",verifyToken,checkAuthor,async (req, res) => {
    const { articleId, author } = req.body;
    // Find article and soft delete in ONE step
    const deletedArticle = await ArticleSchemaModel.findOneAndUpdate(
      { _id: articleId, author: author },
      { $set: { isArticleActive: false } },
      { new: true } // return updated document
    );
    // If article not found
    if (!deletedArticle) {
      return res.status(400).json({ message: "article not found" });
    }
    // Send response
    res.status(200).json({message: "article soft deleted successfully",payload: deletedArticle});
  }
);

// restore an article
authorRoute.put("/articles/restore",verifyToken,checkAuthor,async (req, res) => {
    const { articleId, author } = req.body;
    // Find article and soft delete in ONE step
    const deletedArticle = await ArticleSchemaModel.findOneAndUpdate(
      { _id: articleId, author: author },
      { $set: { isArticleActive: true } },
      { new: true } // return updated document
    );
    // If article not found
    if (!deletedArticle) {
      return res.status(400).json({ message: "article not found" });
    }
    // Send response
    res.status(200).json({message: "article soft deleted successfully",payload: deletedArticle});
  }
);

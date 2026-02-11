import { UserTypeModel } from "../models/userModel.js"

export const checkAuthor = async (req, res, next) => {
    
    let authorId = req.params.authorId || req.body?.author
    const validAuthor = await UserTypeModel.findById(authorId)
        if (!validAuthor || validAuthor.role !== "AUTHOR") {
            const err = new Error("Author not authorized")
            err.status = 401
            throw err
        }
        next()

}

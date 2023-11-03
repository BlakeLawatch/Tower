import { dbContext } from "../db/DbContext.js"

class CommentsService {

    async postComment(commentData) {
        const newComment = (await dbContext.Comment.create(commentData)).populate('creator')
        return newComment
    }
}

export const commentsService = new CommentsService()
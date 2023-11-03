import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {

    async postComment(commentData) {
        const newComment = (await dbContext.Comment.create(commentData)).populate('creator')
        return newComment
    }

    async getEventComments(eventId) {
        const getComments = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
        return getComments
    }
    async destroyComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (!comment) {
            throw new Forbidden('Not yours to delete')
        }
        if (comment.creatorId != userId) {
            throw new Forbidden('Not yours to delete son')
        }

        await comment.delete()
        return `Comment deleted`
    }
}

export const commentsService = new CommentsService()
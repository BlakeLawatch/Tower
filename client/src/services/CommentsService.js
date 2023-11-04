import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{


    async createComment(commentId){
        const res = await api.post('api/comments', commentId)
        logger.log('created a comment', res.data)
        AppState.comments.push(new Comment(res.data))
    }

    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('got comments by eventId', res.data)
        AppState.comments = res.data.map(comment=> new Comment(comment))
    }

    async destroyComment(commentId){
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('deleted comment', res.data)
    }
}

export const commentsService = new CommentsService
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postComment)
    }
    async postComment(req, res, next) {
        try {
            const commentData = req.body
            const userId = req.userInfo.id
            commentData.creatorId = userId
            const comment = await commentsService.postComment(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}
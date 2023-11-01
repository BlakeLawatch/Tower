import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTowerEvents)
    }
    async postTowerEvents(req, res, next) {
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            eventData.creatorId = userId
            const event = await towerEventsService.postTowerEvents(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }

    }
}
import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getTowerEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTowerEvents)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
            .get('/:eventId/tickets', this.getTicketsByEventId)
    }
    async getTowerEvents(req, res, next) {
        try {
            const body = req.body
            const event = await towerEventsService.getTowerEvents(body)
            return res.send(event)

        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
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
    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const eventData = req.body
            // eventData.id = eventId
            const editedEvent = await towerEventsService.editEvent(eventId, userId, eventData)
            return res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const cancelledEvent = await towerEventsService.cancelEvent(eventId, userId)
            return res.send(cancelledEvent)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByEventId(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketService.getTicketsByEventId(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
}
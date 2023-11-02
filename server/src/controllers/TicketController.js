import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTickets)
            .delete('/:ticketId', this.cancelTicket)

    }
    async createTickets(req, res, next) {
        try {
            const ticketData = req.body
            const userId = req.userInfo.id
            ticketData.accountId = userId
            const ticket = await ticketService.createTickets(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        };
    }
    async cancelTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const ticket = await ticketService.cancelTicket(ticketId, userId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }

    }
}
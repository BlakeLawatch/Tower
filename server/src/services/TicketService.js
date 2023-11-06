import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketService {
    async createTickets(ticketData) {
        const newTicket = await dbContext.Ticket.create(ticketData)
        await newTicket.populate('profile')
        return newTicket
    }

    async getMyTickets(userId) {
        const myTickets = await dbContext.Ticket.find({ accountId: userId })
            .populate('event')

        return myTickets
    }

    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId })
            .populate('profile')
        return tickets
    }

    async cancelTicket(ticketId, userId) {
        const ticket = await dbContext.Ticket.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('Not yours to delete')
        }
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('Not your ticket to cancel')
        }

        await ticket.delete()
        return `It's over, it's done!`

    }
}

export const ticketService = new TicketService()
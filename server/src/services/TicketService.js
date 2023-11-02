import { dbContext } from "../db/DbContext.js"

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
        const ticket = await this.getTicketsByEventId(ticketId)
        return ticket
    }
}

export const ticketService = new TicketService()
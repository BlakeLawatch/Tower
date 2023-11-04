import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

    
    async createTicket(eventId){
        const eventData = { eventId: eventId}
        const res = await api.post('api/tickets', eventData)
        logger.log('created a ticket', res.data)
        AppState.tickets.push(new Ticket(res.data))
    }
async getTicketsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('got tickets/event', res.data)
    AppState.tickets = res.data.map((tickets) => new Ticket(tickets))
}
}

export const ticketsService = new TicketsService()
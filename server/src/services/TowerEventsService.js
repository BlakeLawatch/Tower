import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TowerEventService {
    async getTowerEvents(body) {
        const newEvent = await dbContext.TowerEvent.find(body).populate('creator ticketCount')
        return newEvent
    }
    async postTowerEvents(eventData) {
        const newEvent = (await dbContext.TowerEvent.create(eventData)).populate('creator ticketCount')
        return newEvent
    }

    async getEventById(eventId) {
        const events = await dbContext.TowerEvent.findById(eventId).populate('creator ticketCount')
        return events
    }

    async editEvent(eventId, userId, eventData) {
        const editedEvent = await dbContext.TowerEvent.findById(eventId)
        if (editedEvent.creatorId != userId) {
            throw new Forbidden('not authorized to edit')
        }
        editedEvent.name = eventData.name
        editedEvent.description = eventData.description
        // editedEvent.isCanceled = eventData.isCanceled || false
        await editedEvent.save()
        return editedEvent
    }

    async cancelEvent(eventId, userId) {
        const cancelledEvent = await this.getEventById(eventId)
        if (cancelledEvent.creatorId != userId) {
            throw new Forbidden('Not your event to cancel')
        }
        cancelledEvent.isCanceled = !cancelledEvent.isCanceled
        await cancelledEvent.save()
        return cancelledEvent
    }
}


export const towerEventsService = new TowerEventService()
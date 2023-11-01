import { dbContext } from "../db/DbContext.js"

class TowerEventService {
    async postTowerEvents(eventData) {
        const newEvent = await dbContext.TowerEvent.create(eventData)
        return newEvent
    }


}


export const towerEventsService = new TowerEventService()
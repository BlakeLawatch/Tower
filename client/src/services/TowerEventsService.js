import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"

import { api } from "./AxiosService"


class TowerEventsService{

    async getEvents(){
        const res = await api.get('api/events')
        // logger.log('Got events in the service', res.data)
        AppState.towerEvents = res.data.map((pojo) => new TowerEvent(pojo))
        logger.log('mapped events', AppState.towerEvents)
        
    }

    async getEventById(eventId){
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`)
        logger.log('Got the event by its ID', res.data)
        AppState.activeEvent = new TowerEvent(res.data)
    }
}

export const towerEventsService = new TowerEventsService()
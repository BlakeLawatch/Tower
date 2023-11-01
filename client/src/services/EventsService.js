import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{

    async getEvents(){
        const res = await api.get('api/events')
        logger.log('Got events in the service', res.data)
        AppState.towerEvents = res.data.map((pojo) => new TowerEvent(pojo))
        logger.log('mapped events', res.data)
        
    }
}

export const eventsService = new EventsService()
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

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('created an event', res.data)
        const newEvent = new TowerEvent(res.data)
        AppState.towerEvents.push(newEvent)
        return newEvent
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('cancelled event', res.data)
        AppState.activeEvent = new TowerEvent(res.data)
       
    }

    clearData(){
        AppState.activeEvent = null
    }
}

export const towerEventsService = new TowerEventsService()
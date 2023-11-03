<template>
    <div v-if="activeEvent" class="container-fluid">
            <section class="row">
                <div class="col-12 col-md-4 my-4">
                    
                   <img v-if="activeEvent.isCanceled" class="img-fluid img-cancelled rounded" :src="activeEvent.coverImg" alt="Your event">
                   <img v-else class="rounded img-fluid" :src="activeEvent.coverImg" alt="">
                   <h1 class="bold text-light" v-if="activeEvent.isCanceled"> Sorry, this event has been cancelled</h1>
                   <div class="d-flex justify-content-around my-2">
                    <button v-if="!activeEvent.isCanceled && activeEvent.ticketCount <= activeEvent.capacity" class="btn btn-warning" @click="createTicket()">Buy a Ticket</button>
                     <button v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled == false" @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
                   </div>
                </div>
                <div class="col-12 col-md-7 card-bg rounded text-light my-4">
                    <h2>{{ activeEvent.name }}</h2>
                    <h5>{{ activeEvent.description }}</h5>
                </div>
           
                <div class="col-11 ms-3 p-3 card-bg rounded text-light">
                   <img v-for="ticket in tickets" :key="ticket"  class="rounded-circle profile-img mx-2" :title="ticket.profile.name" :src="ticket.profile.picture" :alt="ticket.profile.name">
                </div>
            </section>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { ticketsService } from '../services/TicketsService';
import { AppState} from '../AppState.js'
import Pop from '../utils/Pop';





export default {
    setup() {
        onMounted(() => {
            getEventById();
            getTicketsByEventId()
        });
        const route = useRoute();
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await towerEventsService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function getTicketsByEventId(){
            try {
                const eventId = route.params.eventId
                await ticketsService.getTicketsByEventId(eventId)
            } catch (error) {
                Pop.error
            }
        }




        return {
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(()=> AppState.account),
            tickets: computed(()=> AppState.tickets),

            async cancelEvent(){
             try {
                const wantsToCancel = await Pop.confirm('Cancel this event?')
                if(!wantsToCancel){
                    return
                }

                 const eventId = route.params.eventId
                 await towerEventsService.cancelEvent(eventId)
               
                
             } catch (error) {
                Pop.error(error)
             }
            },
            async createTicket(){
                try {
                    Pop.success('Your ticket has been purchased, enjoy the event!')
                    const eventId = route.params.eventId
                    await ticketsService.createTicket(eventId)
                    
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    
};
</script>


<style lang="scss" scoped>
img{
    max-height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: 2px 2px 10px #6e33976a;
    transition: ease-in-out .5s;
}

img:hover{
    background-color: #6d3397;
    box-shadow: 4px 4px 60px #6d3397;
}

.card-bg{
background-color:#6d3397a9;
}

.img-cancelled{
    border: 2px solid red;
    opacity: 0.5;
}

.profile-img{
    max-height: 8vh;
    max-width: 8vh;
    
}


</style>
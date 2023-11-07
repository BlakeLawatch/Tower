<template>
    <div v-if="activeEvent" class="container-fluid">
            <section class="row">
                <div class="col-12 col-md-4 my-4">
                    
                    <img v-if="activeEvent.isCanceled" class="img-fluid img-cancelled rounded" :src="activeEvent.coverImg" alt="Your event">
                    <img v-if="activeEvent.capacity == 0" class="img-fluid img-cancelled rounded" :src="activeEvent.coverImg" alt="Your event">
                    <img v-else class="rounded img-fluid" :src="activeEvent.coverImg" alt="">
                   <h1 class="bold text-light" v-if="activeEvent.isCanceled"> Sorry, this event has been cancelled</h1>
                   <div class="d-flex justify-content-around my-2">
                    <button v-if="!activeEvent.isCanceled && activeEvent.capacity >= 1" class="btn btn-warning" @click="createTicket()">Buy a Ticket</button>
                     <button v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled == false" @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
                   </div>
                </div>
                <div class="col-12 col-md-6 card-bg rounded text-light my-4 d-flex">
                    <div class="col-7">
                        <h2>{{ activeEvent.name }}</h2>
                        <h5>{{ activeEvent.description }}</h5>
                    </div>
                    <div class="col-12 col-md-4">
                        <h6> Location: {{ activeEvent.location }}</h6>
                        <h6> Start Date: {{ activeEvent.startDate.toLocaleDateString() }}</h6>
                        <h6> Total Tickets Purchased: {{ activeEvent.ticketCount }}</h6>
                        <h6 v-if="activeEvent.capacity > activeEvent.ticketCount"> Tickets Left: {{ activeEvent.capacity }}</h6>
                        <p v-else class="fs-1 border border-danger bg-danger text-center"> Show is sold out</p>
                        <p v-if="activeEvent.ticketCount > 0"> You are attending this event</p>
                    </div>
                </div>
                
                <div v-for="ticket in tickets" :key="ticket"   class="col-3 ms-3 p-3 card-bg rounded text-light">
                    <img class="rounded-circle profile-img m-1" :title="ticket.profile.name" :src="ticket.profile.picture" :alt="ticket.profile.name">
                    <h6 v-if="ticket.profile.id == account.id" >Here is a ticket!</h6>
                </div>

            </section>
            <section>
                <CommentModal />
                <div v-for="comment in comments" :key="comment" class="col-12 text-light m-2 d-flex comment-card rounded p-3">
                    <div class="col-5">
                        <img class="profile-img rounded-circle my-1 img-fluid" title="comment.creator.name" :src="comment.creator.picture" alt="">
                        <p>{{ comment.creator.name }}</p>
                    </div>
                    <div class="col-7 shadow rounded p-2">
                        {{ comment.body }}
                        <button v-if="comment.creatorId == account.id"  @click="destroyComment(comment.id)" class=" text-end btn btn-danger mdi mdi-delete-empty"></button>
                    </div>
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
import CommentModal from '../components/CommentModal.vue';
import { commentsService } from '../services/CommentsService';





export default {

    setup() {
        onMounted(() => {
            getEventById();
            getTicketsByEventId();
            getCommentsByEventId()
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
        async function getTicketsByEventId() {
            try {
                const eventId = route.params.eventId;
                await ticketsService.getTicketsByEventId(eventId);
            }
            catch (error) {
                Pop.error;
            }
        }

        async function getCommentsByEventId(){
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByEventId(eventId)
                
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            route,
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            comments: computed(()=> AppState.comments),
            myTickets: computed(()=> AppState.myTotalTickets),
            // TODO create a computed to check to see if person is attending event....you will use this for the styling indication
            // NOTE ^^ refer to the isCollaborator on PostIt
            async cancelEvent() {
                try {
                    const wantsToCancel = await Pop.confirm('Cancel this event?');
                    if (!wantsToCancel) {
                        return;
                    }
                    const eventId = route.params.eventId;
                    await towerEventsService.cancelEvent(eventId);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async createTicket() {
                try {
                    Pop.success('Your ticket has been purchased, enjoy the event!');
                    const eventId = route.params.eventId;
                    await ticketsService.createTicket(eventId);
                    // AppState.activeEvent = new AppState.activeEvent
                
                    this.activeEvent.ticketCount ++
                    this.activeEvent.capacity --
                }
                catch (error) {
                    Pop.error(error);
                }
            },

            async destroyComment(commentId){
                 try {
                     const deleteComment = await Pop.confirm('You wanna delete this comment?')
                     if(!deleteComment){
                         return
                        }
                    // const commentId = route.params.commentId
                    await commentsService.destroyComment(commentId)
                } catch (error) {
                    Pop.error(error)
}
            }
        };
    },
    components: { CommentModal }
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

.comment-card{
    background-color: #1abc9cd3;
}


</style>
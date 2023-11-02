<template>
    <div v-if="activeEvent" class="container-fluid">
            <section class="row">
                <div class="col-12 col-md-4">
                   <img class="rounded" :src="activeEvent.coverImg" alt="src/assets/img/damian-patkowski-T-LfvX-7IVg-unsplash.jpg">
                   <div class="d-flex justify-content-around my-2">
                    <button type="button" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#createEventModal">
                         Create Event
                    </button>
                    <CreateEventModalComponent />
                       <button @click="cancelEvent()" class="btn btn-danger rounded-pill">Cancel Event</button>

                   </div>
                </div>
                <div class="col-12 col-md-8 card-bg rounded text-light">
                    <h2>{{ activeEvent.name }}</h2>
                    <h5>{{ activeEvent.description }}</h5>
                </div>
            </section>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { AppState} from '../AppState.js'
import Pop from '../utils/Pop';
import CreateEventModalComponent from '../components/CreateEventModalComponent.vue';




export default {
    setup() {
        onMounted(() => {
            getEventById();
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
        return {
            activeEvent: computed(() => AppState.activeEvent),

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
}
        };
    },
    components: { CreateEventModalComponent }
};
</script>


<style lang="scss" scoped>
img{
    max-height: 40vh;
    max-width: 50vh;
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


</style>
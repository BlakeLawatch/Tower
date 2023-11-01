<template>
    <div v-if="activeEvent" class="container-fluid">
            <section class="row">
                <div class="col-12 col-md-4">
                   <img class="rounded" :src="activeEvent.coverImg" alt="src/assets/img/damian-patkowski-T-LfvX-7IVg-unsplash.jpg">
                </div>
                <div class="col-12 col-md-7 card-bg rounded text-light">
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


export default {
    setup(){
        onMounted(()=> {
        getEventById()
        })
        const route = useRoute()


        async function getEventById(){
            try {
                const eventId = route.params.eventId
                await towerEventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }
}


    return { 
        activeEvent: computed(()=> AppState.activeEvent)
     }
    }
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
    background-color: #6e33976a;
    box-shadow: 4px 4px 20px #6d3397c6;
}

.card-bg{
background-color:#6e33976a;
}


</style>
<template>
 <div class="container-fluid">
   <section class="row my-2">
    <div v-for="myTicket in myTickets" :key="myTicket" class="col-8">
      <!-- TODO get my events that I have tickets for working here -->
      <!-- <img :src="myTicket.event.coverImg " alt=""> -->
    </div>
      <div class="col-4">
        <button v-if="account" type="button" class="btn btn-light rounded-pill my-2" data-bs-toggle="modal" data-bs-target="#createEventModal">
              Create Event   </button>
      </div>
    </section>
<section class="row">
  <div class="col-12">
    <div class="bg-primary p-4 d-flex justify-content-around">
      <button class="btn btn-outline-light rounded-pill w-100" @click="changeEventType('')"> All </button>
      <button class="btn btn-outline-light rounded-pill w-100 mx-1" @click="changeEventType(eventType)" v-for="eventType in eventTypes" :key="eventType"> {{ eventType }}</button>
    </div>
  </div>
</section>
<section class="row">
  <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-6 col-md-3">
<TowerEventComponent :towerEventProp="towerEvent" />
  </div>
</section>
 </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService'
import {AppState} from '../AppState.js'
import TowerEventComponent from '../components/TowerEventComponent.vue'
import { logger } from '../utils/Logger';


export default {
    setup() {
      const eventTypes = ['concert', 'convention', 'sport', 'digital'];
      const filteredEventType = ref('')
        async function getEvents() {
            try {
                await towerEventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
          eventTypes,
          filteredEventType,
          myTickets: computed(()=> AppState.myTotalTickets),
          account: computed(()=> AppState.account),
          towerEvents: computed(()=>{
            if(filteredEventType.value){
              return AppState.towerEvents.filter(
                (pojo)=> pojo.type == filteredEventType.value
              );
            } else {
              return AppState.towerEvents
            }
          }),
         
            

          async changeEventType(eventType){
              logger.log('event type', eventType)
              filteredEventType.value = eventType
          }
        };
    },
    components: { TowerEventComponent }
}
</script>

<style scoped lang="scss">

</style>
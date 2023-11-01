<template>
 <div> {{ towerEvents }}</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js'
import {AppState} from '../AppState.js'

export default {
  setup() {

    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

onMounted(()=> {
getEvents()
})
    return {


      towerEvents: computed(()=> AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

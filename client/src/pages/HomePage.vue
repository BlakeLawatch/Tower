<template>
 <div class="container-fluid">
  <section class="row">
<div class="col-12">
 Some kind of header or something?
</div>
</section>
<section class="row">
  <div class="col-12">
    Filter Bar will go here
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
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService'
import {AppState} from '../AppState.js'
import TowerEventComponent from '../components/TowerEventComponent.vue'


export default {
    setup() {
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
            towerEvents: computed(() => AppState.towerEvents)
        };
    },
    components: { TowerEventComponent }
}
</script>

<style scoped lang="scss">

</style>
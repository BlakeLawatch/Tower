<template>
    <router-link :to="{name: 'EventDetails', params: { eventId: towerEventProp.id}}">
        <div class="rounded">
            <img class="rounded my-3" :src="towerEventProp.coverImg" alt="event in your area">
           <p class=" rounded bg-dark text-light p-1 my-1">{{ towerEventProp.name }}</p>
           </div>
    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent';


export default {
    props: { towerEventProp: {type: TowerEvent, required: true}},
    setup(){
        
    return { 
        
     }
    }
};
</script>


<style lang="scss" scoped>

img{
    height: 20vh;
    width: 20vw;
    object-fit: cover;
    object-position: center;
}
</style>
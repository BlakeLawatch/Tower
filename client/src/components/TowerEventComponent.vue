<template>
    <router-link :to="{ name: 'EventDetails', params: { eventId: towerEventProp.id } }">
        <div class="rounded text-center">
            <img v-if="towerEventProp.isCanceled" class="rounded my-3 img-cancelled" :src="towerEventProp.coverImg"
                alt="event in your area">
            <img v-else class="rounded my-3" :src="towerEventProp.coverImg" alt="event in your area">

            <p v-if="towerEventProp.isCanceled" class="text-center rounded bg-dark text-light p-1 my-1">Event has been
                cancelled</p>
            <p v-else class="text-center rounded bg-dark text-light p-1 my-1">{{ towerEventProp.name }}</p>
        </div>
    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent';


export default {
    props: { towerEventProp: { type: TowerEvent, required: true } },
    setup() {
        return {

        }
    }
};
</script>


<style lang="scss" scoped>
img {
    height: 20vh;
    width: 20vw;
    object-fit: cover;
    object-position: center;
}

.img-cancelled {
    border: 2px solid red;
    opacity: 0.5;
}
</style>
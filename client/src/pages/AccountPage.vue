<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <section class="row">
    <div>
      <h1 class="text-center text-light">TICKET COLLECTION</h1>

    </div>
    <div class="col-6 col-md-2 my-3 text-center" v-for="ticket in tickets" :key="ticket">
      <img class="ticket-img border border-dark" :src="ticket.event.coverImg" alt="" :title="ticket.event.name">
      <div>
        <button @click="cancelTicket()" class=" text-center btn btn-danger mdi mdi-delete-empty mt-1">Cancel Ticket</button>

      </div>
    </div>

  </section>
 
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { ticketsService } from '../services/TicketsService';
export default {
  setup() {
const route = useRoute()
   
   
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTotalTickets),
      destroyTicket: computed(()=> AppState.tickets),
      route,


      async cancelTicket(){
        try {
          const wantsToCancel = await Pop.confirm('Cancel this ticket?')
          if (!wantsToCancel){
            return
          }
          const ticketId = route.params._id
          await ticketsService.cancelTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.ticket-img{
  max-height: 10vh;
 max-width: 10vw;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 2px 2px rgb(255, 255, 255);
  
}
</style>

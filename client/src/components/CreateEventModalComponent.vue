<template>
  <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
          <div class="mb-3">
             <label for="name" class="form-label">Name of Event</label>
             <input v-model="editable.name" type="text" class="form-control" id="name" required maxlength="50">
          </div>
          <div class="mb-3">
             <label for="description" class="form-label">description of Event</label>
             <input v-model="editable.description" type="text" class="form-control" id="description" required maxlength="500">
          </div>
          <div class="mb-3">
             <label for="coverImg" class="form-label">Image of event</label>
             <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" required>
          </div>
          <div class="mb-3">
             <label for="location" class="form-label">Location</label>
             <input v-model="editable.location" type="text" class="form-control" id="location" required maxlength="50">
          </div>
          <div class="mb-3">
             <label for="capacity" class="form-label">capacity</label>
             <input v-model="editable.capacity" type="number" class="form-control" id="capacity" required>
          </div>
          <div class="mb-3">
             <label for="startDate" class="form-label">Date of Event</label>
             <input v-model="editable.startDate" type="text" class="form-control" id="startDate" required>
          </div>
          <div class="mb-3">
             <label for="type" class="form-label">Type of Event</label>
             <select v-model="editable.type" class="form-select" name="" id="">
               <option :value="type" :key="type" v-for="type in types"> {{ type }} </option>

             </select>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit Event</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';






export default {
    setup(){
      const types = ['concert', 'convention', 'sport', 'digital'];
      const editable= ref({})
      


    return { 
types,
editable,


        async createEvent(){
          try {
            const eventData = editable.value
            const event = await towerEventsService.createEvent(eventData)
            Pop.success("Created Event!")
            // editable.value = {};
            // Modal.getOrCreateInstance(#createEventModal).hide()
            
          } catch (error) {
            Pop.error(error)
          }
},


     }
    }
};
</script>


<style lang="scss" scoped>

</style>
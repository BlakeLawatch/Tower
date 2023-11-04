<template>
   <div id="commentModal">
       <form @submit.prevent="createComment()">
            <div class="mb-3">
                 <label for="description" class="form-label"></label>
                 <textarea v-model="editable.body" class="form-control" id="body" cols="15" rows="5" required
                    maxlength="5000" placeholder="Leave your comments on this event here...">
                </textarea>
            </div>
            <button class="btn btn-light" type="submit">Submit</button>
        </form>
   </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';
import { ref } from 'vue';
import { Modal } from 'bootstrap';

export default {
    setup(){
        const editable = ref({})
        const route = useRoute()
        
    return { 
        editable,
        
        
        async createComment(){
                try {
                    const commentData = editable.value
                    commentData.eventId = route.params.eventId
                    await commentsService.createComment(commentData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#commentModal')
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
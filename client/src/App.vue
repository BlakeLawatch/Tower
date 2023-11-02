<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <CreateEventModalComponent />
  
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import CreateEventModalComponent from './components/CreateEventModalComponent.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateEventModalComponent }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

body{
  background-image: url(src/assets/img/wesley-tingey-mvLyHPRGLCs-unsplash.jpg);
 
  background-position: bottom;
  background-size: cover;
  background-attachment: fixed;
}

</style>

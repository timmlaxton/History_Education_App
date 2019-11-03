<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      | <router-link :to="{ name: 'rome-story' }">Roman Republic</router-link>
      | <router-link :to="{ name: 'ww2-story' }">WW2</router-link>
      | <router-link :to="{ name: 'usa-story' }">US Civil War</router-link>
      | <router-link :to="{ name: 'create-your-own' }">Create Your Own</router-link>
    </nav>

    <div class="">
    <router-view id="view" :events="events" :selectedEpisode="selectedEpisode"></router-view>

  </div>
    </div>

</template>

<script>
import {eventBus} from './main.js'

export default {
  name: 'app',
  data() {
    return {
  events: [],
  selectedEpisode: -1
    }
  },
mounted(){
  fetch('http://localhost:3000/api/events/')
  .then(res => res.json())
  .then(events => this.events = events)

  eventBus.$on('new event selected', (payload) => {
    this.selectedEpisode = payload
  })
}
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  margin-top: 0px;
  background-color: AntiqueWhite;
  height: 100vh;
}
nav {
  margin-bottom: 0px;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: grey;
  color: white;
}
a {
  color: white;
}
body {
  margin: 0px;
  /* padding-bottom: 10px; */
}
</style>

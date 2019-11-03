<template lang="html">
  <div>
<h2 v-if="event">{{event.title}}</h2>
<p v-if="event">{{event.blurb}}</p>
<img v-if="event" :src="event.image"/>
<h2 v-if="!event">Click begin to start the timeline.</h2>
<p v-if="!event">Or click an item on the timeline to see that event.</p>
</div>
</template>

<script>
export default {
name: "event",
data(){
  return {
    selectedEvent: null
  }
},
props: ['event'],
methods: {
  }
}
</script>

<style lang="css" scoped>
img {
  max-height: 200px;
  max-width: 350px;
}
</style>

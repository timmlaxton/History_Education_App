<template lang="html">
  <div class="map">
    <l-map v-on:click="showCoordinates"  :zoom="zoom" :minZoom='2' :center="center" :attribution="attribution" ref="map">
   <l-tile-layer :url="mapUrl"></l-tile-layer>
   <l-marker v-if="index > -1" :lat-lng="events[index]['coordinates']" ref="marker">
     <l-popup ref="popup" class="popup">
       <h2>{{events[this.index].title}}</h2>
       <h3>Location: {{events[this.index].location}}</h3>
     </l-popup>
   </l-marker>
 </l-map>
 <div class="buttons">
   <button v-on:click="handlePreviousClick">Previous</button>
 <button v-on:click="beginJourney">Begin</button>
 <button v-on:click="handleNextClick">Next</button>
</div>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
import Event from './Event.vue'

export default {
  name: "map-box",
  props: ["events", "mapUrl", "center"],
  methods: {
    showCoordinates(ev){
     let coordinates = [ev['latlng']['lat'], ev['latlng']['lng']];
    eventBus.$emit('map clicked', coordinates)
  },
    handleNextClick(){
      if ((this.index > -1) && (this.index + 1 < this.events.length )){
          this.index ++
          this.$refs.map.mapObject.flyTo(this.events[this.index]['coordinates'], 10)
          eventBus.$emit('new event selected', this.index)
      }
    },
    handlePreviousClick(){
      if ((this.index > 0) && (this.index < this.events.length)){
          this.index --
          this.$refs.map.mapObject.flyTo(this.events[this.index]['coordinates'], 10)
          eventBus.$emit('new event selected', this.index)
      }
    },
    beginJourney(){
      this.index = 0
      this.$refs.map.mapObject.flyTo(this.events[this.index]['coordinates'], 10)
      eventBus.$emit('new event selected', this.index)
      this.$refs.marker.mapObject.openPopup()
    },
    jumpToEvent(indexSelected){
      this.index = indexSelected
      this.$refs.map.mapObject.flyTo(this.events[this.index]['coordinates'], 10)
    }
  },
  data(){
    return{
      zoom:4,
      // center: L.latLng(50.51342652633956, 13.0078125),
      url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      index: 0,
      map: null,
      places: [
        {
          "title": "London",
          "blurb": "Blah Blah Blah Blah",
          "coordinates": L.latLng(51.413220, -1.219482)
        },
        {
          "title": "France",
          "blurb": "Blah Blah Blah Blah",
          "coordinates": L.latLng(46.413220, -1.219482)
        },
        {
          "title": "Spain",
          "blurb": "Blah Blah Blah Blah",
          "coordinates": L.latLng(40.413220, -1.219482)
        }
      ]
    }
  },
  mounted(){
    eventBus.$on('event clicked', (payload) => {
      this.jumpToEvent(payload)
    })
    eventBus.$on('create page', (payload) => {
      this.index = -1
    })
  },
  components: {
    'event': Event
  }
}
</script>

<style lang="css" scoped>

.map{
  height: 50vh;
  width: 60vw;
  margin: auto;
  margin-bottom: 10px;
  padding-bottom: 20px;
}

.popup{
  /* width: 150px;
height: 50px;
overflow: scroll; */
}

.buttons{
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}

button {
  font-size: 0.83rem;
}

</style>

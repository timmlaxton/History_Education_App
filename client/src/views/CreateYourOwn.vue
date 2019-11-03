<template lang="html">
  <div class="all">
    <h2>Create Your Own Timeline!</h2>
    <div class ="event-and-map">
      <map-box :selectedEpisode="selectedEpisode" :events="episodes" :mapUrl="mapUrl" :center="center"/>
      <div class="event-container">
        <p v-if="formOn" class="instructions">Create your events, add them to the timeline, then click finish when you are done!</p>
        <form v-if="formOn" class="" v-on:submit.prevent="handleSubmit" type="post">
          <label for="title">Event:</label>
          <input id="title" type="text" name="" v-model="title" required>
          <label for="date">Date:</label>
          <input id="date" type="text" name="" v-model="date" required>
          <label for="summary">Summary:</label>
          <textarea id="summary"  v-model="blurb" />
          <p>Location:</p>
          <p v-if="coordinates">{{coordinates}}</p>
          <p v-if="!coordinates"><em>Click the map to add a location</em></p>
          <input type="submit" class="submit" value="Add Event">
        </form>
        <br />
        <button v-if="formOn" v-on:click="handleFinish" type="button" name="button">Finish!</button>

        <event v-if="!(formOn)" :event="episodes[selectedEpisode]"/>
      </div>
    </div>

    <timeline selectedEpisode="selectedEpisode" :events="episodes" :inheritedStyle="inheritedStyle" :boxWidth="boxWidth" :dateBreadth="dateBreadth"/>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'
import MapBox from '@/components/MapBox'
import Event from '@/components/Event'
import {eventBus} from '../main.js'

export default {
  data() {
    return {
      formOn: true,
      title: "",
      date: "",
      blurb: "",
      coordinates: "",
      episodes: [],
      boxWidth: 8,
      inheritedStyle: {
        box: {},
        branch: {},
        grid: {},
        timeline: {},
        boundaries: {
          start: {

          },
          end: {
            'grid-column': '92 / 101',
            'text-align': 'right'
          }
        },
        date: {    },
        title: {},
        selected: {
          "font-weight": "bold",
        }
      },
      dateBreadth: {
        start: '',
        end: ''
      },
      mapUrl: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
      center: [50.51342652633956, 13.0078125]
    }
  },
  mounted() {
    eventBus.$on('map clicked', (payload) => {
      this.coordinates = payload;
    })
    eventBus.$emit('create page', null)
  },
  methods: {
    handleSubmit() {
      if(this.coordinates){
      this.episodes.push(
        {
          title: this.title,
          date: this.date,
          blurb: this.blurb,
          coordinates: this.coordinates
        }
      )
      this.dateBreadth.end = this.date
      if(this.episodes.length == 1){
        this.dateBreadth.start = this.date
      }
      this.title = this.date = this.coordinates = this.blurb = ""
    } else {
      alert("Please click a location on the map before submitting the form!")
    }
    },
    handleFinish() {
      console.log('finished')
      this.formOn = false;
    }
  },
  components: {
    "timeline": Timeline,
    "event": Event,
    "map-box": MapBox
  },
  props: ['selectedEpisode']
}
</script>

<style lang="css" scoped>
.all {
  margin: 0px;
}
p {
  margin-top: 2px;
  margin-bottom: 2px;
}

h2 {
  size: 1.5rem;
  padding-top: 4px;
  padding-bottom: 3px;
  margin-bottom: 10px;
  margin-top: 0px;
}

.event-and-map{
  display: flex;
  padding: 1px 10px;
}

.event-container{
  width: 30%;
  margin: auto;
  padding: 8px;
  border: 1px solid black;
  border-radius: 0.5em;
}

.instructions{
  font-weight: bold;
  margin-bottom: 6px;
}

form{
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  border-bottom: 1px dashed black;
}
textarea{
  height: 10vh;
  resize: none;
}

.submit{
  margin: auto;
  margin-top: 5px;
}

em {
  font-weight: bold;
}

button {
  /* font-size: 1rem; */
}
</style>

<template lang="html">
  <div class="body">
    <div class="titles">
      <h1>World War II | 1939-1945</h1>
    </div>
      <div class="top-half">
        <div class="text-box">
          <event :event="filteredEvents[selectedEpisode]"/>
        </div>
        <div class="map">
          <map-box :selectedEpisode="selectedEpisode" :events="filteredEvents" :mapUrl="mapUrl" :center="center"/>
        </div>
    </div>
  <timeline :selectedEpisode="selectedEpisode" :events="filteredEvents" :inheritedStyle="inheritedStyle" :boxWidth="boxWidth" :dateBreadth="dateBreadth"/>
</div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import MapBox from '@/components/MapBox.vue'
import {eventBus} from '../main.js'
import Event from '@/components/Event.vue'

export default {
  props: ["events", 'selectedEpisode'],
  computed: {
    filteredEvents(){
      const results = this.events.filter((event) => {
        return event.tag == "WW2"
      })
      return results
    }
  },
  components: {
    "timeline": Timeline,
    "map-box": MapBox,
    'event': Event
  },
  data() {
    return {
      boxWidth: 8,
      inheritedStyle: {
        box: {
          'background-color': '#DAD7CD'
        // 'background-image': 'url(../assets/images/camo.jpg)'
        },
        branch: {
          'border-color': '#A8060C'
        },
        grid: {
          'background-color': '#588157'
        },
        timeline: {
          'border-color': '#A8060C'
        },
        boundaries: {
          start: {

          },
          end: {

          }

        },
        date: {},
        title: {},
        selected: {
          'background-color': 'grey',
          'color': 'white'
        }
      },
      dateBreadth: {
        start: '1939',
        end: '1945'
      },
      mapUrl: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
      center: [50.51342652633956, 13.0078125]
      // mapUrl: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png'
    }
  },
  mounted() {
    eventBus.$emit('new event selected', -1)
  }
}
</script>

<style lang="css" scoped>

.body{
    background-color: #A3B18A;
    /* background-image: url('../assets/images/camo.jpg'); */
    margin: 0px;
    font-family: American Typewriter, serif;
}
h1{
  size: 1.5rem;
  padding-top: 4px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
}

.titles{
  padding: 0px;
  display: flex;
  justify-content:center;
  align-items: center;
  border-style: solid;
}

.top-half{
  /* margin-top: 20px; */
  display: flex;
  padding: 10px;
  /* justify-content: space-around; */
}

.map{
  margin: 10px;
}

.text-box{

  width: 30vw;
  font-size: 0.8em;
  border-width: medium;
  border-style: solid;
  margin: auto;
  background-image: url('../assets/images/newspapers.jpg');
  background-size: contain;

  transition: width 2s, height 4s;
}
</style>

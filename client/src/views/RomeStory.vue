<template lang="html">
  <div class="all">
    <h1>THE FALL OF THE ROMAN REPUBLIC</h1>
    <div class="event-and-map">
      <div class="map-container">
        <map-box :selectedEpisode="selectedEpisode" :events="filteredEvents" :mapUrl="mapUrl" :center="center"/>
      </div>
      <div class="event-container">
        <event :event="filteredEvents[selectedEpisode]"/>
      </div>
    </div>
    <timeline :selectedEpisode="selectedEpisode" :events="filteredEvents" :inheritedStyle="inheritedStyle" :boxWidth="boxWidth" :dateBreadth="dateBreadth"/>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import MapBox from '@/components/MapBox.vue'
import Event from '@/components/Event.vue'
import {eventBus} from '../main.js'

export default {
  props: ["events", 'selectedEpisode'],
  computed: {
    filteredEvents(){
      const results =  this.events.filter((event) => {
        return event.tag == "Rome"
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
          "font-family": "Palatino, serif",
          'color': '#E6AF2E',
          'border-color': '#A8060C',
          'background-color': '#2E0219',
          'box-shadow': '1px 1px #E6AF2E',
          'border-width': '1px'
        },
        branch: {
          'border-color': '#A8060C'
        },
        grid: {
          'background-color': '#00100A'
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
        date: {  },
        title: {},
        selected: {
          'background-color': '#5A1733',
          'border-color': '#E6AF2E',
          'box-shadow': '0px 0px 0px 5px #A8060C',
          'border-width': '1px'
        }
      },
      dateBreadth: {
        start: '82 BC',
        end: '27 BC'
      },
      mapUrl: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      center: [41.01649883461313, 14.229094522985932]
    }
  },
  mounted() {
    eventBus.$emit('new event selected', -1)
  }
}


</script>

<style lang="css" scoped>
  .all {
    margin: 0px;
    font-family: 'Palatino', serif;
    color: #E6AF2E;
    background-color: #4A001F;
    padding-bottom: 80px;
  }

  h1 {
    size: 1.5rem;
    padding-top: 4px;
    padding-bottom: 3px;
    margin-bottom: 10px;
    margin-top: 0px;
    border-top: 2px solid #E6AF2E;
    border-bottom: 2px solid #E6AF2E;
  }

  .event-and-map{
    display: flex;
    padding: 1px 10px;
  }

  .event-container{
    width: 30%;
    margin: auto;
    border: 1px solid #E6AF2E;
    padding: 8px;
  }




</style>

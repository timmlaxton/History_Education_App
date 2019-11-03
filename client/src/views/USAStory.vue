<template lang="html">
  <div class="all">
  <h1>The Civil War</h1>
  <div class="event-and-map">
  <div class="map-container">
    <div class="event-container">
  <map-box :selectedEpisode="selectedEpisode" :events="filteredEvents" :mapUrl="mapUrl" :center="center"/>
</div>

  <event class="event" :event="filteredEvents[selectedEpisode]"/>
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
      const results = this.events.filter((event) => {
        return event.tag == "Civil War"
      })
      return results
    }
  },
  components: {
    "timeline": Timeline,
    "map-box": MapBox,
    "event": Event
  },
  data() {
    return {
      boxWidth: 8,
      inheritedStyle: {
        box: {
        'font-family': '#E6AF2E',
        'border-color': '#E6AF2E',
        'border-width': '3px'
        },
        branch: {
          'border-color': '#E6AF2E'

        },
        grid: {
        },
        timeline: {
          'border-color': '#E6AF2E'
        },
        boundaries: {
          start: {
            'border-color': '#E6AF2E'
          },
          end: {
            'border-color': '#E6AF2E'
          }

        },
        date: {},
        title: {},
        selected: {
          'border-color': '#E6AF2E',
          'background-color': '#FFFFFF90',

        }
      },
      dateBreadth: {
        start: '1665',
        end: '1861'
      },
      mapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      center: [39.804755362523224, -99.16197449275398]
    }
  },
  mounted() {
    eventBus.$emit('new event selected', 0)
    // this.episodeSelected = 0
  }
}
</script>

<style lang="css" scoped>

.all {
  margin: 0px;
  background-image:url(https://chainimage.com/images/old-paper-background-photo-background-1-jpg.jpg);
  color: black;
  font-size: 26px;
  font-weight: bold;

}

p .event {
  font-size: 50rem;
}

  h1 {
    size: 1.5rem;
    padding-top: 4px;
    padding-bottom: 3px;
    margin-bottom: 10px;
    margin-top: 0px;
    border-top: 3px solid #E6AF2E;
    border-bottom: 2px solid #E6AF2E;
  }

  .event-and-map{
    display: flex;
    padding: 10px 10px;

  }

  .event-container{
    width: 65%;
    margin: auto;
    border: 10px solid #E6AF2E;
    padding: 8px;
  }




</style>

}


</style>

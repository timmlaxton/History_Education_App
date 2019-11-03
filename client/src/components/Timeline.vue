<template lang="html">
<div>
  <div class="grid" :style="gridStyle">
    <div class="start-date" :style="inheritedStyle.boundaries.start">{{dateBreadth.start}}</div>
    <div class="end-date" :style="inheritedStyle.boundaries.end">{{dateBreadth.end}}</div>
    <div class="timeline" :style="inheritedStyle.timeline"></div>
    <div v-for="(episode, index) in events" :class="'episode'+index" :style="styles[index]" v-on:click="handleClick(index)">
      <p class="date" :style="inheritedStyle.date">{{episode.date}}</p>
      <p class="title" :style="inheritedStyle.title">{{episode.title}}</p>
    </div>
    <div v-for="(episode, index) in events" :class="'episode'+index+'branch'" :style="branches[index]" style="">
    </div>
    <div class="test"></div>
  </div>
</div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: 'timeline',
  data() {
    return {
    boxGap: 1,
    gridsize: 100,
    }
  },
  props: ['selectedEpisode', "events", "inheritedStyle", "boxWidth", "dateBreadth"],
  computed: {
    gridStyle(){
       const style = {
        'grid-template-columns': 'repeat(' + this.gridsize + ', 1fr)'
      }
      Object.assign(style, this.inheritedStyle.grid)
      return style
    },
    styles() {
      const noOfEpisodes = this.events.length
      let episodeGap = Math.floor((this.gridsize + noOfEpisodes)/(noOfEpisodes))
      if(episodeGap <2){
        episodeGap = 2;
      }
      const stylesArray = []
      let startingColumn = 2
      let endingColumn = startingColumn + this.boxWidth
      for(let i=0; i < noOfEpisodes; i++){
        const baseStyle = {
          border: '1px solid black',
          'grid-column': '',
          'grid-row': '1/3',
          overflow: 'scroll',
          'box-shadow': '1px 1px black',
          'padding': '1px'
        }
        Object.assign(baseStyle, this.inheritedStyle.box)
        if(i == this.selectedEpisode){
          baseStyle['background-color'] = this.highlightColor
          baseStyle['border-color'] = 'navy'
          baseStyle['font-weight'] = 'bold'
          Object.assign(baseStyle, this.inheritedStyle.selected)
        }
        stylesArray.push(baseStyle);
        if(i % 2 == 1){
          stylesArray[i]['grid-row'] = '5/7'
        }
        stylesArray[i]['grid-column'] = startingColumn + '/' + endingColumn;
        startingColumn += (episodeGap -1);
        endingColumn += (episodeGap -1);
      }
      return stylesArray
    },
    branches() {
      const noOfEpisodes = this.events.length
      const episodeGap = Math.floor((this.gridsize + noOfEpisodes)/(noOfEpisodes))
      const stylesArray = []
      let column = 1 + this.boxWidth/2
      for(let i=0; i < this.events.length; i++){
        const baseStyle = {
          'border-right': '1px solid black',
          'grid-column': '',
          'grid-row': '3/4',
        }
        Object.assign(baseStyle, this.inheritedStyle.branch)
        stylesArray.push(baseStyle);
        stylesArray[i]['grid-column'] = column + '/' + column;
        if(i % 2 == 1){
          stylesArray[i]['grid-row'] = '4/5'
        }
        column += (episodeGap -1);
      }
      return stylesArray
    }
  },
  methods: {
    handleClick(index) {
      // this.selectedEpisode = this.index
      eventBus.$emit('new event selected', index)
      eventBus.$emit('event clicked', (index))
    }
  }

}
</script>

<style lang="css" scoped>
.grid{
  display: grid;
  /* grid-template-columns: repeat(50, 1fr); */
  grid-template-rows: repeat(6, 1fr);
  margin: auto;
  height: 30vh;
  width: 95%;
  border: 1px solid black;
  padding: 10px;
  border-radius: 1em;
}
/* .box {
  border: 2px solid black;
} */
.start-date {
  grid-column: 1 / 5;
  grid-row: 4 / 5;
}
.end-date {
  grid-column: 97 / 101;
  grid-row: 4 / 5;
}
.timeline {
  border-bottom: 3px dashed black;
  grid-column: 3 / 98;
  grid-row: 3 / 4;
}
p {
  margin: 0px;
  font-size: 0.8rem;

}

.date {
  font-size: 0.9rem;
}

</style>

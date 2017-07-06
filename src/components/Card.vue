<template>
  <div>
  <div class="card">
    <div class="title">
      This is the title of the card
      
    </div>
  </div>
    <div class="row">
      <div class="width-1of5">B</div>
      <div class="width-1of5">I</div>
      <div class="width-1of5">N</div>
      <div class="width-1of5">G</div>
      <div class="width-1of5">O</div>
    </div>
    <div class="row" v-for="item in chunkedItems">
      <div class="width-1of5 cardBox" v-bind:class="[{submitted: isPending(item[0])},{confirmed: item[0].completed}]">
      {{item[0].id}}
      {{item[0].info.title}}
      <div v-if="item[0].image"><img :src="item[0].image" /> </div>
      <div v-else><button @click="takePic(item[0])" class="primary circular"><i>camera_alt</i></button></div>

      </div>
      <div class="width-1of5 cardBox" v-bind:class="[{submitted: isPending(item[1])},{confirmed: item[1].completed}]">
        {{item[1].id}}
      {{item[1].info.title}}
      <div v-if="item[1].image"><img :src="item[1].image" /> </div>
      <div v-else><button @click="takePic(item[1])" class="primary circular"><i>camera_alt</i></button></div>
      </div>
      <div class="width-1of5 cardBox" v-bind:class="[{submitted: isPending(item[2])},{confirmed: item[2].completed}]">
        {{item[2].id}}
      {{item[2].info.title}}
      <div v-if="item[2].image"><img :src="item[2].image" /> </div>
      <div v-else><button @click="takePic(item[2])" class="primary circular"><i>camera_alt</i></button></div>
      </div>
      <div class="width-1of5 cardBox" v-bind:class="[{submitted: isPending(item[3])},{confirmed: item[3].completed}]">
        {{item[3].id}}
      {{item[3].info.title}}
      <div v-if="item[3].image"><img :src="item[3].image" /> </div>
      <div v-else><button @click="takePic(item[3])" class="primary circular"><i>camera_alt</i></button></div>
      </div>
      <div class="width-1of5 cardBox" v-bind:class="[{submitted: isPending(item[4])},{confirmed: item[4].completed}]">
        {{item[4].id}}
      {{item[4].info.title}}
      <div v-if="item[4].image"><img :src="item[4].image" /> </div>
      <div v-else><button @click="takePic(item[4])" class="primary circular"><i>camera_alt</i></button></div>
      </div>
    </div>
  </div>
</template>
<style>
  .cardBox {
    border: 1px dashed #ddd;
    box-shadow: 0 0 0 3px #fff, 0 0 0 5px #ddd, 0 0 0 10px #fff, 0 0 2px 10px #eee;
    padding: 5px;
    margin: 5px;
    height: 80px;
  }

  .submitted {
    background-color: blue;
  }

  .confirmed {
    background-color: green;

  }

  .bingo {

  }

  .voting {

  }

  .voteWon {

  }
</style>

<script>
import api from '../classes/Api.js'
import _ from 'lodash'
import bingo from '../classes/Bingo.js'
export default {
  props: ['cardId', 'gameId'],
  data () {
    return {
      card: {},
      challenges: [],
      bingos: [],
      newData: false
    }
  },
  methods: {
    getCardData () {
      api.getCardData(this.cardId).then(response => {
        console.log('Card from the api')
        console.log(response)
        this.card = response
        this.challenges = response.challenges
        this.checkBingos()
      }).catch(error => {
        console.log(error)
      })
    },
    takePic (challenge) {
      challenge.completed = true
      this.updateChallenge(challenge)
      this.checkBingos()
    },
    isPending (challenge) {
      if (challenge.completed === 'pending') {
        return true
      }
      else {
        return false
      }
    },
    isCompleted (challenge) {
      if (challenge.completed === 'completed') {
        return true
      }
      else {
        return false
      }
    },
    updateChallenge (challenge) {
      api.updateChallenge(challenge).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    updateCard () {
      api.updateCard(this.card).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    checkBingos () {
      // loop through the items and check the statuses
      let first = this.challenges[0].id
      // lets get everything that is completed
      let completed = []
      this.challenges.map(function (value, key) {
        if (value.completed === true) {
          completed.push(value.id)
        }
      })

      let ids = []

      // console.log(completed)

      let rowStarts = [first, first + 5, first + 10, first + 15, first + 20]
      let rowOne = [first, first + 1, first + 2, first + 3, first + 4]

      let winners = []
      rowStarts.map(function (value, key) {
        // console.log(value)
        winners.push([value, value + 1, value + 2, value + 3, value + 4])
      })

      rowOne.map(function (value, key) {
        winners.push([value, value + 5, value + 10, value + 15, value + 20])
      })

      winners.push([first, first + 6, first + 12, first + 18, first + 24])
      let cap = first + 4
      winners.push([cap, cap + 4, cap + 8, cap + 12, cap + 16])

      let possibleWinners = winners.length

      // Compare winners array to selected array for matches
      for (var i = 0; i < possibleWinners; i++) {
        let cellExists = 0

        for (var j = 0; j < 5; j++) {
          if ($.inArray(winners[i][j], completed) > -1) {
            cellExists++
          }
        }

            // If all 5 winner cells exist in selected array alert success message
        if (cellExists === 5) {
          if (this.bingos.length === 0) {
            ids.push(i)
            this.bingos.push(winners[i])
            this.newData = true
            alert('winner')
          }
          else {
            if (bingo.arraySearch(this.bingos, winners[i]) === true) {
              // alert('New Winner!')
              // this.bingos.push(winners[i])
              ids.push(i)
              console.log('Duplicate!')
              this.newData = false
            }
            else {
              // console.log('duplicate')
              alert('New Winner')
              this.bingos.push(winners[i])
              this.newData = true
              ids.push(i)
            }
          }
        }
      }
      // console.log(ids)
      if (ids.length > 0 && this.newData === true) {
        let json = JSON.stringify(ids)
        this.card.bingosjson = json
        this.updateCard()
      }
      // console.log(winners[ids[0]])

      // check for straight column bingo
    }
  },
  computed: {
    chunkedItems () {
      return _.chunk(this.challenges, 5)
    }

  },
  mounted () {
    this.getCardData()
  }
}
</script>

<style>
</style>

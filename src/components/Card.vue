<template>
  <div>
  <div class="card" style="width: 900px;">
    <div class="title">
      {{card.game.name}}
      <button class="primary" @click="goToLobby()">Return to Lobby</button>
      
      {{pictureStuff}}
      
    </div>
  </div>
    <div class="row" style="width: 900px;">
      <div class="width-1of5">B</div>
      <div class="width-1of5">I</div>
      <div class="width-1of5">N</div>
      <div class="width-1of5">G</div>
      <div class="width-1of5">O</div>
    </div>
    <div class="row" v-for="items in chunkedItems" style="width: 900px;">
      <div v-for="item in items" :key="item.id" class="width-1of5 cardBox" @click="openDetailsModal(item)" v-bind:class="[{submitted: isPending(item)},{confirmed: item.completed}]">
      {{item.id}}
      {{item.info.title}}
      <div v-if="item.image"><img :src="'http://104.236.125.53/app/' + item.image" style="position: relative; width: 100%; height: 100%; z-index: -1;"/> </div>
      <div v-else><button @click="takePic(item)" class="primary circular lifter"><i>camera_alt</i></button></div>
      </div>
      
    </div>
    <q-modal ref="detailsModal">
      <div class="card-title">
        <div class="title">{{activeChallenge.info.title}}</div>
        <div class="card-content">
          {{activeChallenge.info.description}}
          <img :src="actveChallenge.image" v-if="activeChallenge.image !== ''" style="width: 150px; height: auto;" /> 
          <button class="primary" @click="$refs.detailsModal.close()"><i>close</i></button>
          <button class="primary circular" @click="takePic(activeChallenge)"><i>camera_alt</i></button>
          <button class="primary circular" @click="getPicFromLibrary(activeChallenge)"><i>photo</i></button>
        </div>
      </div>
    </q-modal>
  </div>
</template>
<style>
  .cardBox {
    border: 1px dashed #ddd;
    box-shadow: 0 0 0 3px #fff, 0 0 0 5px #ddd, 0 0 0 10px #fff, 0 0 2px 10px #eee;
    padding: 5px;
    margin: 5px;
    height: 150px;
    background-color: white;
    overflow: hidden;
  }

  .submitted {
    border-color: blue;
  }

  .confirmed {
    border-color: green;
    background: none !important;

  }

  .lifter { 
    z-index: 999;
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
import Vue from 'vue'
import { LocalStorage, Platform } from 'quasar'
import bingo from '../classes/Bingo.js'
export default {
  props: ['cardId', 'gameId'],
  data () {
    return {
      card: {
        game: {
          name: ''
        }
      },
      challenges: [],
      bingos: [],
      bingoList: [],
      pictureStuff: {},
      newData: false,
      activeChallenge: {
        info: {},
        title: '',
        description: '',
        image: ''
      }
    }
  },
  methods: {
    getCardData () {
      api.getCardData(this.cardId).then(response => {
        console.log('Card from the api')
        console.log(response.bingosjson)
        this.card = response
        this.challenges = response.challenges
        this.bingoList = JSON.parse(response.bingosjson)
        console.log(this.bingoList)
        // this.checkBingos()
      }).catch(error => {
        console.log(error)
      })
    },
    goToLobby () {
      this.$router.push('/lobby/' + this.card.game_id)
    },
    takePic (challenge) {
      let self = this
      // we should only set the status after the photo has been submitted
      // challenge.completed = true
      console.log('Here is the item object')
      if (Platform.is.desktop) {
        // let's just spoof the image for now
        challenge.completed = true
        let data = 'http://test.com'
        console.log(challenge)
        self.updateChallenge(challenge, data).then(response => {
          console.log(response)
          Vue.set(self.challenges, challenge.keyId, response)
          this.checkBingos()
        })
      }
      else {
      // we should detect what kind of device is here and adjust the quality up for crappier cameras
        navigator.camera.getPicture(pictureSuccess, pictureError, { quality: 25, destinationType: navigator.camera.DestinationType.DATA_URL })
      }
      function pictureSuccess (data) {
        // alert(data)
        self.pictureStuff = data
        // update challenge should update the local object as well
        challenge.completed = true
        self.updateChallenge(challenge, data).then(response => {
          if (response !== 'error') {
            // challenge.completed = true
            Vue.set(self.challenges, challenge.keyId, response)
            this.checkBingos()
          }
        })
        self.picture = JSON.stringify(data)
        // var ft = new FileTransfer()
        // add the photo to the server
        // console.log(data)
      }
      function pictureError (data) {
        console.log(data)
      }
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
    getPicFromLibrary (challenge) {
      challenge.completed = true
      console.log('open photo library')
    },
    openDetailsModal (challenge) {
      // open the modal
      this.activeChallenge = challenge
      let store = { name: challenge.info.title, description: challenge.info.description, id: challenge.id }
      LocalStorage.set('last', store)
      this.$refs.detailsModal.open()
      // displaying the description and allowing photo to be taken or imported from the camera library
    },
    updateChallenge (challenge, photo) {
      return new Promise((resolve, reject) => {
        api.updateChallenge(challenge, photo).then(response => {
          console.log(response)
          // challenge = response.challenge
          // console.log('using vue set')
          resolve(response.challenge)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    updateCard () {
      return new Promise((resolve, reject) => {
        api.updateCard(this.card).then(response => {
          console.log(response)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    checkBingos () {
      // loop through the items and check the statuses
      let first = this.challenges[0].id
      var self = this
      // lets get everything that is completed
      let completed = []
      this.challenges.map(function (value, key) {
        console.log(value.id + ' = ' + value.completed)
        if (value.completed === true || value.completed === '1' || value.completed === 'true') {
          completed.push(value.id)
        }
      })

      let ids = []

      console.log(completed)

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

      console.log('Here is the bingo list')

      console.log(this.bingoList)

      console.log('Here are the ptoential winners')

      console.log(winners)

      // set existing bingos here
      this.bingoList.map(function (value, key) {
        console.log('setting bingos')
        console.log(value)
        self.bingos.push(winners[value])
        // delete winners[value]
      })
      console.log('Bingos Set')
      console.log(this.bingos)

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
            // this.bingoList.push(i)
            this.bingos.push(winners[i])
            this.newData = true
            alert('winner')
            break
          }
          else {
            if (bingo.arraySearch(this.bingos, winners[i]) === true) {
              // alert('New Winner!')
              // this.bingos.push(winners[i])
              // ids.push(i)
              // this.bingoList.push(i)
              console.log('Duplicate!')
              this.newData = false
              continue
            }
            else if ($.inArray(self.bingoList, i) === -1) {
              // console.log('duplicate')
              alert('New Winner')
              this.bingos.push(winners[i])
              this.newData = true
              // this.bingoList.push(i)
              ids.push(i)
              break
            }
            else {
              console.log('uhhh')
            }
          }
        }
      }
      // console.log(ids)
      if (ids.length > 0 && this.newData === true) {
        console.log('Im setting the json now')
        this.bingoList.push(ids[0])
        console.log(ids)
        let json = JSON.stringify(this.bingoList)
        this.card.bingosjson = json
        this.updateCard()
      }
      // console.log(winners[ids[0]])

      // check for straight column bingo
    }
  },
  computed: {
    chunkedItems () {
      this.challenges.forEach(function (element, index, array) {
        element.keyId = index
      })
      // console.log(this.challenges)
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

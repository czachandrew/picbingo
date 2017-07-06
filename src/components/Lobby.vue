<template>
<div>
<div v-if="game.status == 'new'">
<div class="card">
<div class="card-content">
  Add Players: <q-autocomplete v-model="terms" @search="search" @selected="addPlayer"></q-autocomplete>
</div>
   
</div>
 
  <div class="card">
    <div class="card-title">
      {{game.name}}            {{players.length}} of {{game.max_players}} Players
    </div>
    <div class="list bordered inner-delimiter highlight">
    <div class="item" v-for="(player, index) in players">
        <div class="item-content">
          <div class="item-label">
            <i>face</i> {{player.name}} <button class="item-content" @click="dropPlayer(player.id, index)"><i>close</i></button>
          </div>
        </div>
    </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
    Length of the game: &nbsp; &nbsp;
    <q-select type="list" v-model="length" :options="selectOptions"></q-select>
      <button class="primary" @click="startGame()">Start Game</button>
    </div>
  </div>
  </div>
  <div v-if="game.status == 'active'">
  <h2>{{game.name}}</h2>
    <button class="primary raised">My Card</button>
    <button class="primary raised">Votes</button>
    <button class="primary raised">Approvals</button>
    <h3>Recently Viewed Challenges</h3>
      <ul>
      <li>Challenge 1</li>
      <li>Challenge 2</li>
      </ul>
        This is an active game access your cards, votes, or approvals
  </div>
  </div>
</template>

<script>
import api from '../classes/Api.js'
export default {
  props: ['gameId'],
  data () {
    return {
      game: {},
      players: [],
      terms: '',
      length: '',
      selectOptions: [
        { label: '24 Hours', value: 1 },
        { label: '48 Hours', value: 2 },
        { label: '72 Hours', value: 3 }
      ]
    }
  },
  methods: {
    invite () {
      // here is where we invite a player
      // accept a param that indicates internal or external invite
      // external will send either an email or text message for now just email
      // intenal will push a notification to the user
    },
    search (terms, done) {
      api.playerLookup(terms).then(response => {
        console.log(response)
        done(response)
      }).catch(error => {
        console.log('There was some problem searching users')
        console.log(error)
      })
    },
    startGame () {
      // this begins a game that has a pending status
      // check and make sure that a game length is selected
      if (!this.length) {
        alert('You must select a game length')
        return
      }

      api.startGame(this.gameId, this.length).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      // update the game status to active
    },
    goToCard () {
      // when a game has already begun this takes you to your card
    },
    goToVotes () {
      // starts your voting requirements for this game only
    },
    approvals () {
      // launches your approval requirements for this game only
    },
    getGameData () {
      api.getGameData(this.gameId).then(response => {
        console.log(response)
        this.game = response.game
        this.players = response.game.users
      }).catch(error => {
        console.log('There was some kind of error')
        console.log(error)
      })
    },
    dropPlayer (id, index) {
      if (id === Number(this.game.user_id)) {
        alert('You cannot remove the creator from the game')
        return
      }
      api.removeUserFromGame(this.gameId, id).then(response => {
        console.log('User has been removed')
        this.players.splice(index, 1)
      })
    },
    addPlayer (select) {
      console.log(select)
      if (this.game.max_players === this.players.length) {
        alert('You have the maximum number of players')
        return
      }
      api.addUserToGame(this.gameId, select.value).then(response => {
        console.log(response)
        if (response !== 'user already added') {
          this.players.push(response)
        }
        else {
          alert('That user has already been added to the game')
        }
        this.terms = ''
      }).catch(error => {
        console.log(error)
      })
    }

  },
  mounted () {
    console.log(this.gameId)
    this.getGameData()
  }
}
</script>

<style>
</style>

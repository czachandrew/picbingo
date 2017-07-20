<template>
<div>
<div v-if="game.status == 'new'">
<div class="card">
<div class="card-content">
  Add Players: <q-autocomplete v-model="terms" @search="search" @selected="addPlayer"></q-autocomplete>
  <button class="primary" @click="openInviteModal()">Invite Someone</button>
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
          <div v-if="player.name">
            <i>face</i> {{player.name}} <button class="item-content" @click="dropPlayer(player.id, index)"><i>close</i></button>
            </div>
          <div v-else>
          <i>face</i> Waiting to accept invite {{player.email}} <button class="item-content" @click="dropPlayer(player.id, index)"><i>close</i></button>
          </div>
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
    <button class="primary raised" @click="openCard(myCard.id)">My Card</button>
    <button class="primary raised">Votes</button>
    <button class="primary raised">Approvals</button>
    <h3>Recently Viewed Challenges</h3>
      <ul>
      <li>Challenge 1</li>
      <li>Challenge 2</li>
      </ul>
        This is an active game access your cards, votes, or approvals
        
  </div>
  <invite-list :gameId="gameId"></invite-list>
  <q-modal ref="inviteModal">
  <div class="card-title">
    <div class="title">Invite a Player</div>
    <div class="card-content">
    <p>Enter an email address to invite a player. The game will not begin until the creator (you) starts it</p>
    <label>What's this persons name?</label>
    <input type="text" v-model="inviteName" />
    <label>What's their email?</label>
    <input type="text" v-model="inviteEmail" /> 
    <button class="primary" @click="invite()"> Send Invite </button>
    <button class="danger" @click="$refs.inviteModal.close()">X</button>
      
    </div>
  </div>
  </q-modal>
  </div>
</template>

<script>
import api from '../classes/Api.js'
import InviteList from './InviteList.vue'
export default {
  props: ['gameId'],
  data () {
    return {
      game: {
        status: 'new'
      },
      players: [],
      invites: [],
      myCard: {},
      terms: '',
      length: '',
      inviteName: '',
      inviteEmail: '',
      selectOptions: [
        { label: '24 Hours', value: 1 },
        { label: '48 Hours', value: 2 },
        { label: '72 Hours', value: 3 }
      ]
    }
  },
  components: {
    InviteList
  },
  methods: {
    openInviteModal () {
      this.$refs.inviteModal.open()
    },
    invite () {
      if (this.inviteName === '' || this.inviteEmail === '') {
        alert('You need to fill out a name and email to send an invite')
        return
      }
      api.sendInvite(this.gameId, this.inviteName, this.inviteEmail).then(response => {
        console.log(response)
        this.$refs.inviteModal.close()
      })
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
      if (this.players.length === 1) {
        alert('You must have more than 1 player')
        return
      }

      api.startGame(this.gameId, this.length).then(response => {
        console.log(response)
        this.game.status = 'active'
        this.game = response.game
        this.myCard = response.card
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
        this.game.status = response.game.status
        this.players = response.game.users
        this.myCard = response.card[0]
      }).catch(error => {
        console.log('There was some kind of error')
        console.log(error)
      })
    },
    openCard (id) {
      console.log(id)
      this.$router.push({path: '/lobby/' + this.game.id + '/' + this.myCard.id})
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

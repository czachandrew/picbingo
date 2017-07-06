<template>
  <div>
  <div class="row justify-center medium-gutter" style="margin-top: 15px;">
    <div class="1-of-3">
      <button class="primary raised">Verify Photos
      <span class="floating label circular bg-dark text-white">22</span>
      </button>
    </div>
    <div class="1-of-3">
      <button class="red raised">Cast Votes</button>
    </div>
    <div class="1-of-3">
      <button class="yellow raised" @click="newGame()">Create Game</button>
    </div>
  </div>
  <div class="card">
    <div class="card-title">
      Active Games
    </div>
    
    <div class="list bordered inner-delimiter highlight" >
      <div class="item" v-for="game in games">
          <div class="item-content">
            <div class="item-label">
            <router-link :to="'/lobby/' + game.id">
              {{game.name}}
              </router-link>
              <button class="item-value">
              <i>keyboard_arrow_right</i>
            </button>
            </div>
            
          </div>
      </div>
    </div>
    
    
  </div>
    <q-modal ref="basicModal">
    <div class="card-title">
      <div class="title">Create a new game</div>
      <div class="card-content">
      <form>
      <div class="form-group">
        <label>Title</label> <br>
        <input v-model="newGameObj.name" />
      </div>
      <div class="row">
      <div class="column">
        <label># Players</label>
        <q-numeric v-model="newGameObj.maxPlayers" :min="1" :max="50"></q-numeric>
        </div>
        <div class="column">
        <label>Type</label>
        <q-select type="list" v-model="newGameObj.type" :options="typeOptions"></q-select>
        </div>
      </div>
      <div class="row">
      <div class="column" style="width:100%;">
        <label>Challenge Set</label>
        <q-select type="list" v-model="newGameObj.group" :options="groupOptions"></q-select>
      </div>
        
      </div>
        <div class="form-group">
          <button class="red" @click="$refs.basicModal.close()">Cancel</button>
          <button class="primary" @click="createGame()">Create </button>
        </div>
        
    
      
        
        </form>
      </div>
    </div>  
    </q-modal>
  </div>
</template>

<script>
import api from '../classes/Api'
import {LocalStorage} from 'quasar'

export default {
  data () {
    return {
      username: localStorage.getItem('username'),
      cardList: [],
      games: [],
      newGameObj: {
        title: '',
        public: false,
        maxPlayers: 10,
        type: [],
        group: []

      },
      typeOptions: [
        {
          label: 'Invite Only',
          value: 'invite'
        },
        {
          label: 'Public',
          value: 'public'
        }
      ],
      groupOptions: []
    }
  },
  methods: {
    getCards () {
      // get your active cards/games
    },
    getStats () {
      // get the macro stats for things that you are involved in
    },
    getActivity () {
      // get latest activity from your games
    },
    getVotes () {
      // get all the votes that you are required to make
      // you cannot vote for yourself
    },
    updateGameTypes () {
      api.getGameTypes().then(response => {
        console.log(response)
        LocalStorage.set('types', response)
        this.groupOptions = response
        // set the game types to local storage
      }).catch(error => {
        console.log(error)
      })
    },
    createGame () {
      api.createGame(this.newGameObj).then(response => {
        console.log(response)
        this.games.push(response)
        this.$refs.basicModal.close()
      }).catch(error => {
        console.log(error)
      })
    },
    newGame () {
      // title the game
      this.$refs.basicModal.open()
      // mark public or private
      // establish any other details
    },
    getGames () {
      // get all the games for the current user
      api.getGames().then(response => {
        console.log(response)
        this.games = response
      })
    }
  },
  mounted () {
    // set off the initial call to fetch the data
    this.getGames()
    this.updateGameTypes()
  }
}
</script>

<style>
</style>

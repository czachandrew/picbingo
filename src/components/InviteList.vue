<template>
  <div>
      <p class="caption">Pending Invites</p>
      <div class="list">
          <div class="item" v-for="invite in invites" v-if="invite.status === 'pending'">
              <div class="item-content">
                {{invite.user.name}} has not accepted your invitation yet <button v-if="invite.creator_id === userId" class="primary" @click="cancelInvite(invite)"><i class="x"></i>cancel</button>
              </div>
          </div>
      </div>
      <p class="caption">Declined Invites</p>
      <div class="list">
          <div class="item" v-for="invite in invites" v-if="invite.status === 'declined'">
              <div class="item-content">
                  {{invite.user.name}} declined your invite to play {{invite.game.challenge_category_friendly}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import api from '../classes/Api'
export default {
  props: ['gameId'],
  data () {
    return {
      invites: [],
      updateStatus: '',
      userId: ''
    }
  },
  methods: {
    getInvites () {
        // here you go
      let self = this
      api.getGameInvites(this.gameId).then(response => {
        self.invites = response
      }).catch(error => {
        console.log(error)
      })
    },
    acceptInvite (invite) {
        // here you go
        // not quite as cool as the laptop keyboard but the keys are defin
      // let self = this
      api.acceptInvite(invite).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    declineInvite (invite) {
        // crush it
      api.declineInvite(invite).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    cancelInvite (invite) {
        // here you go
      api.cancelInvite(invite).then(response => {
        console.log(response)
        invite.status = 'canceled'
      }).catch(error => {
        console.log(error)
      })
    },
    sendReminder () {
        // push a reminder
    }
  },
  mounted () {
    this.getInvites()
    this.userId = parseInt(localStorage.getItem('userId'))
    console.log('Invite list has been loaded')
    console.log(this.userId)
  }
}
</script>

<style>
</style>

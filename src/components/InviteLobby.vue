<template>
  <div>
      <div class="card">
          <div class="card-content">
              <h3>Your Invites</h3>
              <div v-for="invite in invites" v-if="invite.status === 'pending'">
              {{invite.message}} {{invite.status}} :-) <button class="primary" @click="acceptInvite(invite)">Accept</button> <button class="red" @click="declineInvite(invite)">Decline</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import api from '../classes/Api'
export default {
  data () {
    return {
      invites: []
    }
  },
  methods: {
    getInvites () {
      // get the data
      var self = this
      api.getInvites().then(response => {
        console.log(response)
        self.invites = response[0]
      }).catch(error => {
        console.log(error)
      })
    },
    acceptInvite (invite) {
      api.acceptInvite(invite).then(response => {
        console.log(response)
        invite.status = 'completed'
      }).catch(error => {
        console.log(error)
      })
    },
    declineInvite (invite) {
      api.declineInvite(invite).then(response => {
        invite.status = 'declined'
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getInvites()
  }
}
</script>

<style>
</style>

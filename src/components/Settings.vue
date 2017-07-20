<template>
  <div>
  	<div class="card">
  		<div class="title">
  			<h2>Settings</h2>
  		</div>
  		<div class="content">
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="user.name" />
            </div>
            <div class="form-group">
                <label for="photo">Profile Pic</label>
                <input :on-change="updatePhoto" />
                <div v-if="!photo">
                    <p>No Profile pic present</p>
                </div>
                <div v-else>
                    <img src="photo.url" />
                </div>
            </div>      
                <label for="notifications">Notification Settings</label>
                <q-select type="checkbox" v-model="notifications" :options="notificationOptions"></q-select>
  			
  		</div>
  	</div>
  </div>
</template>

<script>
import api from '../classes/Api'
export default {
  data () {
    return {
      user: {},
      photo: '',
      notifications: [],
      notificationOptions: [
        {
          label: 'App Notifications',
          value: 'app'
        },
        {
          label: 'Text Notifications',
          value: 'text'
        },
        {
          label: 'Email Notifications',
          value: 'email'
        }
      ],
      accounts: '',
      email: '',
      newPassword: ''
    }
  },
  methods: {
    updateUsername () {

    },
    updatePhoto () {
        // this is where we update
    },
    updateSettings () {
        // get all of the settings except password and update
    },
    updatePassword () {
        // get the new password and update
    },
    getUserData () {
      api.getUserData().then(response => {
        this.user = response.data
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>

<style>
</style>

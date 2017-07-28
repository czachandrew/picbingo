<template>
  <div>
  	<div class="card">
  		<div class="title">
  			<h2>Settings</h2>
  		</div>
  		<div class="content" style="margin-left:15px;">
            <div class="form-group">
                <label for="username">Username</label><br>
                <input v-model="user.name" />
            </div>
            <div class="form-group">
                <label for="photo">Profile Pic</label><br>
                <div v-if="!photo" style="display:block; padding: 15px;">
                    <p style="font-size: 124px; color:grey; display: block;"><i>person_outline</i></p>
                </div>
                <div v-else>
                    <img src="photo.url" />
                </div>
                <button ref="photoUpdateButton" class="primary" style="margin: 15px;">
                Update Pic
                <q-popover ref="popover">
                  <div class="group">
                    <button class="primary clear" @click="getPhotoFromCamera()">
                      <i>photo_camera</i>
                    </button>
                    <button class="secondary clear" @click="getPhotoFromLibrary()">
                    <i>photo_library</i>
                    </button>
                  </div>
                </q-popover>
                </button>
            </div>      
                <label for="notifications">Notification Settings</label> <br>
                <q-select type="checkbox" v-model="notifications" :options="notificationOptions"></q-select>
  			
  		</div>
  	</div>
    <q-modal ref="profileDialogue">

    </q-modal>
  </div>
</template>

<script>
import api from '../classes/Api'
export default {
  data () {
    return {
      user: {
        name: ''
      },
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
    updatePhoto (photo) {
        // this is where we update
      return new Promise((resolve, reject) => {
        api.updateProfilePic(photo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getPhotoFromLibrary () {

    },
    getPhotoFromCamera () {
      let self = this
      navigator.camera.getPicture(pictureSuccess, pictureError, { quality: 25, destinationType: navigator.camera.DestinationType.DATA_URL })
      function pictureSuccess (data) {
        self.updatePhoto(data).then(response => {
          if (response !== 'error') {
            self.photo = response
          }
        })
      }
      function pictureError (data) {
        console.log(data)
      }
    },
    updateSettings () {
        // get all of the settings except password and update
    },
    updatePassword () {
        // get the new password and update
    },
    getUserData () {
      api.getUserData().then(response => {
        this.user = response
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

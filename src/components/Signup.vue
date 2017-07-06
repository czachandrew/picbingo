<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <label>username</label>
      <input type="text" v-model="username" />

      <label>email</label>
      <input type="text" v-model="email" /> 


      <label>password</label>
      <input type="text" v-model="password1" /> 

      <label>password2</label>
      <input type="text" v-model="password2" />

      <button class="primary" @click="create()">Create Account</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      username: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    create () {
      // create a user here
      axios.post('http://104.236.125.53/api/users', { username: this.username, password: this.password1, email: this.email }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
</style>

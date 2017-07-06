<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="form-group">
      <label for="username">Username</label>
        <input v-model="username" type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" />
      </div>
      <div class="form-group">
        <button class="primary" @click="login()">Login</button>
      </div>
      <div class="error" ng-show="hasError">
        <p>{{error}}</p>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
  .error {
    color: red;
  }
</style>

<script>
import auth from '../classes/Auth.js'
// import axios from 'Axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: '',
      hasError: false
    }
  },
  methods: {
    login () {
      let creds = { email: this.username, password: this.password }
      auth.login(this, creds).then(response => {
        this.$router.push('/')
      }).catch(error => {
        // alert(error)
        console.log(error)
        this.hasError = true
        this.error = 'Your email/password combination was incorrect'
      })
    }
  },
  mounted () {
    console.log('Login has been loaded')
  }
}
</script>

<style>
</style>

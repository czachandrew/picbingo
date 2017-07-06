import {router} from '../main.js'
import axios from 'axios'

// define some constants
// forge url : http://104.236.125.53/api

const API_URL = 'http://sfbapi:8888/api'
const LOGIN_URL = API_URL + '/authenticate'
const SIGNUP_URL = API_URL + '/users'
const DATA_URL = API_URL + '/users/1'

export default {

  // User object will allow us to check status
  user: {
    authenticated: false,
    name: '',
    email: ''
  },

  login (context, creds, redirect) {
    return new Promise((resolve, reject) => {
      axios.post(LOGIN_URL, creds).then(response => {
        localStorage.setItem('access_token', response.data.token)
        console.log(response.data)
        this.user.authenticated = true
        this.userdata().then(response => {
          resolve(response)
        })
        // this.user.name = response.data.name
        // resolve(response)
      }).catch(error => {
        context.error = error
        reject(error)
      })
    })
  },

  userdata () {
    return new Promise((resolve, reject) => {
      axios.get(DATA_URL, {headers: this.getAuthHeader()}).then(response => {
        console.log(response)
        this.user.name = response.data.name
        this.user.email = response.data.email
        localStorage.setItem('username', response.data.name)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  signup (context, creds, redirect) {
    axios.post(SIGNUP_URL, creds).then(response => {
      localStorage.setItem('id', response.id)
      localStorage.setItem('access_token', response.data.token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch(error => {
      context.error = error
    })
  },

  logout () {
    localStorage.removeItem('id')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var token = localStorage.getItem('access_token')

    if (token) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }

}

import axios from 'axios'
import auth from './Auth'

// forge url : http://104.236.125.53/api

const API_URL = 'http://sfbapi:8888/api'
const GAMES_URL = API_URL + '/games'
const USERS_URL = API_URL + '/users'
const CARDS_URL = API_URL + '/cards'
const HEADERS = {headers: auth.getAuthHeader()}

export default {
  getGames () {
    return new Promise((resolve, reject) => {
      axios.get(GAMES_URL, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  getGameTypes () {
    return new Promise((resolve, reject) => {
      axios.get(GAMES_URL + '/types', HEADERS).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  createGame (data) {
    return new Promise((resolve, reject) => {
      axios.post(GAMES_URL, data, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  startGame (gameId, length) {
    return new Promise((resolve, reject) => {
      axios.post(GAMES_URL + '/start/' + gameId, {gameLength: length}, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGameData (id) {
    // take the id and get details for the game
    return new Promise((resolve, reject) => {
      axios.get(GAMES_URL + '/' + id, HEADERS).then(response => {
        console.log(response.data)
        resolve(response.data)
      }).catch(error => {
        console.log(error)
      })
    })
  },
  addUserToGame (gameId, userId) {
    return new Promise((resolve, reject) => {
      axios.get(GAMES_URL + '/addUser/' + gameId + '/' + userId, HEADERS).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeUserFromGame (gameId, userId) {
    return new Promise((resolve, reject) => {
      axios.get(GAMES_URL + '/removeUser/' + gameId + '/' + userId, HEADERS).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  playerLookup (search) {
    return new Promise((resolve, reject) => {
      axios.get(USERS_URL + '/lookup/' + search, HEADERS).then(response => {
        resolve(response.data)
      })
    })
  },
  getCardData (id) {
    return new Promise((resolve, reject) => {
      axios.get(CARDS_URL + '/' + id, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  updateCard (card) {
    // create a clean object
    // console.log(card)
    let update = {}
    update.id = card.id
    update.bingosjson = card.bingosjson
    update.status = card.status
    update.active = card.active
    console.log(update)
    return new Promise((resolve, reject) => {
      axios.post(CARDS_URL + '/update', {card: update}, HEADERS).then(response => {
        console.log(response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  updateChallenge (challenge) {
    // accept the challenge and update the photo as well as the status
    return new Promise((resolve, reject) => {
      axios.post(CARDS_URL + '/updateChallenge', {challenge: challenge}, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        console.log(error.data)
        reject(error.data)
      })
    })
  }
}

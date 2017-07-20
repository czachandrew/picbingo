import axios from 'axios'
import auth from './Auth'

// forge url : http://104.236.125.53/api
// local url : http://sfbapi:8888/api'

const API_URL = 'http://104.236.125.53/api'
const GAMES_URL = API_URL + '/games'
const USERS_URL = API_URL + '/users'
const CARDS_URL = API_URL + '/cards'
const INVITES_URL = API_URL + '/invites'
const HEADERS = {headers: auth.getAuthHeader()}
const FILE_HEADERS = {headers: auth.getFormAuthHeader()}

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
  getGameInvites (gameId) {
    return new Promise((resolve, reject) => {
      axios.get(INVITES_URL + '/' + gameId, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  getUserData () {
    return new Promise((resolve, reject) => {
      let userId = localStorage.get('userId')
      axios.get(USERS_URL + '/' + userId, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  getInvites () {
    return new Promise((resolve, reject) => {
      axios.get(INVITES_URL, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  acceptInvite (data) {
    return new Promise((resolve, reject) => {
      axios.post(INVITES_URL + '/accept', data, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  declineInvite (data) {
    return new Promise((resolve, reject) => {
      axios.post(INVITES_URL + '/decline', data, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        console.log(error)
      })
    })
  },
  cancelInvite (data) {
    return new Promise((resolve, reject) => {
      axios.post(INVITES_URL + '/cancel', data, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  getSettings () {
    return new Promise((resolve, reject) => {
      axios.get(USERS_URL, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  resetCard (cardId) {
    return new Promise((resolve, reject) => {
      axios.get(CARDS_URL + '/reset/' + cardId, HEADERS).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  sendInvite (gameId, name, email) {
    return new Promise((resolve, reject) => {
      axios.post(GAMES_URL + '/invite/' + gameId, {name: name, email: email}, HEADERS).then(response => {
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
  updateProfilePic (photo) {
    let formData = new FormData()
    formData.append('file', photo)
    return new Promise((resolve, reject) => {
      axios.post('USERS_URL' + '/addProfilePic', formData, FILE_HEADERS).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.data)
      })
    })
  },
  updateChallenge (challenge, photo) {
    // accept the challenge and update the photo as well as the status
    let formData = new FormData()
    // console.log(photo)
    formData.append('file', photo)
    for (var key in challenge) {
      formData.append(key, challenge[key])
    }
    // manager the photo upload
    // formData.append('challenge', challenge)
    return new Promise((resolve, reject) => {
      axios.post(CARDS_URL + '/updateChallenge', formData, FILE_HEADERS).then(response => {
        // console.log(response)
        resolve(response.data)
      }).catch(error => {
        // console.log(error.data)
        reject(error.data)
      })
    })
  }
}

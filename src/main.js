// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
window._ = require('lodash')
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import auth from './classes/Auth'

Vue.use(Quasar) // Install Quasar Framework

router.beforeEach((to, from, next) => {
  auth.checkAuth()
  if (auth.user.authenticated === false && to.path !== '/login' && to.path !== '/signup') {
    next('/login')
  }
  else {
    next()
  }
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})

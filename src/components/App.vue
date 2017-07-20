<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <!-- opens drawer below -->
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
    
      <q-toolbar-title :padding="1">
        Bingo
      </q-toolbar-title>
      <button class="bordered" @click="logout()"><i>exit_to_app</i></button>
    </div>

    <!-- Navigation Tabs
    <q-tabs slot="navigation">
      <q-tab icon="mail" route="/layout" exact replace>Mails</q-tab>
      <q-tab icon="alarm" route="/layout/alarm" exact replace>Alarms</q-tab>
      <q-tab icon="help" route="/layout/help" exact replace>Help</q-tab>
    </q-tabs>
    -->

    <!-- Drawer -->
    <q-drawer ref="drawer">
      <div class="toolbar">
        <q-toolbar-title>
          Shitty Menu
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
      <q-drawer-link icon="home" :to="{path: '/', exact: true}">Home</q-drawer-link>
      <q-drawer-link icon="person" :to="{path: '/profile', exact: true}">
        Profile
      </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/invites', exact: true}">
          Invites <span v-if="invites.length > 0" class="floating label bg-dark text-white">{{invites.length}}</span>
        </q-drawer-link>
        <q-drawer-link icon="settings" :to="{path:'/settings', exact:true}">
          Settings
        </q-drawer-link>
        <q-drawer-link icon="forward" :to="{path:'/logout', exact:true}">
        Logout
        </q-drawer-link>
      </div>
    </q-drawer>
  

    <router-view class="layout-view"></router-view>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
import auth from '../classes/Auth'
import api from '../classes/Api'

export default {
  data () {
    return {
      invites: []
    }
  },
  methods: {
    getInvites () {
      var self = this
      api.getInvites().then(response => {
        let data = response[0]
        let info = []
        data.forEach(function (value, index, array) {
          if (value.status === 'pending') {
            info.push(value)
          }
        })
        self.invites = info
      }).catch(error => {
        console.log(error)
      })
    },
    logout () {
      console.log('logout has fired')
      auth.logout()
      this.$router.push('/login')
    }
  },
  mounted () {
    this.getInvites()
  }
}
</script>

<style>
</style>

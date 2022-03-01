<template>
  <div>
      <v-app-bar
            class="flatCard"
            app
            flat
            hide-on-scroll
          >
          <!-- <v-img
          class="mx-2 img-thumbnail rounded-lg"
          src="https://i2.wp.com/ourcity.syrgov.net/wp-content/uploads/2018/10/syracuse-logo-gold.gif?fit=1800%2C1800&ssl=1"
          max-height="50"
          max-width="50"
        ></v-img> -->
          <!-- {{sessionUser}} -->
              <v-toolbar-title class="font-weight-bold text-lg"><h3 class="text">CENT</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn  class="text" v-if='isLoggedIn' text href="/">Home</v-btn>
            <v-btn  class="text" v-if='isLoggedIn' text @click="logout"> Logout</v-btn>
            <v-btn v-if='isLoggedIn' class="text" href='/profile' text>
              <v-icon color="">mdi-account-circle</v-icon>
            <span> {{user.Role}}@{{user.name}}</span></v-btn>
            <v-app-bar-nav-icon v-if='isLoggedIn' @click="drawer = true"></v-app-bar-nav-icon>
          </v-app-bar>
          <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
          >
            <v-list
              nav
              dense
            >
              <v-list-item-group
                v-model="group"
                active-class="lime lighten-3"
              >
              <br>
                <v-list-item href="/">
                  <v-list-item-icon>
                    <v-icon>mdi-home-outline</v-icon>
                  </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item href='/profile'>
                  <v-list-item-icon>
                    <v-icon>mdi-account-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title >Account</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.Role == 'admin'" href='/addSiteBuilding'>
                  <v-list-item-icon>
                    <v-icon>mdi-home-city-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Add  Site Building</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.Role == 'admin'" href='/addSensor'>
                  <v-list-item-icon>
                    <v-icon>mdi-alarm-light-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Add/Edit Sensors</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.Role == 'admin'" href='/signin'>
                  <v-list-item-icon>
                    <v-icon>mdi-account-multiple-plus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Manage Users</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Nav',
  computed: {
    ...mapGetters({
      authState: 'authState',
      user: 'user',
      isLoggedIn: 'isLoggedIn'
    })
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  methods: {
    ...mapActions(['logout']),
    LogoutUser () {
      console.log('logoutClicked')
      this.logout()
    }
  }
}
</script>

<style>

</style>

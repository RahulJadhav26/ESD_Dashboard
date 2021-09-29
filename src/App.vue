<template>
  <v-app id="app">
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
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <!-- <v-btn  class="text" text href="/">Home</v-btn> -->
      <!-- <v-btn  class="text" text @click="logout"> Logout</v-btn> -->
     <!-- <v-btn icon>
        <v-icon color="">mdi-account-circle</v-icon>
      </v-btn><span style="font-size:12px;">{{sessionUser}}</span> -->
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
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
          active-class="deep-purple--text text--accent-4"
        >
        <br>
          <v-list-item href="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
           <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
// import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters({
      // loggedIn: 'loggedIn',
      // sessionUser: 'sessionUser'
    })
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  // created () {
  //   this.$store.state.sessionUser = this.$session.get('username')
  //   console.log(this.$store.state.sessionUser)
  // },
  methods: {
    // logout () {
    //   alert('called')
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       alert('Successfully logged out')
    //       this.$store.state.loggedIn = false
    //       this.$store.state.sessionUser = ''
    //       this.$session.clear('username')
    //       console.log(this.$session.get('username'))
    //       console.log(this.$store.state.sessionUser)
    //       this.$router.push('/login')
    //     })
    //     .catch(error => {
    //       alert(error.message)
    //       this.$router.push('/login')
    //     })
    // }
  }
}
</script>
<style>
#app{
  background: rgb(242,242,247) !important;
  /* background: linear-gradient(180deg, rgba(255,255,255) 30%, rgba(247,105,0,0.9) 100%) !important; */
  /* BLUE rgba(0,14,84,0.8) */
  /* ORANGE rgba(247,105,0,0.9) */
}
.text{
  color:rgba(0,14,84) !important;
}
.flatCard{
  background: transparent !important;
}
</style>

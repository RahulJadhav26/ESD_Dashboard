<template>
  <v-app id="app">
    <v-app-bar
      class="flatCard"
      app
      flat
      dark
      hide-on-scroll
    >
        <v-toolbar-title class="font-weight-bold text-lg"><h1 class="text">CENT </h1></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="text" text href="/">Home</v-btn>
      <v-btn v-if="loggedIn" class="text" text href="/">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn'
    })
  },
  data: () => ({
    //
  }),
  methods: {
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out')
          this.$store.state.loggedIn = false
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style>
#app{
  background: rgb(254, 249, 249) !important;
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

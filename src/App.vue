<template>
  <v-app id="app">
      <Nav></Nav>
          <v-main>
      <router-view/>
      </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NavVue from './components/Nav.vue'
export default {
  name: 'App',
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
  },
  components: {
    Nav: NavVue
  }
}
</script>
<style>
#app{
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  /* background: #FFEEEE;  fallback for old browsers */
  background: -webkit-linear-gradient(to left, #DDEFBB, #FFEEEE);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #DDEFBB, #FFEEEE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* background: rgb(242,242,247) !important; */
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

import Vue from 'vue'
import Vuex from 'vuex'
import webhookAPI from './modules/webhookAPI'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    sessionUser: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webhookAPI
  },
  plugins: [createPersistedState()],
  getters: {
    loggedIn: state => {
      return state.loggedIn
    },
    sessionUser: state => {
      return state.sessionUser
    }
  }
})

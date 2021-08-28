import Vue from 'vue'
import Vuex from 'vuex'
import webhookAPI from './modules/webhookAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webhookAPI
  },
  getters: {
    loggedIn: state => {
      return state.loggedIn
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import webhookAPI from './modules/webhookAPI'
// import UsersAPI from './modules/UsersAPI'
import Auth from './modules/Auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webhookAPI,
    // UsersAPI,
    Auth
  },
  plugins: [createPersistedState()],
  getters: {

  }
})

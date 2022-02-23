import routes from '../../services/routes'

const state = {
  loggedin_user: {}
}
const mutations = {
  'LOGIN' (state, user) {
    routes.loginUser(user).then((data) => {
      console.log(data)
      state.loggedin_user = data
    })
  }
}
const actions = {
  loginUser: ({ commit }, user) => {
    commit('LOGIN', user)
  }
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}

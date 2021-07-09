import routes from '../../services/routes'
const state = {
  data: []
}
const mutations = {
  'INIT_DATA' (state) {
    routes.getData().then(data => {
      console.log(data)
      state.data = data.data
    })
  }
}

const actions = {
  getData: ({ commit }) => {
    commit('INIT_DATA')
  }

}
const getters = {
  data: state => {
    return state.data
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

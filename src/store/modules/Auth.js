import axios from 'axios'
import router from '../../router'
import routes from '../../services/routes'

const state = {
  token: localStorage.getItem('token') || '',
  user: { Role: 'NotDefined' },
  status: '',
  errors: null,
  allUsers: []
}

const getters = {
  isLoggedIn: state => {
    if (state.token !== '') {
      return true
    } else {
      return false
    }
  },
  authState: state => state.status,
  user: state => state.user,
  errors: state => state.errors,
  allUsers: state => state.allUsers
}

const actions = {
  // Login Action
  async login ({ commit }, user) {
    commit('auth_request')
    try {
      const res = await routes.loginUser(user)
      console.log(res)
      if (res.data.success) {
        const token = res.data.token
        const user = res.data.user
        // Store the token in the localStorage
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = token
        commit('auth_success', token, user)
      }
      return res
    } catch (err) {
      console.log('Error' + err)
      commit('auth_error', err)
    }
  },
  // Register User
  async register ({ commit }, userData) {
    commit('register_request')
    try {
      const res = await routes.signUp(userData)
      if (res.data.success !== undefined) {
        commit('register_success')
      } else {
        console.log('Error at Actions')
      }
      return res
    } catch (err) {
      commit('register_error', err)
    }
  },
  // Get the user Profile

  async getProfile ({ commit }) {
    commit('profile_request')
    routes.getProfile().then((res) => {
      commit('user_profile', res.data.user)
      return res
    })
  },

  // logout User
  async logout ({ commit }) {
    await localStorage.removeItem('token')
    commit('logout')
    delete axios.defaults.headers.common.Authorization
    router.push('/login')
  },
  Error ({ commit }, error) {
    console.log('eeeeeror')
    commit('Error', error)
  },

  async getAllUsers ({ commit }) {
    const users = await routes.getAllUsers()
    console.log(users)
    commit('get_All_Users', users)
  },
  async deleteUsers ({ commit }, user) {
    console.log('Deleting User')
    const result = await routes.deleteUsers(user)
    return result
  }

}

const mutations = {
  auth_request (state) {
    state.error = null
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.error = null
    state.token = token
    state.user = user
    state.status = 'Successful Login'
  },
  auth_error (state, err) {
    state.errors = err.response.data.msg
  },
  register_request (state) {
    state.error = null
    state.status = 'loading'
  },
  register_success (state) {
    state.error = ''
    state.status = 'success'
  },
  register_error (state, err) {
    state.errors = err.response.data.msg
  },
  profile_request (state) {
    state.error = null
    state.status = 'Requesting'
  },
  user_profile (state, user) {
    state.error = null
    state.user = user
    state.status = 'Welcome ' + user.username
  },
  logout (state) {
    state.token = ''
    state.status = ''
    state.users = {}
    state.errors = ''
  },
  Error (state, error) {
    state.errors = error.msg
  },
  get_All_Users (state, users) {
    console.log(users)
    state.allUsers = users.data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

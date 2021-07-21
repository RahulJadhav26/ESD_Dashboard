import routes from '../../services/routes'
const state = {
  data: [],
  alertData: [],
  payload: [],
  alertPayload: []
}
const mutations = {
  'INIT_DATA' (state) {
    routes.getData().then(data => {
      state.data = []
      state.payload = []
      for (var i in data.data) {
        if (data.data[i].event_type === 'alert') {
          data.data[i].customPayload = data.data[i].event_data
          state.alertData.push(data.data[i])
          console.log(data.data[i].customPayload)
          state.alertPayload.push(data.data[i].customPayload)
        } else {
          var date = new Date(data.data[i].event_data.payload[0].timestamp)
          date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
          ' ' + date.getDate() +
          '/' + (date.getMonth() + 1) +
          '/' + date.getFullYear()
          var obj = {
            battery: data.data[i].event_data.payload[0].value,
            internalTemp: data.data[i].event_data.payload[1].value,
            humidity: data.data[i].event_data.payload[2].value,
            RSSI: data.data[i].event_data.payload[3].value,
            SNR: data.data[i].event_data.payload[4].value,
            timestamp: date
          }
          state.payload.push(obj)
        }
      }
      state.data = data.data
      console.log(state.data)
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
  },
  payload: state => {
    return state.payload
  },
  alertPayload: state => {
    return state.alertPayload
  },
  alertData: state => {
    return state.alertData
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

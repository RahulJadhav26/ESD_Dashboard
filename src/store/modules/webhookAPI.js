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
      state.alertPayload = []
      state.alertData = []
      console.log(data.data.data)
      for (var i in data.data.data) {
        if (data.data.data[i].event_type === 'alert') {
          console.log(data.data.data[i].event_type)
          data.data.data[i].customPayload = data.data.data[i].event_data
          state.alertData.push(data.data.data[i])
          console.log(data.data.data[i].customPayload)
          state.alertPayload.push(data.data.data[i].customPayload)
        } else {
          var date = new Date(data.data.data[i].event_data.payload[0].timestamp)
          date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
          ' ' + (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear()
          var obj = {
            battery: data.data.data[i].event_data.payload[0].value,
            internalTemp: data.data.data[i].event_data.payload[1].value * 9 / 5 + 32,
            humidity: data.data.data[i].event_data.payload[2].value,
            RSSI: data.data.data[i].event_data.payload[3].value,
            SNR: data.data.data[i].event_data.payload[4].value,
            timestamp: date
          }
          state.payload.push(obj)
        }
      }
      state.data = data.data.data
      return state.data
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
  // label: state => {
  //   payload
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}

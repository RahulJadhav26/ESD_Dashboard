import routes from '../../services/routes'
const state = {
  data: [],
  alertData: [],
  payload: [],
  alertPayload: [],
  refresh: false
}
const mutations = {
  'INIT_DATA' (state) {
    routes.getData().then(data => {
      console.log('Refreshed')
      state.refresh = true
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
            battery: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Battery'))[0].value,
            internalTemp: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Internal Temp'))[0].value * 9 / 5 + 32,
            humidity: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Humidity'))[0].value,
            RSSI: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'RSSI'))[0].value,
            SNR: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'SNR'))[0].value,
            timestamp: date
          }
          state.payload.push(obj)
        }
      }
      state.data = data.data.data
      state.refresh = false
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
  },
  refresh: state => {
    return state.refresh
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

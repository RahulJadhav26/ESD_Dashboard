import routes from '../../services/routes'
const state = {
  data: [],
  alertData: [],
  payload: [],
  alertPayload: [],
  refresh: false,
  sensors: [],
  siteBuilding: '',
  databases: []
}
const mutations = {
  'INIT_DATA' (state) {
    state.data = []
    state.payload = []
    state.alertPayload = []
    state.alertData = []
    routes.getData().then(data => {
      console.log('Refreshed')
      state.refresh = true
      state.data = []
      state.payload = []
      state.alertPayload = []
      state.alertData = []
      // console.log(data.data.data)
      for (var i in data.data.data) {
        if (data.data.data[i].event_type === 'alert') {
          // console.log(data.data.data[i].event_type)
          data.data.data[i].customPayload = data.data.data[i].event_data
          state.alertData.push(data.data.data[i])
          // console.log(data.data.data[i].customPayload)
          state.alertPayload.push(data.data.data[i].customPayload)
        } else {
          var date = new Date(data.data.data[i].event_data.payload[0].timestamp)
          date = 'TIME: ' + date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
          ' DATE:' + (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear()
          var obj = {
            battery: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Battery'))[0].value,
            internalTemp: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Internal Temp'))[0].value * 9 / 5 + 32,
            humidity: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Humidity'))[0].value,
            RSSI: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'RSSI'))[0].value,
            // SNR: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'SNR'))[0].value,
            timestamp: date
          }
          state.payload.push(obj)
        }
      }
      state.data = data.data.data
      state.refresh = false
      return state.data
    })
  },
  'GET_SENSOR' (state, obj) {
    // console.log(obj)
    routes.getCollections(obj)
      .then(data => {
        state.refresh = true
        var sensors = []
        for (var element in data.data) {
          sensors.push(data.data[element].name)
        }
        state.sensors = sensors
        state.siteBuilding = obj.database
        console.log(state.sensors)
        state.refresh = false
        return true
      })
  },
  'GET_DATABASES' (state) {
    console.log('database mutation')
    routes.getDatabases().then(data => {
      state.refresh = true
      // var databases = []
      for (var element in data.data.data) {
        // console.log(data.data.data[element].name)
        if (String(data.data.data[element].name) !== 'local' && String(data.data.data[element].name) !== 'admin') {
          state.databases.push(data.data.data[element])
        }
      }
    })
  },
  'GET_ALL_DATA' (state, database) {
    routes.getAllData(database).then(data => {
      state.refresh = true
      state.data = []
      state.payload = []
      state.alertPayload = []
      state.alertData = []

      state.data = data.data.data
      state.alertData = data.data.alerts
    })
  },
  'GET_SENSOR_DATA' (state, collection) {
    var obj = {
      collection: collection
    }
    routes.getCollectionData(obj).then(data => {
      console.log('Refreshed')
      state.refresh = true
      state.data = []
      state.payload = []
      state.alertPayload = []
      state.alertData = []
      // console.log(data.data.data)
      for (var i in data.data.data) {
        if (data.data.data[i].event_type === 'alert') {
          // console.log(data.data.data[i].event_type)
          data.data.data[i].customPayload = data.data.data[i].event_data
          state.alertData.push(data.data.data[i])
          var date1 = new Date(Number(data.data.data[i].event_data.timestamp))
          console.log(date1)
          date1 = 'TIME: ' + date1.getHours() +
          ':' + date1.getMinutes() +
          ':' + date1.getSeconds() +
          ' DATE: ' + (date1.getMonth() + 1) +
          '/' + date1.getDate() +
          '/' + date1.getFullYear()
          console.log(date1)
          data.data.data[i].customPayload.date = date1
          state.alertPayload.push(data.data.data[i].customPayload)
          console.log(state.alertPayload)
        } else {
          var date = new Date(data.data.data[i].event_data.payload[0].timestamp)
          date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
          ' DATE: ' + (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear()
          // var obj = {
          //   battery: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Battery'))[0].value,
          //   internalTemp: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Internal Temp'))[0].value * 9 / 5 + 32,
          //   humidity: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'Humidity'))[0].value,
          //   RSSI: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'RSSI'))[0].value,
          //   SNR: data.data.data[i].event_data.payload.filter(attr => (attr.name === 'SNR'))[0].value,
          //   timestamp: date
          // }
          var obj = {

          }
          data.data.data[i].event_data.payload.forEach(element => {
            obj[element.name] = element.value
            obj.timestamp = date
          })
          // console.log(obj)
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
  },
  getAllData: ({ commit }, database) => {
    commit('GET_ALL_DATA', database)
  },
  getSensors: ({ commit }, obj) => {
    commit('GET_SENSOR', obj)
  },
  getCollectionData: ({ commit }, collection) => {
    console.log('Action getCollectionData')
    console.log(collection)
    commit('GET_SENSOR_DATA', collection)
  },
  getDatabases: ({ commit }) => {
    console.log('Action getDatabases')
    commit('GET_DATABASES')
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
  },
  sensors: state => {
    return state.sensors
  },
  siteBuilding: state => {
    return state.siteBuilding
  },
  databases: state => {
    return state.databases
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

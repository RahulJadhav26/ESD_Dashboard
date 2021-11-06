import routes from '../../services/routes'
const state = {
  data: [],
  alertData: [],
  payload: [],
  alertPayload: [],
  refresh: false,
  sensors: [],
  siteBuilding: '',
  databases: [],
  buildings: [],
  allBuildings: [],
  payloadHeaders: [],
  alertHeaders: [],
  allSensors: [],
  allSensorCollection: [],
  sensorBuilding: [],
  feedbackMessage: {}
}
const mutations = {
  'GET_SENSOR' (state, obj) {
    routes.getCollections(obj)
      .then(data => {
        console.log(data.data.data)
        var sensors = []
        for (var element in data.data.data) {
          sensors.push(data.data.data[element])
        }
        state.sensors = sensors
        state.siteBuilding = obj.database
        return true
      })
  },
  'GET_BUILDINGS' (state) {
    routes.getBuildings().then(data => {
      state.buildings = data.data.data
    })
  },
  'GET_DATABASES' (state) {
    console.log('database mutation')
    routes.getDatabases().then(data => {
      state.refresh = true
      state.databases = []
      for (var element in data.data.data) {
        if (String(data.data.data[element].name) !== 'local' && String(data.data.data[element].name) !== 'admin') {
          state.databases.push(data.data.data[element])
        }
      }
    })
  },
  'GET_ALL_DATA' (state, database) {
    state.refresh = true
    console.log(database)
    state.data = []
    state.payload = []
    state.alertPayload = []
    state.alertData = []
    routes.getAllData(database).then(data => {
      state.data = data.data.data
      state.alertData = data.data.alerts
      console.log(state.data)
      console.log(state.alertData)
    }).then(() => {
      console.log(state.data.length)
      if (state.data.length !== 0) {
        state.refresh = false
      }
    })
  },
  'GET_ALL_SENSORS' (state) {
    routes.getAllSensors().then(data => {
      state.allSensors = data.data.data
    })
  },
  'ADD_BUILDING' (state, building) {
    state.feedbackMessage = ''
    routes.addBuilding(building).then(data => {
      state.feedbackMessage = { msg: data.data.msg, status: data.data.status }
    })
  },
  'GET_ALL_SENSOR_COLLECTION' (state) {
    state.sensorBuilding = []
    state.feedbackMessage = ''
    routes.getAllSensorCollection().then(data => {
      state.allSensorCollection = data.data.data
    })
  },
  'GET_ALL_BUILDING' (state) {
    state.sensorBuilding = []
    state.feedbackMessage = ''
    routes.getAllBuilding().then(data => {
      state.allBuildings = data.data.data
    })
  },
  'FIND_BUILDING' (state, sensor) {
    console.log('findBuilding Mutation')
    state.sensorBuilding = []
    routes.findBuilding(sensor).then(data => {
      state.sensorBuilding = data.data.data
    })
  },
  'EDIT_SENSOR' (state, payload) {
    state.feedbackMessage = ''
    routes.editSensor(payload).then(data => {
      state.feedbackMessage = data.data
    })
  },
  'GET_SENSOR_DATA' (state, obj) {
    routes.getCollectionData(obj).then(data => {
      console.log('Refreshed')
      state.refresh = true
      state.data = []
      state.payload = []
      state.alertPayload = []
      state.alertData = []
      state.payloadHeaders = []
      state.sensorBuilding = []
      var headers = {}
      console.log(data.data.data)
      data.data.data[0].event_data.payload.forEach(element => {
        headers = {
          text: element.name,
          value: element.name
        }
        state.payloadHeaders.push(headers)
      })
      state.payloadHeaders.push({ text: 'Timestamp', value: 'timestamp' })
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
          var obj = {}
          data.data.data[i].event_data.payload.forEach(element => {
            obj[element.name] = element.value
            obj.timestamp = date
          })
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
  getBuildings: ({ commit }) => {
    commit('GET_BUILDINGS')
  },
  getAllData: ({ commit }, database) => {
    commit('GET_ALL_DATA', database)
  },
  getSensors: ({ commit }, obj) => {
    commit('GET_SENSOR', obj)
  },
  getCollectionData: ({ commit }, obj) => {
    console.log('Action getCollectionData')
    console.log(obj)
    commit('GET_SENSOR_DATA', obj)
  },
  getDatabases: ({ commit }) => {
    console.log('Action getDatabases')
    commit('GET_DATABASES')
  },
  getAllSensors: ({ commit }) => {
    console.log('Action getAllSensors')
    commit('GET_ALL_SENSORS')
  },
  addBuilding: ({ commit }, building) => {
    console.log('Action addBuilding')
    commit('ADD_BUILDING', building)
  },
  getAllSensorCollection: ({ commit }) => {
    console.log('Action getAllSensorCollection')
    commit('GET_ALL_SENSOR_COLLECTION')
  },
  getAllBuilding: ({ commit }) => {
    console.log('Action getAllBuilding')
    commit('GET_ALL_BUILDING')
  },
  findBuilding: ({ commit }, sensor) => {
    console.log('Action findBuilding')
    commit('FIND_BUILDING', sensor)
  },
  editSensor: ({ commit }, payload) => {
    console.log('Action editSensor')
    commit('EDIT_SENSOR', payload)
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
  },
  payloadHeaders: state => {
    return state.payloadHeaders
  },
  allSensors: state => {
    return state.allSensors
  },
  buildings: state => {
    return state.buildings
  },
  feedbackMessage: state => {
    return state.feedbackMessage
  },
  allSensorCollection: state => {
    return state.allSensorCollection
  },
  allBuildings: state => {
    return state.allBuildings
  },
  sensorBuilding: state => {
    return state.sensorBuilding
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

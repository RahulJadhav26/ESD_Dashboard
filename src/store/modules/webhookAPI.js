import routes from '../../services/routes'
const state = {
  data: [], // Stores the complete raw uplink data
  alertData: [], // Stores the complete raw alert data
  payload: [], // Stores the payload containing only sensor parameter
  alertPayload: [], // Stores the alert payload containing only sensor parameter
  refresh: false,
  sensors: [], // Stores all the sensors
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
    state.data = []
    state.payload = []
    state.alertPayload = []
    state.alertData = []
    routes.getAllData(database).then(data => {
      state.data = data.data.data
      state.alertData = data.data.alerts
    }).then(() => {
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
      // Initializing all the variables to null

      state.refresh = false
      state.data = []
      state.alertData = []
      state.payload = []
      state.alertPayload = []
      state.payloadHeaders = []
      state.sensorBuilding = []
      var headers = {}
      console.log(data.data.data.length)
      console.log('Inside Mutation')
      console.log(state.refresh)

      // Checks if sensor has any recorded values or not ?

      if (data.data.data.length === 0 && data.data.alerts.length === 0) {
        state.data = data.data.data
        state.alertData = data.data.alerts
        console.log('No data')
        console.log(state.refresh)
        state.refresh = true
      } else {
        state.refresh = false
        console.log('Getting Data')
        console.log(state.refresh)
        // If the sensor has some recorded data then fetch the payload
        // "keys"(Sensor parameters) inside the raw data and store it in payloadHeaders variable

        data.data.data[0].event_data.payload.forEach(element => {
          headers = {
            text: element.name,
            value: element.name
          }
          state.payloadHeaders.push(headers)
        })
        state.payloadHeaders.push({ text: 'Timestamp', value: 'timestamp' })

        //  For every recorded alert it creates a customPayload and stores the required parameter

        for (var i in data.data.alerts) {
          data.data.alerts[i].customPayload = data.data.alerts[i].event_data
          data.data.alerts[i].customPayload.id = data.data.alerts[i]._id
          data.data.alerts[i].customPayload.device = data.data.alerts[i].device.thing_name

          // If alert.event_data has timestamp it converts that timestamp to Date and Time and pushes inside
          // the customPayload

          if (Object.prototype.hasOwnProperty.call(data.data.alerts[i].event_data, 'timestamp')) {
            var date1 = new Date(Number(data.data.alerts[i].event_data.timestamp))
            date1 = 'TIME: ' + date1.getHours() +
            ':' + date1.getMinutes() +
            ':' + date1.getSeconds() +
            ' DATE: ' + (date1.getMonth() + 1) +
            '/' + date1.getDate() +
            '/' + date1.getFullYear()
            data.data.alerts[i].customPayload.date = date1

            // It pushes the newly created customPayload with desired parameters into alertPayload

            state.alertPayload.push(data.data.alerts[i].customPayload)
          }
        }

        // If alert.event_data has timestamp it converts that timestamp to Date and Time and pushes inside
        // the customPayload

        for (var j in data.data.data) {
          if (Object.prototype.hasOwnProperty.call(data.data.data[j].event_data, 'timestamp')) {
            var date = new Date(data.data.data[j].event_data.payload[0].timestamp)
            date = date.getHours() +
            ':' + date.getMinutes() +
            ':' + date.getSeconds() +
            ' DATE: ' + (date.getMonth() + 1) +
            '/' + date.getDate() +
            '/' + date.getFullYear()
          }

          // Creates a temporary obj variable object to store the desired timestamp
          // and all the event_data payload parameters into the obj

          var obj = {}
          obj.timestamp = date
          data.data.data[j].event_data.payload.forEach(element => {
            obj[element.name] = element.value
          })

          // pushes the temporary obj to payload

          state.payload.push(obj)
        }

        // Declares the final values to the state parameters

        state.data = data.data.data
        state.alertData = data.data.alerts
        state.refresh = true
        console.log('Got Data')
        console.log(state.refresh)
      }
      return state.data
    })
  },
  'ACK_SENSOR' (state, alert) {
    routes.acknowledgeAlert(alert).then(result => {
    })
  }
}

const actions = {
  getBuildings: ({ commit }) => {
    commit('GET_BUILDINGS')
  },
  getAllData: ({ commit }, database) => {
    console.log(database)
    commit('GET_ALL_DATA', database)
  },
  getSensors: ({ commit }, obj) => {
    commit('GET_SENSOR', obj)
  },
  getCollectionData: ({ commit }, obj) => {
    commit('GET_SENSOR_DATA', obj)
  },
  getDatabases: ({ commit }) => {
    commit('GET_DATABASES')
  },
  getAllSensors: ({ commit }) => {
    commit('GET_ALL_SENSORS')
  },
  addBuilding: ({ commit }, building) => {
    commit('ADD_BUILDING', building)
  },
  getAllSensorCollection: ({ commit }) => {
    commit('GET_ALL_SENSOR_COLLECTION')
  },
  getAllBuilding: ({ commit }) => {
    commit('GET_ALL_BUILDING')
  },
  findBuilding: ({ commit }, sensor) => {
    commit('FIND_BUILDING', sensor)
  },
  editSensor: ({ commit }, payload) => {
    commit('EDIT_SENSOR', payload)
  },
  acknowledgeAlert: ({ commit }, alert) => {
    commit('ACK_SENSOR', alert)
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

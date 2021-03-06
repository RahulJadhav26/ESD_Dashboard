import Api from './Api'

export default {
  getData () {
    // console.log('Api Hit')
    return Api().get('/data')
  },
  getCollectionData (collection) {
    // console.log(collection)
    // console.log('Api collection Data hit')
    return Api().post('/esd/collection_data', collection)
  },
  download (dates) {
    // console.log('Api download Data hit')
    return Api().post('/download', dates)
  },
  getCollections (db) {
    // console.log('Api getCollection Data hit')
    return Api().post('/esd/collection', db)
  },
  getDatabases () {
    // console.log('Api getDatabases Data hit')
    return Api().get('/getDatabases')
  },
  getBuildings () {
    // console.log('API of getBuilding Hit')
    return Api().get('/esd/getBuildings')
  },
  getAllData (db) {
    // console.log('Api getAllData Data hit')
    return Api().post('/esd/getAllData', db)
  },
  getAllSensors () {
    // console.log('Api getAllSensor Data hit')
    return Api().get('/esd/getAllSensors')
  },
  addBuilding (building) {
    // console.log('Api Add Building Hit')
    return Api().post('/esd/addBuilding', building)
  },
  findBuilding (sensor) {
    // console.log('Api findBuilding')
    return Api().post('/esd/findBuilding', sensor)
  },
  editSensor (payload) {
    // console.log('Api editsensor HIT')
    return Api().post('/esd/editSensor', payload)
  },
  getAllSensorCollection () {
    // console.log('Api getAllSensorCollection hit')
    return Api().get('/esd/getAllSensorCollection')
  },
  getAllBuilding () {
    // console.log('Api getAllBuilding Hit')
    return Api().get('/esd/getAllBuildings')
  },
  acknowledgeAlert (alert) {
    // console.log('Api acknowlegdeAlert Hit')
    return Api().post('/esd/acknowledgeAlert', alert)
  },
  loginUser (user) {
    return Api().post('/api/users/login', user)
  },
  getProfile () {
    console.log('called Profile')
    return Api().get('/api/users/profile')
  },
  signUp (userData) {
    return Api().post('/api/users/register', userData)
  },
  getAllUsers () {
    return Api().get('/api/users/getAllUsers')
  },
  deleteUsers (user) {
    console.log('Api called')
    console.log(user)
    return Api().post('api/users/deleteUsers', user)
  }
}

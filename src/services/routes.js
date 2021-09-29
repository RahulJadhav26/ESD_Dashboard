import Api from './Api'

export default {
  getData () {
    console.log('Api Hit')
    return Api().get('/data')
  },
  getCollectionData (collection) {
    console.log(collection)
    console.log('Api collection Data hit')
    return Api().post('/collection_data', collection)
  },
  download (dates) {
    return Api().post('/download', dates)
  },
  getCollections (db) {
    return Api().post('/collection', db)
  },
  getDatabases () {
    console.log('api database')
    return Api().get('/getDatabases')
  },
  getAllData (db) {
    return Api().post('/getAllData', db)
  }
}

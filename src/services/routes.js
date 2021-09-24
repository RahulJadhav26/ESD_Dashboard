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
  getAllData (db) {
    console.log(db)
    return Api().post('/getAllData', db)
  }
}

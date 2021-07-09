import Api from './Api'

export default {
  getData () {
    console.log('Api Hit')
    return Api().get('/data')
  }
}

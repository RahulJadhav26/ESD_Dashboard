import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://35.172.171.121:3000'
  })
}

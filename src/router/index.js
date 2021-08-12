import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DataRoomSensor from '../views/DataRoomSensor.vue'
import siteBuilding from '../components/siteBuilding'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/siteBuilding/:id',
    name: 'siteBuilding',
    component: siteBuilding
  },
  {
    path: '/dataRoomSensor',
    name: 'DataRoomSensor',
    component: DataRoomSensor
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DataRoomSensor from '../views/DataRoomSensor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dataRoomSensor',
    name: 'DataRoomSensor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DataRoomSensor
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

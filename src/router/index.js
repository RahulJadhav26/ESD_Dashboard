import Vue from 'vue'
// import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DataRoomSensor from '../views/DataRoomSensor.vue'
import siteBuilding from '../components/siteBuilding'
import collection from '../views/SensorDashboard'
import Login from '../views/Login'
import ForgotPass from '../views/ForgotPass.vue'
// import firebase from 'firebase'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'forgotPass',
    component: ForgotPass
  },
  {
    path: '/siteBuilding/:name',
    name: 'siteBuilding',
    component: siteBuilding
    // meta: {
    //   authRequired: true
    // }
  },
  {
    path: '/collection/:name',
    name: 'collection',
    component: collection
  },
  {
    path: '/dataRoomSensor',
    name: 'DataRoomSensor',
    component: DataRoomSensor
    // meta: {
    //   authRequired: true
    // }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//     console.log(store.state.sessionUser)
//     if (store.state.sessionUser === '') {
//       alert('You must be logged in to see this page')
//       next({
//         path: '/Login'
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router

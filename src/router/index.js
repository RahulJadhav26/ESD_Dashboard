import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DataRoomSensor from '../views/DataRoomSensor.vue'
import siteBuilding from '../components/siteBuilding'
import Login from '../views/Login'
import ForgotPass from '../views/ForgotPass.vue'
import firebase from 'firebase'
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next()
    } else {
      alert('You must be logged in to see this page')
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

export default router

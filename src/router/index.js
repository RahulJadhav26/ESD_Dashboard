import Vue from 'vue'
// import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DataRoomSensor from '../views/DataRoomSensor.vue'
import siteBuilding from '../components/siteBuilding'
import AddSensor from '../views/AddSensor.vue'
import AddSiteBuilding from '../views/AddSiteBuilding.vue'
import collection from '../views/SensorDashboard'
import Login from '../views/Login'
import Signin from '../views/Signin.vue'
import Profile from '../views/Profile.vue'
import ForgotPass from '../views/ForgotPass.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signin',
    component: Signin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forgotPassword',
    name: 'forgotPass',
    component: ForgotPass
  },
  {
    path: '/siteBuilding/:name',
    name: 'siteBuilding',
    component: siteBuilding
  },
  {
    path: '/collection/:name',
    name: 'collection',
    component: collection
  },
  {
    path: '/addSensor',
    name: 'addSensor',
    component: AddSensor
  },
  {
    path: '/addSiteBuilding',
    name: 'addSiteBuilding',
    component: AddSiteBuilding
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to Login Page
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to Profile Page
      next('/profile')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router

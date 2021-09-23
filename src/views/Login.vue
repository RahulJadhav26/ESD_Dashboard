<template>
<div>
  <div class="container">
  <form @submit.prevent="login">
    <h2 class="text-center" style="text-decoration:underline;">Login</h2>
    <label><h5>Email</h5></label>
    <b-form-input
    class="p-4"
    v-model="email"
    trim></b-form-input>
    <label><h5 class="mt-5">Password</h5></label>
    <b-form-input
    class="p-4"
    type="password"
    v-model="password"
    trim></b-form-input>
    <button class="mt-5 btn btn-outline-primary" type="submit">Login</button>
    <div class="mt-5">
    <!-- <router-link to="/register"><a>Register</a></router-link> -->
    <p class="forgot-password mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </div>
  </form>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            alert('Successfully logged in')
            this.$store.state.loggedIn = true
            this.$session.set('username', this.email)
            this.$store.state.sessionUser = this.$session.get('username')
          })
        }).then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          // Handle Errors here.
          alert(error.message)
        })
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     alert('Successfully logged in')
      //     this.$store.state.loggedIn = true
      //   }).then(() => {
      //     this.$router.push('/')
      //   })
      //   .catch(error => {
      //     alert(error.message)
      //   })
    }
  }
}
</script>

<style>

</style>

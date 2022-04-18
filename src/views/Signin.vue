<template>
  <div>
      <h1 class="text-center text">Register New User</h1>
      <Errors v-if="errors" :msg='errors'/>
      {{errors}}
            <v-card flat class="d-flex justify-space-around flatCard">
                <form @submit.prevent='registerUser()'>
                    <div class="form-group">
                        <label class="m-2 float-left" for="username">Name: </label>
                        <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        v-model="name"
                        class="form-control m-"
                        >
                    </div>
                    <div class="form-group">
                        <label class="m-2 float-left" for="username">Username: </label>
                        <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        v-model="username"
                        class="form-control m-"
                        >
                    </div>
                    <div class="form-group">
                        <label class="m-2 float-left" for="username">Email: </label>
                        <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        name="email"
                        v-model="email"
                        class="form-control m-"
                        >
                    </div>
                    <div class="form-group">
                        <label class="m-2 float-left" for="username">Password: </label>
                        <input
                        id="password"
                        type="text"
                        placeholder="Password"
                        name="password"
                        v-model="password"
                        class="form-control m-"
                        >
                    </div>
                    <div class="form-group">
                        <label class="m-2 float-left" for="username">Confirm Password: </label>
                        <input
                        id="password"
                        type="text"
                        placeholder="Password"
                        name="password"
                        v-model="confirmPassword"
                        class="form-control m-"
                        >
                    </div>
                    <v-card-actions>
                    <v-btn type='submit' color="primary" class="float-left" dark >Add user</v-btn>
                    <!-- <router-link class="nav-link" tag='a' to="/login">Already have an Account?</router-link> -->
                    </v-card-actions>
                </form>
            </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Errors from '../components/Errors'
export default {
  data () {
    return {
      username: '',
      password: '',
      name: '',
      email: '',
      confirmPassword: ''
    }
  },
  components: {
    Errors: Errors
  },
  computed: {
    ...mapGetters(['errors'])
  },
  methods: {
    ...mapActions(['register', 'Error']),
    registerUser () {
      const user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirmPassword,
        email: this.email,
        name: this.name,
        Role: 'user',
        blocked: false
      }
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push('/login')
        } else {
          this.Error(res.data)
        }
      })
    }
  }
}
</script>

<style>
.card{
    width:60;
    border-radius: 0 ;
}
.form-control{
    border-radius:0;
}
</style>

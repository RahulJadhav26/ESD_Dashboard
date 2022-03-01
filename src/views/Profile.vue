/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-parsing-error */
<template>
  <div>
    <v-card flat class="d-flex justify-content-center flatCard">
        <v-card style="width:70%" class='Card mb-5 mt-5'>
        <h1 class="text-center text ma-5"> My Profile </h1>
        <v-row no-gutters>
          <v-col>
            <v-img v-if="user.Role == 'admin' "  contain max-height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mh8vDFdunxMQ7wyAB6uP8C2mU7Kwjw9RIA&usqp=CAU" alt="Admin logo"></v-img>
            <v-img v-if="user.Role != 'admin' "  contain max-height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVUMbxnCutfgQyREsNgj5q1PcvxaDVc369w&usqp=CAU" alt="Guest logo"></v-img>
          </v-col>
          <v-col class="mr-3">
            <v-card
              class="mx-auto"
              max-width="600"
              flat
            >
            <v-list>
             <v-list-item>
                <v-list-item-content>
                   <v-list-item-title>Name: <span class="font-weight-bold">{{user.name}}</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Username: <span class="font-weight-bold">{{user.username}}</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email: <span class="font-weight-bold">{{user.email}}</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                   <v-list-item-title>Role: <span class="font-weight-bold">{{user.Role.toUpperCase()}}</span></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      </v-card>
    <v-card flat class="d-flex justify-content-center flatCard">
      <v-card class="Card" width="80%">
        <v-card-title class="text">
          <h3>All Users</h3>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
         <v-data-table
            :headers="headers"
            :items="allUsers"
            :items-per-page="10"
            :search="search"
            single-select
            item-key="username"
            v-model= 'selected'
            class="elevation-1"
          >
          <template v-slot:item.index = "{item}">
            {{allUsers.indexOf(item)+ 1}} )
          </template>
          <template  v-slot:item.actions = "{ item }">
             <v-btn :disabled="user.Role != 'admin'" @click="Delete(item)" color='red'>
              <v-icon
              @click="Delete(item)"
                class="mr-2"
              >
                mdi-delete-empty
              </v-icon>
              Delete </v-btn>
          </template>
          </v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: mapGetters(['user', 'allUsers']),
  methods: {
    ...mapActions(['getProfile', 'getAllUsers', 'deleteUsers']),
    Delete (user) {
      if (confirm('Are you sure you want to delete')) {
        this.deleteUsers(user).then((result) => {
          if (result) {
            this.getAllUsers()
          }
        })
      }
    }

  },
  created () {
    this.getProfile()
    this.getAllUsers()
  },
  data () {
    return {
      selected: [],
      search: '',
      headers: [
        { text: 'Index', value: 'index' },
        {
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'Role' },
        { text: 'Blocked', value: 'blocked' },
        { text: 'Time to unblock', value: 'blockedTime' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  }
}
</script>

<style scoped>
.Card{
border-radius: 1.7rem !important;
border: 3px solid rgb(88, 86, 214, 0.6);
}
</style>

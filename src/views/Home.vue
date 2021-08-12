<template>
  <div class="about">
    <h1 class="mb-5 text-center" style="text-decoration:underline;">ESD Monitoring</h1>
    <v-card flat class="d-flex justify-space-around">
       <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h3 class="text-center mt-5"> Total Number of Readings </h3>
        <v-card-text>
          <h1 class='text-center pt-5' style="font-size:4.5rem;">{{data.length}}</h1>
        </v-card-text>
      </v-card>
      <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h3 class="text-center mt-5"> Total Number of Alerts </h3>
        <v-card-text>
          <h1 class='text-center pt-5' style="font-size:4.5rem;">{{alertData.length}}</h1>
        </v-card-text>
      </v-card>
       <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h3 class="text-center mt-5"> Total On Board Sensors </h3>
        <v-card-text>
          <h1 class='text-center pt-5' style="font-size:4.5rem;">1</h1>
        </v-card-text>
      </v-card>
       <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h3 class="text-center mt-5"> Site Locations</h3>
        <v-card-text>
          <h1 class='text-center pt-5' style="font-size:4.5rem;">1</h1>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card flat
    class="d-flex justify-center"
    style="margin-top:25px;">
    <v-card
    width="70%"
    class="Card"
    >
    <v-card-title>Site Locations</v-card-title>
      <v-simple-table
      class="mt-5 mb-5"
      >
        <template v-slot:default>
          <thead>
            <tr class="text-center">
              <th>
                Building Location
              </th>
              <th>Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{data[0].company.name}} , {{data[0].company.address}}</td>
              <!-- <td><v-icon size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td> -->
              <td>
                <!-- <v-btn @click="navigate(data[0].company.id)" icon ><v-icon size="30">mdi-arrow-right-circle-outline</v-icon></v-btn> -->
                <router-link tag='button' :to="`/siteBuilding/${data[0].company.id}`"><button class="btn btn-primary"> Sensors</button></router-link>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
      </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      data: 'data',
      alertData: 'alertData'
    })
  },
  created () {
    this.getData().then(() => {
      console.log(this.data)
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData'
    }),
    navigate (id) {
      alert(id)
      alert('navigate')
      this.$router.push({ path: '/siteBuilding', params: { id: id } })
    }
  }
}
</script>

<style scoped>
.Card{
border-radius: 1.7rem !important;
border: 2px solid gray;
}
</style>

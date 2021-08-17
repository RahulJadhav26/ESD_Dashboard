<template>
  <div class="about">
    <h1 class="mb-5 text text-center" style="text-decoration:underline;">ESD Monitoring</h1>
    <v-card flat class="d-flex justify-space-around flatCard">
       <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total Number of Readings </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{data.length}}</h1>
        </v-card-text>
      </v-card>
      <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total Number of Alerts </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{alertData.length}}</h1>
        </v-card-text>
      </v-card>
       <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total On Board Sensors </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">1</h1>
        </v-card-text>
      </v-card>
       <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Site Locations</h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">1</h1>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card flat
    class="d-flex justify-center flatCard"
    style="margin-top:25px;">
    <v-card
    width="70%"
    class="Card"
    >
    <v-card-title class="text">Site Locations</v-card-title>
      <v-simple-table
      class="mt-5 mb-5 flatCard"
      >
        <template v-slot:default>
          <thead>
            <tr class="text-center">
              <th class="text">
                Building Location
              </th>
              <th class="text">Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text">{{data[0].company.name}} , {{data[0].company.address}}</td>
              <!-- <td><v-icon size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td> -->
              <td>
                <!-- <v-btn @click="navigate(data[0].company.id)" icon ><v-icon size="30">mdi-arrow-right-circle-outline</v-icon></v-btn> -->
                <router-link tag='button' :to="`/siteBuilding/${data[0].company.id}`"><button class="btn btn-primary"> All Sensors</button></router-link>
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
border: 2px solid rgba(247,105,0,0.6);
/* background: transparent !important; */
}
</style>

<template>
  <div>
      <div v-if="refresh" class="text-center">
        <!-- {{refresh}} -->
       <h3> Please Wait Loading... </h3>
       <br>
        <v-progress-circular
        :size="70"
        :width="7"
        color="indigo darken-4"
        indeterminate
        ></v-progress-circular>
      </div>
      <div  v-if="!refresh" >
        <h1 class="text-center text">{{this.$route.params.name}}</h1>
        <div>
          <v-tabs
            center-active
            background-color="transparent"
            v-model="tab"
            >
              <v-tab @click="reload(1)" >1 Day</v-tab>
              <v-tab @click="reload(7)">1 Week</v-tab>
              <v-tab @click="reload(30)">1 Month</v-tab>
              <v-tab @click="reload(90)">3 Months</v-tab>
              <v-tab @click="reload(180)">6 Months</v-tab>
          </v-tabs>
        </div>
      <v-card flat style="padding-top:50px;" class="d-flex justify-space-around flatCard">
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
      </v-card>
      <v-card flat
        class="d-flex justify-center flatCard"
        style="margin-top:25px;">
        <v-card
        width="70%"
        class="Card text shadow-lg"
        >
    <v-card-title>Sensor Locations</v-card-title>
      <v-simple-table
      class="mt-5 mb-5 "
      >
        <template v-slot:default>
          <thead>
            <tr class="text-center text">
              <th class="text">
                Sensor
              </th>
              <!-- <th class="text">Battery</th> -->
              <th class="text">Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="Goto(i)" v-for="i in sensors" :key="sensors.indexOf(i)">
              <td class="text">{{i}} </td>
              <td class="text">
                <v-btn icon ><v-icon class="text" size="30">mdi-arrow-right-circle-outline</v-icon></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
      </v-card>
      </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: '',
      loading: false,
      tab: null
    }
  },
  watch: {
    sensors: function (newVal, oldVal) {
      this.sensors = newVal
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      alertData: 'alertData',
      sensors: 'sensors',
      siteBuilding: 'siteBuilding',
      refresh: 'refresh'
    })
  },
  created () {
    var obj = {
      database: this.$route.params.name
    }
    // Get all the Data and alerts for the specific building using
    // the params(Building Name) passed and stores the data in state.data
    // and alert data in state.alertData
    this.getAllData({ database: this.$route.params.name, Day: 1 })
    // Gets all the sensor names from the specific building which is passed as obj and
    // store all the sensor names in state.sensors
    // Declares state.sitebuilding as the current building name
    this.getSensors(obj)
  },
  methods: {
    ...mapActions({
      getSensors: 'getSensors',
      getAllData: 'getAllData'
    }),
    // Get new data with new range
    reload (day) {
      var obj = {
        database: this.$route.params.name,
        Day: day
      }
      this.getAllData(obj)
    },
    // Directs to sensorDashboard page with sensor and sitebuilding as the parameters
    Goto (sensor) {
      var obj = {
        sensor: sensor,
        database: this.siteBuilding
      }
      this.$router.push({ name: 'collection', query: obj })
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

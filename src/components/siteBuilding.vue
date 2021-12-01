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
      <v-card flat style="padding-top:50px;" class="d-flex justify-space-around flatCard">
        <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total Number of Readings </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{data.length}}</h1>
          <!-- <h1 class='text-center text pt-5' style="font-size:4.5rem;">0</h1> -->
        </v-card-text>
      </v-card>
      <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total Number of Alerts </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{alertData.length}}</h1>
          <!-- <h1 class='text-center text pt-5' style="font-size:4.5rem;">0</h1> -->
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
              <!-- <td class="text"><v-icon class="text" size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td> -->
              <td class="text">
                <!-- <v-btn :href="'/collection/'+ i" icon ><v-icon class="text" size="30">mdi-arrow-right-circle-outline</v-icon></v-btn> -->
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
      loading: false
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
    console.log(this.loading)
    var obj = {
      database: this.$route.params.name
    }
    this.getAllData({ database: this.$route.params.name })
    this.getSensors(obj)
  },
  methods: {
    ...mapActions({
      getSensors: 'getSensors',
      getAllData: 'getAllData'
    }),
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

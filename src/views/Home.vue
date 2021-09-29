<template>
<div>
  <div class="text-center">
   <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate
      v-if="checkData"
    ></v-progress-circular>
    </div>
  <div
   v-if="!checkData"
  class="about"
  >
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
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{sensors.length}}</h1>
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
    class="Card shadow-lg"
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
            <tr v-for="i in databases" :key="databases.indexOf(i)">
              <!-- <td class="text">{{data[data.length - 1].company.name}} , {{data[data.length - 1].company.address}}</td> -->
              <!-- <td><v-icon size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td> -->
              <td>{{i.name}}</td>
              <td>
                <!-- <v-btn @click="navigate(data[0].company.id)" icon ><v-icon size="30">mdi-arrow-right-circle-outline</v-icon></v-btn> -->
                <!-- <button href="/siteBuilding" @click="navigate()" class="btn btn-primary"> All Sensors</button> -->
                <!-- <router-link tag='button' to="/siteBuilding" > -->
                <button @click="navigate(i.name)" class="btn btn-primary"> All Sensors</button>
                <!-- </router-link> -->
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
  computed: {
    ...mapGetters({
      data: 'data',
      alertData: 'alertData',
      sensors: 'sensors',
      databases: 'databases'
    }),
    checkData () {
      if (this.data.length === 0) {
        var flag = true
      } else {
        flag = false
      }
      return flag
    }
  },
  created () {
    this.getAllData({ database: 'sensor-data' }).then(() => {
      console.log('Refreshed v1')
    })
    this.getSensors({ database: 'sensor-data' })
    this.getDatabases()
  },
  methods: {
    ...mapActions({
      getData: 'getData',
      getSensors: 'getSensors',
      getAllData: 'getAllData',
      getDatabases: 'getDatabases'
    }),
    navigate (db) {
      // console.log(db)
      var obj = {
        database: db
      }
      this.$router.push({ name: 'siteBuilding', params: { name: obj.database } })
      // this.getSensors(obj)
    }

  }
}
</script>

<style scoped>
.Card{
border-radius: 1.7rem !important;
/* border: 2px solid rgba(247,105,0,0.6); */
border: 3px solid rgb(88, 86, 214, 0.6);
/* background: rgb(229,229,234) !important; */
}
</style>

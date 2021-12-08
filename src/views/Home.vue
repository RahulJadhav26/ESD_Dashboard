<template>
<div>
  <div class="text-center">
   <!-- <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate
      v-if="refresh"
    ></v-progress-circular> -->
    </div>
  <div
  class="about"
  >
    <h1 class="mb-5 text text-center">ESD Monitoring</h1>
    <v-card flat class="d-flex justify-space-around flatCard">
       <v-card elevation="10" class='Card shadow-lg' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Total Active Sensors </h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{allSensors.length}}</h1>
        </v-card-text>
      </v-card>
       <v-card elevation="10" class='Card' style="width:300px; height:200px;">
        <h4 class="text-center text mt-5"> Site Buildings</h4>
        <v-card-text>
          <h1 class='text-center text pt-5' style="font-size:4.5rem;">{{buildings.length}}</h1>
        </v-card-text>
      </v-card>
      </v-card>
    <v-card flat
    class="d-flex justify-center flatCard"
    style="margin-top:25px;">
    <v-card
    width="50%"
    class="Card shadow-lg"
    >
    <v-card-title class="text">Site Locations</v-card-title>
      <v-simple-table
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text">
                Building Location
              </th>
              <th class="text">Go to</th>
            </tr>
          </thead>
          <tbody>
              <tr  @click="navigate(i)" v-for="i in buildings" :key="buildings.indexOf(i)">
                <td class="text">{{i}}</td>
                <td>
                  <v-btn color="indigo darken-4" icon ><v-icon>mdi-arrow-right-circle-outline</v-icon></v-btn>
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
      flag: false
    }
  },
  computed: {
    ...mapGetters({
      alertData: 'alertData',
      sensors: 'sensors',
      allSensors: 'allSensors',
      siteBuilding: 'siteBuilding',
      refresh: 'refresh',
      buildings: 'buildings'
    })
  },
  created () {
    // Get All Sensors for getting the count of all active sensors and stored in state.allsensors
    this.getAllSensors()
    // Get all buildings to display the list of buildings on the page and stored in state.buildings
    this.getBuildings()
  },
  methods: {
    ...mapActions({
      getSensors: 'getSensors',
      getAllData: 'getAllData',
      getAllSensors: 'getAllSensors',
      getBuildings: 'getBuildings'
    }),
    // On Button click it navigates to /siteBuilding passing the building name as the param
    navigate (db) {
      console.log(db)
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
padding: 5px;
/* border: 2px solid rgba(247,105,0,0.6); */
/* border: 3px solid rgb(88, 86, 214, 0.6); */
border: 3px solid rgb(88, 86, 214, 0.6);
/* background: rgb(229,229,234) !important; */
/* background: transparent  !important;; */
}
/* tr:hover{
  box-shadow: 0px 1px 5px;
} */
.text{
  color:rgba(0,14,84);
}
</style>

<template>
  <div>

      <div class="text-center">
        <v-progress-circular
        :size="70"
        :width="7"
        color="blue"
        indeterminate
        v-if="refresh"
        ></v-progress-circular>
      </div>
      <div v-if="!refresh">
        <h1 style="text-decoration:underline;" class="text-center text">Site Building : {{this.$route.params.name}}</h1>
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
            <tr v-for="i in sensors" :key="sensors.indexOf(i)">
              <td class="text">{{i}} </td>
              <!-- <td class="text"><v-icon class="text" size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td> -->
              <td class="text">
                <v-btn :href="'/collection/'+ i" icon ><v-icon class="text" size="30">mdi-arrow-right-circle-outline</v-icon></v-btn>
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
      id: ''
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
    this.refresh = true
    console.log('called')
    var obj = {
      database: this.$route.params.name
    }
    this.getSensors(obj).then(() => {
      console.log('sensors fetched')
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData',
      getSensors: 'getSensors'
    })
  }
}
</script>
<style scoped>
.Card{
border-radius: 1.7rem !important;
border: 3px solid rgb(88, 86, 214, 0.6);
}
</style>

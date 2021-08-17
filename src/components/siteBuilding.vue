<template>
  <div>
      <h1 style="text-decoration:underline;" class="text-center text"> Site Building Id : {{id}}</h1>
      <v-card flat
    class="d-flex justify-center flatCard"
    style="margin-top:25px;">
    <v-card
    width="70%"
    class="Card text"
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
              <th class="text">Battery</th>
              <th class="text">Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text">{{data[0].device.thing_name}} </td>
              <td class="text"><v-icon class="text" size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td>
              <td class="text">
                <v-btn href="/dataRoomSensor" icon ><v-icon class="text" size="30">mdi-arrow-right-circle-outline</v-icon></v-btn>
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
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      data: 'data',
      alertData: 'alertData'
    })
  },
  watch: {
    id: function (newVal, oldVal) {
      this.listSensors(newVal)
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    ...mapActions({
      getData: 'getData'
    }),
    listSensors (id) {
    }
  }
}
</script>
<style scoped>
.Card{
border-radius: 1.7rem !important;
border: 2px solid rgba(247,105,0,0.6);
}
</style>

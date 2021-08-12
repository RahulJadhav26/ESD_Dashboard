<template>
  <div>
      <h1 class="text-center"> Site Building id {{id}}</h1>
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
                Sensor
              </th>
              <th>Go to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{data[0].device.thing_name}} </td>
              <td><v-icon size="30">mdi-battery-plus</v-icon>{{data[data.length - 1 ].event_data.payload[0].value}}</td>
              <td>
                <v-btn href="/dataRoomSensor" icon ><v-icon size="30">mdi-arrow-right-circle-outline</v-icon></v-btn>
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

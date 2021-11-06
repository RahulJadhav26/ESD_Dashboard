<template>
  <div>
      <h1 class="text-center">Add/Edit Sensors</h1>
      <div v-if="message">
      <v-alert class="m-5" v-if="message.status" type="success">{{message.msg}}</v-alert>
      <v-alert class="m-5" v-if="!message.status" type="error">{{message.msg}}</v-alert>
      </div>
      <div v-if="feedbackMessage">
        <v-alert class="m-5" v-if="feedbackMessage.status" type="success">{{feedbackMessage.msg}}</v-alert>
        <v-alert class="m-5" v-if="!feedbackMessage.status" type="error">{{feedbackMessage.msg}}</v-alert>
      </div>
      <div class="container">
        <v-card flat class="flatCard container">
          <v-row>
            <v-col>
                <h5 class="pt-3">Select Your Sensor :</h5>
            </v-col>
            <v-col>
              <v-select
                :items='allSensorCollection'
                filled
                rounded
                label="Select your Sensor"
                dense
                v-model="payload.sensor"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col >
                <h5 class="pt-3">Current Location :</h5>
            </v-col>
            <v-col>
              <v-text-field
                :label="sensorBuilding.name"
                filled
                rounded
                dense
                disabled
                v-model= "payload.source.name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <h5 class="pt-3">Target Building :</h5>
            </v-col>
            <v-col>
              <v-select
                :items="allBuildings"
                item-text="name"
                return-object
                filled
                rounded
                label="Select your Destination"
                dense
                v-model="payload.destination"
              ></v-select>
            </v-col>
          </v-row>
          <div class="text-center">
              <v-btn
                color="primary"
                class="m-5"
                x-large
                style="width:50%;"
                @click="edit(payload)"
              >
                Submit
              </v-btn>
          </div>
        </v-card>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      payload: {
        sensor: '',
        source: '',
        destination: ''
      },
      message: null
    }
  },
  computed: {
    ...mapGetters({
      feedbackMessage: 'feedbackMessage',
      allSensorCollection: 'allSensorCollection',
      allBuildings: 'allBuildings',
      sensorBuilding: 'sensorBuilding'
    })
  },
  watch: {
    'payload.sensor': function (newVal, oldVal) {
      var obj = { sensor: newVal }
      console.log(obj)
      this.findBuilding(obj)
    },
    sensorBuilding: function (newVal, oldVal) {
      this.payload.source = this.sensorBuilding
    }
  },
  methods: {
    ...mapActions({
      getAllSensorCollection: 'getAllSensorCollection',
      getAllBuilding: 'getAllBuilding',
      findBuilding: 'findBuilding',
      editSensor: 'editSensor'
    }),
    edit (payload) {
      if (payload.sensor === '' || payload.source === '' || payload.destination === '') {
        this.message = { status: false, msg: 'Please Select the sensor and a Target Building' }
      } else if (payload.destination.name === payload.source.name) {
        this.message = { status: false, msg: 'Please Select Target Destination other than current destination' }
      } else {
        this.editSensor(payload)
      }
    }
  },
  created () {
    this.getAllSensorCollection()
    this.getAllBuilding()
  }
}
</script>

<style>

</style>

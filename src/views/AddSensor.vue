<template>
  <div>
      <h1 class="text-center"> Move Sensors</h1>
      <div v-if="message">
      <v-alert class="m-5" v-if="message.status" type="success">{{message.msg}}</v-alert>
      <v-alert class="m-5" v-if="!message.status" type="error">{{message.msg}}</v-alert>
      </div>
      <div class="container">
        <v-card flat class="flatCard container">
          <v-card flat class="flatCard container">
            <v-card  class="Card">
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
                    v-if="payload.source"
                    v-model= "payload.source.name"
                  ></v-text-field>
                  <v-text-field
                    label="Alloted to No Building"
                    filled
                    dense
                    disabled
                    v-model= "payload.source"
                    v-if="!payload.source"
                  ></v-text-field>
                </v-col>
                <div class="ml-5">
                  <v-checkbox
                    v-model="move"
                    label="Do you want to move the Sensor location"
                  ></v-checkbox>
                </div>
                <div v-if="move">
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
                      <div class="text-center">
                        <div v-if="feedbackMessage">
                          <v-alert class="m-" v-if="feedbackMessage.status" type="success">{{feedbackMessage.msg}}</v-alert>
                          <v-alert class="m-" v-if="!feedbackMessage.status" type="error">{{feedbackMessage.msg}}</v-alert>
                        </div>
                      <v-btn
                        color="primary"
                        class="mb-3"
                        x-large
                        style="width:50%;"
                        @click="edit(payload)"
                      >
                        Submit
                      </v-btn>
                  </div>
                </div>
            </v-card>
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
      payload: {
        sensor: '',
        source: '',
        destination: ''
      },
      move: false,
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
      this.findBuilding(obj)
    },
    sensorBuilding: function (newVal, oldVal) {
      if (this.sensorBuilding) {
        this.payload.source = this.sensorBuilding
      } else {
        this.payload.source = ''
      }
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
      if (payload.sensor === '' || payload.destination === '') {
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
</style>

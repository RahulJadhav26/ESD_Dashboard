<template>
  <div>
    <!-- {{building}} -->
      <h1 class="text-center">Add Building</h1>
      <div v-if="feedbackMessage">
      <v-alert class="m-5" v-if="feedbackMessage.status" type="success">{{feedbackMessage.msg}}</v-alert>
      <v-alert class="m-5" v-if="!feedbackMessage.status" type="error">{{feedbackMessage.msg}}</v-alert>
      </div>
    <div class="container">
      <v-card flat class="flatCard">
        <v-row>
          <v-col>
              Name of the Building
          </v-col>
          <v-col>
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.name"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col >
              Address Line 1
          </v-col>
          <v-col>
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.address1"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
              Address Line 2
          </v-col>
          <v-col>
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.address2"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="2" align="Right">
              City
          </v-col>
          <v-col md="2">
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.city"
              ></v-text-field>
          </v-col>
          <v-col md="2" align="Right">
              State
          </v-col>
          <v-col md="2">
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.state"
              ></v-text-field>
          </v-col>
          <v-col md="2" align="Right">
              Zip Code
          </v-col>
          <v-col md="2">
            <v-text-field
                label=""
                placeholder=""
                filled
                rounded
                dense
                v-model="building.zipcode"
              ></v-text-field>
          </v-col>
        </v-row>
            <v-btn
              color="primary"
              class="m-5"
              @click="submit()"
            >
              Submit
            </v-btn>
            <v-btn
              color="success"
              class="m-5"
              href="/addSensor"
            >
              Add Sensor
            </v-btn>
      </v-card>
    </div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      building: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        sensors: []
      },
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapGetters({
      feedbackMessage: 'feedbackMessage'
    })
  },
  methods: {
    ...mapActions({
      addBuilding: 'addBuilding'
    }),
    submit () {
      if (this.building.name && this.building.address1 && this.building.address2 && this.building.city && this.building.state && this.building.zipcode) {
        this.addBuilding(this.building).then(() => {
          this.building = {
            name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            sensors: []
          }
        })
      } else {
        alert('Please complete all the fields')
      }
    }

  }
}
</script>

<style scoped>
.flatCard{
  background: transparent !important;
}
</style>

<template>
  <div>
    <div v-if="!showChart" class="text-center">
        <h3> Please Wait Loading... </h3>
        <br>
        <v-progress-circular
        :size="70"
        :width="7"
        color="indigo darken-4"
        indeterminate
        ></v-progress-circular>
    </div>
    <div v-if="showChart">
      <h1 class="text-center text" style="text-decoration:underline;">DASHBOARD</h1>
      <div class="m-1">
        <v-row>
        <v-col>
        <v-tabs
          center-active
          background-color="transparent"
          class="mb-4"
          v-model="tab"
          >
            <v-tab @click=" reload(1)">1 Day</v-tab>
            <v-tab @click=" reload(7)">1 Week</v-tab>
            <v-tab @click=" reload(30)">1 Month</v-tab>
            <v-tab @click=" reload(90)">3 Months</v-tab>
            <v-tab @click=" reload(180)">6 Months</v-tab>
        </v-tabs>
        </v-col>
        <v-col>
        <v-btn-toggle
          group
          class="float-right"
        >
        <v-select
          v-model="select"
          :items="items"
          item-text="text"
          item-value="value"
          persistent-hint
          filled
          dense
        ></v-select>
          <!-- <v-btn value="line">
           Humidity & temperature Line chart
          </v-btn> -->
          <!-- <v-btn value="bar">
            Alerts Chart
          </v-btn> -->
        </v-btn-toggle>
        </v-col>
        </v-row>
       </div>
       <div>
        <!-- {{lineChartData}} -->
        <v-card  flat class="d-flex justify-center mx-2 flatCard">
          <v-card v-if="showChart && select != 'Alerts' " class="chartCard mx-1 pa-2" style="width:100%;">
              <line-chart :chartData="lineChartData" :options="options" />
          </v-card>
            <v-card v-if="showAlertChart && select == 'Alerts'"  class=" chartCard mx-1 pa-2" style="width:100%;">
            <mix-chart :chartData="mixChartData" :options="mixChartoptions"/>
            </v-card>
        </v-card>
      </div>
      <div>
        <Table/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MixChart from '../components/MixChart.vue'
import LineChart from '../components/lineChart.vue'
import Table from '../components/Table.vue'
export default {
  components: {
    Table,
    LineChart,
    MixChart
  },
  data () {
    return {
      items: [],
      tab: null,
      select: '',
      payloadLabels: [],
      payloadParam: [],
      showChart: false,
      alertLabels: [],
      alertChartData: [],
      alertThreshold: [],
      showAlertChart: false,
      lineChartData: {},
      chart: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: false,
              autoSkip: true,
              maxTicksLimit: 7,
              maxRotation: 0,
              minRotation: 0
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      },
      mixChartData: {},
      mixChartoptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    select: function (newVal, oldVal) {
      if (this.payload.length === 0) {
        this.showChart = true
        this.showAlertChart = true
        this.refresh = true
      } else {
        this.showChart = false
        this.payloadLabels = []
        this.payloadParam = []
        this.mixChartData = {}
        this.lineChartData = {}
        if (newVal !== 'Alerts') {
          this.payloadLabels = []
          this.payloadParam = []

          for (var i = 0; i < this.payload.length; i++) {
            if (Object.prototype.hasOwnProperty.call(this.payload[i], this.select)) {
              this.payloadParam.push(this.payload[i][this.select])
              this.payloadLabels.push(this.payload[i].timestamp)
            }
          }
          this.lineChartData = {
            labels: this.payloadLabels.reverse(),
            datasets: [
              {
                type: 'line',
                label: this.select,
                data: this.payloadParam.reverse(),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                // backgroundColor: 'rgb(255, 131, 125)',
                borderWidth: 4
              }
            ]
          }
          this.showChart = true
          this.refresh = true
        } else if (newVal === 'Alerts') {
          this.alertLabels = []
          this.alertThreshold = []
          this.alertChartData = []
          this.showChart = false
          this.showAlertChart = false
          this.refresh = false
          for (var j in this.alertPayload) {
            this.alertChartData.push(this.alertPayload[j].value)
            var date = new Date(Number(this.alertPayload[j].timestamp))
            date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
           ' ' + (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear()
            this.alertLabels.push(date)
            this.alertThreshold.push(this.alertPayload[j].triggerData.triggers[0].conditions[0].value)
          }
          this.mixChartData = {
            labels: this.alertLabels.reverse(),
            datasets: [{
              label: 'Alerts',
              borderWidth: 2,
              borderColor: 'rgba(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              data: this.alertChartData.reverse()
            },
            {
              type: 'line',
              label: 'Threshold',
              data: this.alertThreshold.reverse(),
              fill: false,
              borderWidth: 4,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }
            ]
          }
          this.showAlertChart = true
          this.showChart = true
          this.refresh = true
        }
      }
    },
    payload: function (newVal, oldVal) {
      if (newVal.length === 0) {
        this.showChart = true
        this.showAlertChart = true
        this.refresh = true
      } else {
        this.payloadLabels = []
        this.payloadParam = []
        this.showChart = false
        this.refresh = false
        for (var i = 0; i < this.payload.length; i++) {
          if (Object.prototype.hasOwnProperty.call(this.payload[i], this.select)) {
            this.payloadParam.push(this.payload[i][this.select])
            this.payloadLabels.push(this.payload[i].timestamp)
          }
        }
        this.lineChartData = {
          labels: this.payloadLabels.reverse(),
          datasets: [
            {
              type: 'line',
              label: this.select,
              data: this.payloadParam.reverse(),
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              // backgroundColor: 'rgb(255, 131, 125)',
              borderWidth: 4
            }
          ]
        }
        this.showChart = true
        this.refresh = true
      }
    },
    alertPayload: function (newVal, oldVal) {
      if (newVal.length === 0) {
        this.showChart = true
        this.showAlertChart = true
        this.refresh = true
      } else {
        this.alertLabels = []
        this.alertThreshold = []
        this.alertChartData = []
        this.showAlertChart = false
        this.refresh = false
        for (var i in newVal) {
          this.alertChartData.push(newVal[i].value)
          var date = new Date(Number(newVal[i].timestamp))
          date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
           ' ' + (date.getMonth() + 1) +
          '/' + date.getDate() +
          '/' + date.getFullYear()
          this.alertLabels.push(date)
          this.alertThreshold.push(newVal[i].triggerData.triggers[0].conditions[0].value)
        }
        this.mixChartData = {
          labels: this.alertLabels.reverse(),
          datasets: [{
            label: 'Alerts',
            borderWidth: 2,
            borderColor: 'rgba(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: this.alertChartData.reverse()
          },
          {
            type: 'line',
            label: 'Threshold',
            data: this.alertThreshold.reverse(),
            fill: false,
            borderWidth: 4,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          }
          ]
        }
        this.showAlertChart = true
        this.refresh = true
      }
    },
    payloadHeaders: function (newVal, oldVal) {
      if (newVal) {
        this.selectOptions()
      }
    }
  },
  computed: {
    ...mapGetters({
      payload: 'payload',
      payloadHeaders: 'payloadHeaders',
      alertPayload: 'alertPayload',
      siteBuilding: 'siteBuilding',
      alertData: 'alertData',
      refresh: 'refresh'
    }),
    linechartData: function () {
      return this.lineChartData
    },
    mixchartData: function () {
      return this.mixChartData
    }
  },
  created () {
    // Fetches the desired sensor data and alerts and stores the custom payload in
    // state.alertPayload and state.payload
    // Lastly it stores the raw data in state.alertDate and state.data
    this.getCollectionData({ database: this.$route.query.database, collection: this.$route.query.sensor, Day: 1 })
    this.selectOptions()
  },
  methods: {
    ...mapActions({
      getCollectionData: 'getCollectionData'
    }),
    selectOptions () {
      this.items = []
      if (this.$route.query.sensor.includes('ESD_MSIGHT')) {
        this.items = [
          { text: 'Temperature', value: 'Temperature' },
          { text: 'Humidity', value: 'Humidity' },
          { text: 'Motion', value: 'Motion' },
          { text: 'Light', value: 'Light' },
          { text: 'CO2', value: 'CO2' },
          { text: 'TVOC', value: 'TVOC' },
          { text: 'Converted TVOC', value: 'Converted TVOC' },
          { text: 'Pressure', value: 'Pressure' },
          { text: 'RSSI', value: 'RSSI' },
          { text: 'SNR', value: 'SNR' }
        ]
      } else {
        if (this.payloadHeaders) {
          this.payloadHeaders.forEach(res => {
            if (res.text !== 'Timestamp') {
              this.items.push(res)
            }
          })
        }
      }
      this.items.push({ text: 'Alerts', value: 'Alerts' })
      this.select = this.items[0].value
    },
    // Get new data with new range
    async reload (day) {
      var obj = {
        database: this.$route.params.name,
        collection: this.$route.query.sensor,
        Day: day
      }
      this.showChart = false
      this.showAlertChart = false
      this.alertLabels = []
      this.alertThreshold = []
      this.alertChartData = []
      this.payloadLabels = []
      this.payloadParam = []
      this.mixChartData = {}
      this.lineChartData = {}
      this.getCollectionData(obj)
    }
  }
}
</script>

<style>
.chartCard{
border-radius: 1.7rem !important;
/* border: 2px solid rgba(247,105,0,0.6); */
border: 3px solid rgb(88, 86, 214, 0.6) !important;
/* background: rgb(255, 131, 125) !important; */
}
</style>

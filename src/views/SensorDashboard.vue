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
      <v-card flat class="d-flex justify-center mx-2 flatCard">
        <v-card v-if="showChart" class="chartCard mx-1 pa-2" style="width:50%;">
            <line-chart :chartData="lineChartData" :options="options" />
        </v-card>
          <v-card v-if="showAlertChart"  class=" chartCard mx-1 pa-2" style="width:50%;">
          <mix-chart   :chartData="mixChartData" :options="mixChartoptions"/>
          </v-card>
      </v-card>
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
      payloadLabels: [],
      payloadInternalTemp: [],
      payloadHumidity: [],
      showChart: false,
      alertLabels: [],
      alertChartData: [],
      alertThreshold: [],
      showAlertChart: false,
      lineChartData: {},
      options: {
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
              display: false
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
    payload: function (newVal, oldVal) {
      this.payloadLabels = []
      this.payloadInternalTemp = []
      this.payloadHumidity = []
      this.showChart = false
      for (var i = 0; i < 5; i++) {
        this.payloadLabels.push(this.payload[i].timestamp)
        this.payloadHumidity.push(this.payload[i].Humidity)
        for (var property in this.payload[i]) {
          if (Object.prototype.hasOwnProperty.call(this.payload[i], property) && property.toString().toLowerCase().includes('temp')) {
            this.payloadInternalTemp.push(this.payload[i][property])
          }
        }
      }
      this.lineChartData = {
        labels: this.payloadLabels.reverse(),
        datasets: [
          {
            type: 'line',
            label: 'Internal temperature',
            data: this.payloadInternalTemp.reverse(),
            fill: false,
            borderColor: 'rgb(255, 69, 58)',
            // backgroundColor: 'rgb(255, 131, 125)',
            borderWidth: 4
          },
          {
            type: 'line',
            label: 'Humidity',
            data: this.payloadHumidity.reverse(),
            fill: false,
            borderColor: 'rgb(10,132,255)',
            // backgroundColor: '#2554FF',
            borderWidth: 4
          }
        ]
      }
      this.showChart = true
    },
    alertPayload: function (newVal, oldVal) {
      this.alertLabels = []
      this.alertThreshold = []
      this.alertChartData = []
      this.showAlertChart = false
      for (var i in newVal.slice(-5)) {
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
    }
  },
  computed: {
    ...mapGetters({
      payload: 'payload',
      alertPayload: 'alertPayload',
      siteBuilding: 'siteBuilding',
      alertData: 'alertData'
    }),
    linechartData: function () {
      return this.lineChartData
    },
    mixchartData: function () {
      return this.mixChartData
    }
  },
  created () {
    // Fetches the desired sensor data and alerts and stores the custom payload in state.alertPayload and state.payload
    // Lastly it stores the raw data in state.alertDate and state.data
    this.getCollectionData({ database: this.$route.query.database, collection: this.$route.query.sensor })
  },
  methods: {
    ...mapActions({
      getCollectionData: 'getCollectionData'
    })
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

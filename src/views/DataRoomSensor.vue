<template>
<div>
  <h1 class="text-center" style="text-decoration:underline;">DASHBOARD</h1>
  <div class="text-center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate
      v-if="!showChart"
    ></v-progress-circular>
  </div>
  <v-card flat class="d-flex mx-5 justify-center">
    <v-card v-if="showChart" class="chartCard pa-2 mx-1" style="width:50%;">
      <line-chart  :chartData="lineChartData" :options="options" />
    </v-card>
    <v-card v-if="showAlertChart"  class=" chartCard pa-2 mx-1" style="width:50%;">
    <mix-chart   :chartData="mixChartData" :options="mixChartoptions"/>
    </v-card>
  </v-card>
  <div>
  <Table/>
  </div>
</div>
</template>

<script>
import Table from '../components/Table.vue'
import MixChart from '../components/MixChart.vue'
import LineChart from '../components/lineChart.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      payloadLabels: [],
      payloadInternalTemp: [],
      payloadHumidity: [],
      showChart: false,
      alertLabels: [],
      alertThreshold: [],
      alertData: [],
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
              display: false
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
  methods: {
    ...mapActions({
      getData: 'getData'
    })
  },
  watch: {
    payload: function (newVal, oldVal) {
      this.payloadLabels = []
      this.payloadInternalTemp = []
      this.payloadHumidity = []
      this.showChart = false
      for (var i = 0; i < 8; i++) {
        this.payloadLabels.push(this.payload[i].timestamp)
        this.payloadInternalTemp.push(this.payload[i].internalTemp)
        this.payloadHumidity.push(this.payload[i].humidity)
      }
      this.lineChartData = {
        labels: this.payloadLabels.reverse(),
        datasets: [
          {
            type: 'line',
            label: 'Internal temperature',
            data: this.payloadInternalTemp.reverse(),
            fill: false,
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 4
          },
          {
            type: 'line',
            label: 'Humidity',
            data: this.payloadHumidity.reverse(),
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 4
          }
        ]
      }
      this.showChart = true
    },
    alertPayload: function (newVal, oldVal) {
      this.alertLabels = []
      this.alertThreshold = []
      this.alertData = []
      this.showAlertChart = false
      console.log(newVal)
      for (var i in newVal.slice(-8)) {
        this.alertData.push(newVal[i].value)
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
        labels: this.alertLabels,
        datasets: [{
          label: 'Alerts',
          borderWidth: 2,
          borderColor: 'rgba(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: this.alertData.reverse()
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
      alertPayload: 'alertPayload'
    }),
    linechartData: function () {
      return this.lineChartData
    },
    mixchartData: function () {
      return this.mixChartData
    }
  },
  components: {
    Table,
    LineChart,
    MixChart
  }
}
</script>
<style scoped>
.chartCard{
border-radius: 1.7rem !important;
border: 2px solid gray;
}
</style>

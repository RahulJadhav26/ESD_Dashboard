<template>
<div>
  <h1 class="text-center" style="text-decoration:underline;">DASHBOARD</h1>
  <v-card flat class="d-flex mx-5 justify-center">
    <v-card class="chartCard pa-2 mx-1" style="width:50%;">
      <line-chart :chartData="chartData" :options="options" />
    </v-card>
    <v-card  class=" chartCard pa-2 mx-1" style="width:50%;">
    <mix-chart :chartData="mixchartData" :options="mixChartoptions"/>
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
      chartData: {
        labels: ['Babol', 'Cabanatuan', 'Daegu', 'Jerusalem', 'Fairfield', 'New York', 'Gangtok', 'Buenos Aires', 'Hafar Al-Batin', 'Idlib'],
        datasets: [
          {
            type: 'line',
            label: 'Line Chart',
            data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
            fill: false,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            borderWidth: 4
          }
        ]
      },
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
      mixchartData: {
        labels: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06',
          '2020-10', '2020-7'
        ],
        datasets: [{
          type: 'scatter',
          label: 'Population Data',
          borderWidth: 1,
          backgroundColor: 'red',
          data: [{
            x: 6,
            y: 3,
            r: 15
          }, {
            x: 3,
            y: 12,
            r: 4
          },
          {
            x: 5,
            y: 15,
            r: 10
          },
          {
            x: 3,
            y: 12,
            r: 8
          },
          {
            x: 4,
            y: 5,
            r: 20
          },
          {
            x: 2,
            y: 6,
            r: 3
          },
          {
            x: 4,
            y: 9,
            r: 11
          },
          {
            x: 5,
            y: 10,
            r: 6
          }
          ]
        },
        {
          type: 'line',
          label: 'Line Chart',
          data: [7, 7, 7, 7, 7, 7, 7, 7],
          fill: false,
          borderWidth: 4,
          borderColor: 'blue',
          backgroundColor: 'blue'
        }]
      },
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
    }),
    fillData () {
      console.log(this.payload)
    }
  },
  computed: {
    ...mapGetters({
      payload: 'payload',
      alertPayload: 'alertPayload'
    })
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

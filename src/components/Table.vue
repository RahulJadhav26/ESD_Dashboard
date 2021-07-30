<template>
<div class="container">
    <v-card>
      <v-toolbar flat>
      <v-card-title>
        <h2>{{data[0].device.thing_name}}</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            scrollable
            max-width="50%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              class="mr-5"
                v-bind="attrs"
                v-on="on"
              >
                Download
              </v-btn>
            </template>
            <v-card>
                  <v-card-title>Select Range</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="">
                      <v-row >
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-date-picker
                              v-model="dates"
                              range
                              class="justify-center"
                            ></v-date-picker>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                          <v-text-field
                              v-model="dateRangeText"
                              label="Date range"
                              prepend-icon="mdi-calendar"
                              readonly
                            ></v-text-field>
                            <!-- Selected: {{ dates }} -->
                          </v-col>
                        </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false; Download()"
                    >
                      Download
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        <v-btn @click="DownloadAll()">Download All</v-btn>
        <v-btn @click="getData()">Refresh</v-btn>
      </v-card-actions>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="payload"
      >
      </v-data-table>
    </v-card>
    <br>
    <v-card>
      <v-card-title>
        <h1 class="mr-2">Alerts</h1>
        <!-- <p v-if="checkAlert">Threshold:{{alertData[0].event_data.triggerData.triggers[0].conditions[0].value}}</p> -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="alertsearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text v-if="checkAlert">Threshold:{{alertData[0].event_data.triggerData.triggers[0].conditions[0].value}}</v-card-text>
    <v-data-table
        :headers="alertheaders"
        :search="alertsearch"
        :items="alertPayload"
      >
      <template v-slot:item.timestamp= "{ item }">
        <div>{{Date(item.timestamp)}}</div>
      </template>
      </v-data-table>
    </v-card>
</div>
</template>

<script>
import XLSX from 'xlsx'
import routes from '../services/routes'
import { mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    search: '',
    dialogm1: '',
    dialog: false,
    dates: [],
    alertsearch: '',
    date: new Date(),
    headers: [
      {
        text: 'Internal Temperature',
        value: 'internalTemp'
      },
      {
        text: 'Humidity',
        value: 'humidity'
      },
      {
        text: 'RSSI',
        value: 'RSSI'
      },
      {
        text: 'SNR',
        value: 'SNR'
      },
      {
        text: ' Battery Level',
        value: 'battery'
      },
      {
        text: 'TimeStamp',
        value: 'timestamp'
      }
    ],
    alertheaders: [
      {
        text: ' Alert Type',
        value: 'title'
      },
      {
        text: 'Reading Value',
        value: 'value'
      },
      {
        text: 'TimeStamp',
        value: 'timestamp'
      }
    ]
  }),
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
      alertPayload: 'alertPayload',
      alertData: 'alertData'
    }),
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
    checkAlert () {
      if (this.alertData.length === 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      getData: 'getData'
    }),
    DownloadAll () {
      this.getData().then(() => {
        var uplink = this.$store.state.webhookAPI.payload
        const result = XLSX.utils.json_to_sheet(uplink)
        console.log(result)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, result, 'data')
        XLSX.writeFile(wb, 'Download.xlsx')
      })
    },
    Download () {
      var array = []
      var payload = []
      var max = 0
      for (var i in this.dates) {
        // var myDate = this.dates[i]
        // myDate = myDate.split('-')
        // var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0])
        // console.log(newDate.getTime())
        var datum = Date.parse(this.dates[i] + ' 00:00:00')
        if (max < datum) {
          max = datum
        }
        array.push(datum)
      }
      if (array[0] === max) {
        [array[0], array[1]] = [array[1], array[0]]
      }
      routes.download(array).then(data => {
        for (var i in data.data.data) {
          var date = new Date(data.data.data[i].event_data.payload[0].timestamp)
          date = date.getHours() +
          ':' + date.getMinutes() +
          ':' + date.getSeconds() +
          ' ' + date.getDate() +
          '/' + (date.getMonth() + 1) +
          '/' + date.getFullYear()
          var obj = {
            battery: data.data.data[i].event_data.payload[0].value,
            internalTemp: data.data.data[i].event_data.payload[1].value * 9 / 5 + 32,
            humidity: data.data.data[i].event_data.payload[2].value,
            RSSI: data.data.data[i].event_data.payload[3].value,
            SNR: data.data.data[i].event_data.payload[4].value,
            timestamp: date
          }
          payload.push(obj)
        }
        console.log(payload)
      }).then(() => {
        const result = XLSX.utils.json_to_sheet(payload)
        console.log(result)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, result, 'data')
        XLSX.writeFile(wb, 'Download.xlsx')
      })
    }
  }
}
</script>

<template>
<div style="margin:27px;">
  <v-snackbar
  v-model="snackbar"
  absolute
  bottom
  color="deep-purple lighten-3"
  :timeout="timeout">Alert Acknowledgement Request Sent
  </v-snackbar>

  <!--  -->
  <!--  -->
  <!--  -->
  <!-- VERSION 1 OF TABLE WITH WITH VUETIFY DATA TABLE (LEGACY TABLE, IT CANT HANDLE PARTIAL VALUES SEND BY SENSOR DURING WEAK CONNECTIVITY) -->
    <!-- <v-card
    class="Card">
      <v-toolbar flat>
      <v-card-title>
        <h2 class="text">{{this.$route.query.sensor}}</h2>
      </v-card-title>
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
               color="primary"
                v-bind="attrs"
                v-on="on"
                dark
                style="margin-right:40px;"
              >
                Download
              </v-btn>

            </template>
            <v-card>
                  <v-card-title>Select Range</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text >
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
                      disabled
                      @click="dialog = false; Download()"
                    >
                      Download
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        <v-btn class="primary mt-3" disabled @click="DownloadAll()">Download All</v-btn>
      </v-card-actions>
      <v-text-field
      class="mt-3"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <div class=" text text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="blue"
          indeterminate
          v-if="!refresh"
        ></v-progress-circular>
      </div>
      <v-card-text class='text'>Total number of readings: {{payload.length}}</v-card-text>
      <v-data-table
        class="text"
        :headers="payloadHeaders"
        :search="search"
        :items="payload"
        v-if="refresh"
      >
      </v-data-table>
    </v-card> -->
    <br>
    <!--  -->
    <!--  -->
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- VERSION 2 of TABLE HANDLING THE DATA WHEN SENSOR IS SENDING PARTIAL VALUES -->
    <v-card  class="Card p-2">
      <v-toolbar flat>
      <v-card-title>
        <h2 class="text">{{this.$route.query.sensor}}</h2>
      </v-card-title>
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
               color="primary"
                v-bind="attrs"
                v-on="on"
                dark
                style="margin-right:40px;"
              >
                Download
              </v-btn>

            </template>
            <v-card>
                  <v-card-title>Select Range</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text >
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
                      disabled
                      @click="dialog = false; Download()"
                    >
                      Download
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        <v-btn class="primary mt-3" disabled @click="DownloadAll()">Download All</v-btn>
        <!-- <v-btn class="primary mt-3" @click="getAllData()">Refresh</v-btn> -->
      </v-card-actions>
      </v-toolbar>
      <div class=" text text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="blue"
          indeterminate
          v-if="!refresh"
        ></v-progress-circular>
      </div>
      <v-card-text class='text'>Total number of readings: {{payload.length}}</v-card-text>
      <v-simple-table
      fixed-header
      >
        <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Timestamp</th>
          <th class="text-left">Reading</th>
        </tr>
        </thead>
        <tbody>
            <tr  v-for="i in tableData" :key="i.timestamp">
              <td class="text font-weight-bold">{{i.timestamp}}</td>
              <td>
                <v-card
                class="d-flex justify-left"
                flat>
                  <v-card
                  flat
                  v-for="(value,index) in i" :key="index"
                  >
                    <v-card-text class="ml-2 text"  v-if="index !=='timestamp'">{{index}}: {{value}}</v-card-text>
                  </v-card>
                </v-card>
                <!-- <v-card
                    flat class="d-flex justify-space-around flatCard"
                    v-for="(value,index) in i" :key="index"
                  >
                    <v-card
                      outlined
                      class="d-flex justify-content-around"
                      tile
                      v-if="index !== 'timestamp'"
                    >
                    <v-card-text>{{index}}: {{value}}</v-card-text>
                    </v-card>
                </v-card> -->
                <!-- <v-col v-for="(value,index) in i" :key="index">
                    <p v-if="index !== 'timestamp'">{{index}}: {{value}}</p>
                  </v-col> -->
              </td>
            </tr>
        </tbody>
        </template>
      </v-simple-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="length"
            total-visible="8"
            circle
          ></v-pagination>
        </div>
    </v-card>
    <br>
    <v-card
    class="Card text">
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
      <!-- <v-card-text class="text" v-if="checkAlert">Threshold:{{alertData[0].event_data.triggerData.triggers[0].conditions[0].value}}</v-card-text> -->
    <v-data-table
        class="text"
        :headers="alertheaders"
        :search="alertsearch"
        :items="alertPayload"
      >
      <template v-slot:item.triggered= "{ item }">
        <div>
          <v-chip
            class="ma-2"
            color="red"
            text-color="white"
            v-if="item.triggered"
          >
          {{!item.triggered}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="success"
            text-color="white"
            v-if="!item.triggered"
          >
          {{!item.triggered}}
          </v-chip>
        </div>
      </template>
      <template  v-slot:item.actions = "{ item }">
          <v-icon
            class="mr-2"
            @click="acknowledge(item)"
            :disabled= "!item.triggered"
          >
            mdi-clipboard-check-outline
          </v-icon>
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
    page: 1,
    dates: [],
    snackbar: false,
    timeout: 5000,
    alertsearch: '',
    date: new Date(),
    headers: [],
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
        text: 'Date',
        value: 'date'
      },
      {
        text: 'Acknowledged',
        value: 'triggered'
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      data: 'data',
      payload: 'payload',
      alertPayload: 'alertPayload',
      alertData: 'alertData',
      refresh: 'refresh',
      payloadHeaders: 'payloadHeaders'
    }),
    tableData () {
      return this.payload.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10)
    },
    length () {
      var length = Math.ceil(this.payload.length / 10)
      return length
    },
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
    checkData () {
      if (this.data.length === 0) {
        return false
      } else {
        return true
      }
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
      // getData: 'getData',
      getAllData: 'getAllData',
      acknowledgeAlert: 'acknowledgeAlert'
    }),
    acknowledge (item) {
      this.acknowledgeAlert(item).then(() => {
        this.snackbar = true
      })
    },
    DownloadAll () {
      var uplink = this.payload
      const result = XLSX.utils.json_to_sheet(uplink)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, result, 'data')
      XLSX.writeFile(wb, 'Download.xlsx')
    },
    Download () {
      var array = []
      var payload = []
      var max = 0
      for (var i in this.dates) {
        // var myDate = this.dates[i]
        // myDate = myDate.split('-')
        // var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0])
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

          }
          data.data.data[i].event_data.payload.forEach(element => {
            obj[element.name] = element.value
            obj.timestamp = date
          })
          payload.push(obj)
        }
      })
        .then(() => {
          const result = XLSX.utils.json_to_sheet(payload)
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, result, 'data')
          XLSX.writeFile(wb, 'Download.xlsx')
        })
    }
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
/* tr:hover{
  box-shadow: 0px 1px 5px;
} */
.text{
  color:rgba(0,14,84);
}
</style>

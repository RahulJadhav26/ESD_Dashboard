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
        <subscript v-if="checkAlert">Threshold:{{alertData[0].event_data.triggerData.triggers[0].conditions[0].value}}</subscript>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="alertsearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
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
import { mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    search: '',
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
    })
  }
}
</script>

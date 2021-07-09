<template>
<div>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    search: '',
    headers: [
      {
        text: 'Event type',
        align: 'start',
        value: 'event_type'
      }
    ]
  }),
  created () {
    this.getData().then(() => {
    })
  },
  computed: {
    ...mapGetters({
      data: 'data'
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData'
    })
  }
}
</script>

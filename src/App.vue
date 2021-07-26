<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <v-toolbar-title class="font-weight-bold text-lg"><h1>CENT</h1></v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

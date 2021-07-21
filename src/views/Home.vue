<template>
<div>
  <h1 class="text-center" style="text-decoration:underline;">DASHBOARD</h1>
  <div>

  </div>
  <div>
  <Table/>
  </div>
</div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
  name: 'Home',

  components: {
    Table: Table
  }
}
</script>

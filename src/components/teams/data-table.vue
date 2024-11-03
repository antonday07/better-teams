<template lang="">
  <div>
    <DataTable
      :value="props.teams"
      showGridlines
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      tableStyle="min-width: 50rem"
    >
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="owner" header="Owner"></Column>
      <Column field="members" header="Members"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional

const props = defineProps<{
  teams?: Object
}>()
</script>
<style lang=""></style>

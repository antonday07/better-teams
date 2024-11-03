<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '@/components/teams/data-table.vue'
import InputText from 'primevue/inputtext'

const text = ref('')
let teams = ref([])

onMounted(() => {
  teams = [
    {
      name: 'Lighthouse',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Captain',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Island',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Horizon',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Island',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Horizon',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Island',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    },
    {
      name: 'Horizon',
      description: 'Lighthouse special',
      owner: 'Adam',
      members: 'Linh, Duy, Chien'
    }
  ]
})
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Welcome teams !</h1>
      <p>Here is a list of team for this month</p>
    </div>
    <div class="user-nav"></div>
    <div class="data-table">
      <DataTable :teams="teams" />
    </div>
  </div>
</template>
<style lang="css" scoped>
.data-table {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiData = ref(null)
const loading = ref(true)

const fetchData = async () => {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + '/api/demo'
    )
    apiData.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <q-page padding>
    <h4>Backend API Demo</h4>
    <div v-if="loading">Loading...</div>
    <pre v-else>{{ apiData }}</pre>
  </q-page>
</template>

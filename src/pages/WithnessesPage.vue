<template>
  <q-page class="flex flex-center">
    <WitnessesDataComponent/>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const WitnessesDataComponent = defineAsyncComponent(()=>import("../components/WitnessesData.vue"));

// Flag to toggle edit mode

// Add Signer - Clears the current signer and prepares for new data


</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 20px auto;
}
</style>

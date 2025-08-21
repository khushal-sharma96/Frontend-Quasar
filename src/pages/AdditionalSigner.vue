<template>
  <q-page class="flex flex-center">
    <AdditionalSignerDataComponent/>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const AdditionalSignerDataComponent = defineAsyncComponent(()=>import("../components/AdditionalSignerData.vue"));

// Flag to toggle edit mode

// Add Signer - Clears the current signer and prepares for new data


</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 20px auto;
}
</style>

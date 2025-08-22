<template>
  <q-page class="flex flex-center">
    <SignerDataComponent :signer="signer"/>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const SignerDataComponent = defineAsyncComponent(()=>import("../components/SignerData.vue"));
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 20px auto;
}
</style>

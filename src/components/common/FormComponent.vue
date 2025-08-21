<template>
  <q-card flat class="q-pa-md" style="max-width: 500px; width: 100%;">
    <q-form @submit="handleSubmit" ref="formRef" :disable-submit="!isFormValid">
      <q-card-section>
        <div v-for="(input, index) in inputFields" :key="index" class="q-mb-md">
          <small>{{ input.label }}</small>
          <q-select v-if="input.type === 'select'" :label="input.label" v-model="formData[input.name]"
            :options="input.options" :rules="input.rules" outlined dense />
          <q-input v-else-if="input.type != 'radio' || input.type != 'checkbox'" v-model="formData[input.name]"
            :rules="input.rules" :type="input.type" outlined dense />
          </div>
          <slot></slot>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Props
const props = defineProps({
  inputs: {
    type: Array,
    required: true
  },
  showExistingValue: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(["submitForm"]);
const inputFields = ref(props.inputs);

// Reactive form data
const formData = ref({});

// A reference for the form validation
const formRef = ref(null);

// Compute the form validity
const isFormValid = ref(true);

// Handle form submission
const handleSubmit = async () => {
  // Validate form
  const isValid = await formRef.value.validate();
  if (isValid) {
    emit("submitForm", formData.value)
    // Perform action after successful form submission (e.g., API call)
  }
};

const setExistingValues = (inputData) => {

  if (inputData) {
    formData.value = inputData;
  }
}

defineExpose({
    setExistingValues
});
</script>

<style scoped>
.q-card {
  max-width: 500px;
  width: 100%;
}

small {
  font-size: 13px;
  font-weight: bold;
  color: #6a6a6a;
}
</style>

<template>
    <q-dialog class="my-card" v-model="isModalOpen" backdrop-filter="blur(4px) saturate(150%)">
        <q-card class="my-card" flat>
            <q-card-section class="row justify-between">
                <div class="text-h6">{{ ModalTitle }}</div>
                <q-btn flat round dense icon="close" @click="isModalOpen = false" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <slot />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from "vue";

// Modal title prop
const { ModalTitle } = defineProps({
    ModalTitle: {
        type: String,
        default: "Title"
    }
});

// Modal visibility state
const isModalOpen = ref(false);
defineExpose({
    isModalOpen
});
</script>
<style scoped>
.my-card{
    width: 100%;
    max-width: 350px;
}
</style>
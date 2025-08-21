<template>
    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="help" color="primary" text-color="white" />
                <span class="q-ml-sm">{{ ModalBody }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat :label="BtnLabel" color="primary" @click="()=>{
                    confirm = false;
                    $emit('click-confirm')
                }" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref, defineProps, defineExpose } from "vue";
const { ModalBody, BtnLabel } = defineProps({
    ModalBody: {
        type: String,
        default: "body"
    },
    BtnLabel: {
        type: String,
        default: "Delete"
    }
});
const confirm = ref();
const openConfirm = () => {
    confirm.value = true;
}
defineExpose({
    openConfirm
});
</script>
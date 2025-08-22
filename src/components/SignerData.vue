<template>
    <q-card class="q-pa-md" style="width: 100%;">
        <q-card-section class="row justify-between items-center">
            <div class="text-h6">Signer Information</div>
            <q-card-actions align="right">
                <q-btn flat round color="blue" :icon="signer ? 'edit' : 'add'" @click="openActionForm()" />
            </q-card-actions>
        </q-card-section>
        <div class="q-gutter-md">
            <div v-if="signer">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section><b>Name</b>{{ signer.fullName }}</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section><b>Email</b>{{ signer.email }}</q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div v-else>
                <p class="text-h6 text-center text-red">No Signer Added Yet!</p>
            </div>
        </div>
    </q-card>
    <ModalComponent ref="modalComponent" :ModalTitle="signer ? 'Edit Signer Details' : 'Add Signer Details'">
        <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm" />
    </ModalComponent>
</template>
<script setup>
import { ref, defineAsyncComponent, onMounted, inject } from 'vue';
const ModalComponent = defineAsyncComponent(() => import("../components/common/ModalComponent.vue"));
const FormComponent = defineAsyncComponent(() => import("../components/common/FormComponent.vue"));

const signer = ref();
const formComponent = ref();
const inputList = ref([
    {
        label: "Full Name",
        name: "fullName",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Name is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid name!'
        ],
        value: signer.value?.fullName,
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        rules: [val => val && val.length > 0 || 'Email is mandatory!', val => /.+@.+\..+/.test(val) || 'Email must be valid!'],
        value: signer.value?.email,
    },
]);
const $http = inject("$http")

const modalComponent = ref();

const openActionForm = () => {
    modalComponent.value.isModalOpen = true;
    if (signer.value)
        setTimeout(() => {
            formComponent.value.setExistingValues(signer.value);
        }, 500);
}

const submitForm = async (formData) => {
    modalComponent.value.isModalOpen = false;
    if (signer.value) {
        await $http.put(`/signer/edit/${signer.value.session_id}`, formData);
    }
    else {
        await $http.post(`/signer/add`, formData);
    }
    signer.value = formData;
}
onMounted(async () => {
    const response = await $http.get("/signer");
    if (response?.signer) {
        signer.value = {
            ...response?.signer,
            session_id: response?.session_id,
        };
    }
})
</script>
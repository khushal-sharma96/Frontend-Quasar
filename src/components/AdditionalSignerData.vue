<template>
    <div class="q-pa-md" v-if="additionalSigners && additionalSigners.length">
        <TableComponent title="Additional Signers Data" :tableData="additionalSigners" :columns="columns" row-key="name"
            showDeleteAction="1" showEditAction="1" showAddAction="1" @click-add="openModal()"
            @click-edit="openModal" @delete-record="deleteRecord" />
    </div>
    <div v-else class="text-center">
        <span class="text-red text-h6">{{ session?._id ? "No additional Signer is added yet!" :
            "Please set the signer first to add the additional-signers!" }} </span> <br>
        <q-btn @click="openModal()" v-if="session?._id" color="primary">Add</q-btn>
    </div>
    <ModalComponent ref="modalComponent" :ModalTitle="modalTitle">
        <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm" />
    </ModalComponent>
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref, inject } from 'vue';

const TableComponent = defineAsyncComponent(() => import("./common/TableComponent.vue"));
const ModalComponent = defineAsyncComponent(() => import("../components/common/ModalComponent.vue"));
const FormComponent = defineAsyncComponent(() => import("../components/common/FormComponent.vue"));
const formComponent = ref();
const modalComponent = ref();
const modalTitle = ref();
const $http = inject("$http")
const session = ref();
const additionalSigners = ref();

const inputList = ref([
    {
        label: "Full Name",
        name: "fullName",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Full Name is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid Full name!'
        ],
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        rules: [val => val && val.length > 0 || 'Email is mandatory!', val => /.+@.+\..+/.test(val) || 'Email must be valid!'],
    },
]);

const openModal = (data) => {
    modalComponent.value.isModalOpen = true;
    modalTitle.value = (data ? "Edit" : "Add") + " Additional Signer User"
    let index = -1;
    if (data)
        index = additionalSigners.value.findIndex((record) => (record.email == data.email));
    setTimeout(() => {
        formComponent.value.setExistingValues({ ...data, index });
    }, 500);
}


const submitForm = async (formData) => {
    modalComponent.value.isModalOpen = false;
    if (modalTitle.value.includes("Edit")) {
        await $http.put(`/additional-signer/edit/${session.value._id}`, formData);
        getAdditionSigners();
    }
    else {
        formData = await $http.post(`/additional-signer/add/${session.value._id}`, formData);
        additionalSigners.value = (formData?.session?.additionalSigners);
    }
}

const columns = [
    {
        name: 'fullName',
        required: true,
        label: 'Full Name',
        align: 'left',
        sortable: true,
        field: 'fullName'
    },
    { name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
    { name: 'action', align: 'center', label: 'Action', },

]

const getAdditionSigners = async () => {
    // Although we can use the pinia store to store the signer data and only get the additional signers.....
    let response = await $http.get("/signer");
    if (response?.signer) {
        session.value = response;
        additionalSigners.value = response?.additionalSigners;
    }
}

const deleteRecord = async(data)=>{
    await $http.delete(`/additional-signer/${session.value._id}/${data?._id}`);
    additionalSigners.value.splice(additionalSigners.value.findIndex((r)=>r._id==data?._id),1)
}

onMounted(() => {
    getAdditionSigners();
})
</script>
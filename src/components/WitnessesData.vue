<template>
    <div class="q-pa-md" v-if="witnesses && witnesses.length">
        <TableComponent title="Witnesses Data" :tableData="witnesses" :columns="columns" row-key="name"
            showDeleteAction="1" showEditAction="1" showAddAction="1" @click-add="openModal()"
            @click-edit="openModal" @delete-record="deleteRecord" />
    </div>
    <div v-else class="text-center">
        <span class="text-red text-h6">{{ session?._id ? "No Witness is added yet!" :
            "Please set the signer first to add the witnesss!" }} </span> <br>
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
const witnesses = ref();
const session = ref();

const inputList = ref([
    {
        label: "Email",
        type: "email",
        name: "email",
        rules: [val => val && val.length > 0 || 'Email is mandatory!', val => /.+@.+\..+/.test(val) || 'Email must be valid!'],
    },
    {
        label: "Full Name",
        name: "fullName",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Full Name is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid full name!'
        ],
    },
    {
        label: "Zip Code",
        name: "zip",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Zip is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid zip code!'
        ],
    },
    {
        label: "Address",
        name: "address",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Address is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid address!'
        ],
    },
    {
        label: "State",
        name: "state",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'State is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid state!'
        ],
    }
]);

const openModal = (data) => {
    modalComponent.value.isModalOpen = true;
    modalTitle.value = (data ? "Edit" : "Add") + " Additional Signer User"
    let index = -1;
    if (data)
        index = witnesses.value.findIndex((record) => (record.email == data.email));
    setTimeout(() => {
        formComponent.value.setExistingValues({ ...data, index });
    }, 500);
}


const submitForm = async (formData) => {
    modalComponent.value.isModalOpen = false;
    if (modalTitle.value.includes("Edit")) {
        await $http.put(`/witness/edit/${session.value._id}`, formData);
        getAdditionSigners();
    }
    else {
        formData = await $http.post(`/witness/add/${session.value._id}`, formData);
        witnesses.value = (formData?.session?.witnesses);
    }
}

const columns = [
    {
        name: 'fullName',
        required: true,
        label: 'Full Name',
        align: 'left',
        sortable: true,
        field: 'name'
    },
    { name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
    { name: 'zip', align: 'center', label: 'Zipcode', field: 'calories', sortable: true },
    { name: 'address', align: 'center', label: 'Address', field: 'calories', sortable: true },
    { name: 'state', align: 'center', label: 'State', field: 'calories', sortable: true },
    { name: 'action', align: 'center', label: 'Action', },

]


const getAdditionSigners = async () => {
    // Although we can use the pinia store to store the signer data and only get the additional signers.....
    let response = await $http.get("/signer");
    if (response?.signer) {
        session.value = response;
        witnesses.value = response?.witnesses;
    }
}

const deleteRecord = async(data)=>{
    await $http.delete(`/witness/${session.value._id}/${data?._id}`);
    witnesses.value.splice(witnesses.value.findIndex((r)=>r._id==data?._id),1)
}

onMounted(() => {
    getAdditionSigners();
})
</script>
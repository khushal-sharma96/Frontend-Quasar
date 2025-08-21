<template>
    <div class="q-pa-md">
        <TableComponent title="Witnesses Data" :tableData="additionalSigners" :columns="columns" row-key="name"
            showDeleteAction="1" showEditAction="1" showAddAction="1" @click-add="openModal()"
            @click-edit="openModal" />
    </div>
    <ModalComponent ref="modalComponent" :ModalTitle="modalTitle">
        <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm" />
    </ModalComponent>
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';

const TableComponent = defineAsyncComponent(() => import("./common/TableComponent.vue"));
const ModalComponent = defineAsyncComponent(() => import("../components/common/ModalComponent.vue"));
const FormComponent = defineAsyncComponent(() => import("../components/common/FormComponent.vue"));
const formComponent = ref();
const modalComponent = ref();
const modalTitle = ref();

const additionalSigners = ref();

const inputList = ref([
    {
        label: "Email",
        type: "email",
        name: "email",
        rules: [val => val && val.length > 0 || 'Email is mandatory!', val => /.+@.+\..+/.test(val) || 'Email must be valid!'],
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Name is mandatory!',
            val => val && val.length >= 3 || 'Enter the Valid name!'
        ],
    },
    {
        label: "Zip Code",
        name: "zip_code",
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
        index = additionalSigners.value.findIndex((record) => (record.email == data.email));
    setTimeout(() => {
        formComponent.value.setExistingValues({ ...data, index });
    }, 500);
}


const addUser = (user) => {
    // Integrate add additional user api 
    console.log("User Added!", user);
}
const editUser = (user) => {
    // Integrate add additional user api 
    console.log("User Added!", user);
}

const submitForm = (formData) => {
    modalComponent.value.isModalOpen = false;
    if (modalTitle.value.includes("Edit")) {
        additionalSigners.value[formData.index] = (formData);
        addUser(formData);
    }
    else {
        additionalSigners.value.push(formData);
        editUser(formData);
    }
}

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Full Name',
        align: 'left',
        sortable: true,
        field: 'name'
    },
    { name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
    { name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
    { name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
    { name: 'action', align: 'center', label: 'Action', },

]

onMounted(() => {
    additionalSigners.value = [
        {
            email: "Frozen@yopmail.com",
            name: 'Froze',

        },
        {
            name: 'Adward',
            email: "adward@yopmail.com",

        },
    ]
})
</script>
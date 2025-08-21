<template>
    <div class="q-pa-md">
        <TableComponent title="Observers Data" :tableData="additionalSigners" :columns="columns" row-key="name"
            showDeleteAction="1" showEditAction="1" showAddAction="1" @click-add="openModal()"
            @click-edit="openModal" />
    </div>
    <ModalComponent ref="modalComponent" :ModalTitle="modalTitle">
        <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm">
            <div class="q-gutter-sm">
                <q-radio v-model="roleInput.role" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="admin"
                    label="Admin" />
                <q-radio v-model="roleInput.role" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                    val="translator" label="Translator" />
                <q-radio v-model="roleInput.role" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                    val="other" label="Other" />
                <q-input v-if="roleInput.role == 'other'" v-model="roleInputotherValue" :rules="[
                    val => val && val.length > 0 || 'Role is mandatory!',
                    val => val && val.length >= 3 || 'Enter the valid role!'
                ]" outlined dense />
            </div>
        </FormComponent>
    </ModalComponent>
</template>
<script setup>
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
const roleInput = reactive({
    role: "admin",
    otherValue: ""
});
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
        label: "Phone",
        name: "phone",
        type: "text",
        rules: [
            val => val && val.length > 0 || 'Phone Number is mandatory!',
            val => val && val.length >= 3 || 'Enter the valid phone number!'
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
        roleInput.value = {
            role:data.role,
            otherValue:data.otherValue,
        };
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
    formData = {...formData,...roleInput.value}
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
    { name: 'phone', align: 'center', label: 'Phone Number', field: 'calories', sortable: true },
    { name: 'role', align: 'center', label: 'Role', field: 'calories', sortable: true },
    { name: 'action', align: 'center', label: 'Action', },

]

onMounted(() => {
    additionalSigners.value = [
        {
            email: "Frozen@yopmail.com",
            name: 'Froze',
            phone: "8787878787",
            role: "admin"
        },
        {
            name: 'Adward',
            email: "adward@yopmail.com",
            phone: "8787878787",
            role: "admin"
        },
    ]
})
</script>
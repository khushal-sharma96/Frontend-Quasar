<template>
    <div class="q-pa-md">
        <TableComponent title="Additional Signers Data" :tableData="additionalSigners" :columns="columns"
            row-key="name" showDeleteAction="1" showEditAction="1" />
    </div>
    <!-- <ModalComponent ref="modalComponent" :ModalTitle="signer ? 'Edit Signer Details' : 'Add Signer Details'">
        <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm" />
    </ModalComponent> -->
</template>
<script setup>
import { defineAsyncComponent, onMounted,ref } from 'vue';

const TableComponent = defineAsyncComponent(() => import("./common/TableComponent.vue"));
// import { ref, defineAsyncComponent } from 'vue';
// const ModalComponent = defineAsyncComponent(() => import("../components/common/ModalComponent.vue"));
// const FormComponent = defineAsyncComponent(() => import("../components/common/FormComponent.vue"));
// const signer = ref();
// const formComponent = ref();
// const inputList = ref([
//     {
//         label: "Name",
//         name: "name",
//         type: "text",
//         rules: [
//             val => val && val.length > 0 || 'Name is mandatory!',
//             val => val && val.length >= 3 || 'Enter the Valid name!'
//         ],
//         value: signer.value?.name,
//     },
//     {
//         label: "Email",
//         type: "email",
//         name: "email",
//         rules: [val => val && val.length > 0 || 'Email is mandatory!', val => /.+@.+\..+/.test(val) || 'Email must be valid!'],
//         value: signer.value?.email,
//     },
// ]);
// const modalComponent = ref();

// const openActionForm = () => {
//     modalComponent.value.isModalOpen = true;
//     if (signer.value)
//         setTimeout(() => {
//             formComponent.value.setExistingValues(signer.value);
//         }, 500);
// }

// const submitForm = (formData) => {
//     modalComponent.value.isModalOpen = false;
//     signer.value = formData;
// }

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
    { name: 'action', align: 'center', label: 'Action',},
    
]

const additionalSigners = ref();
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
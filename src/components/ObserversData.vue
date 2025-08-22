<template>
  <div class="q-pa-md" v-if="observers && observers.length">
    <TableComponent
      title="Observers Data"
      :tableData="observers"
      :columns="columns"
      row-key="email"
      :showDeleteAction="true"
      :showEditAction="true"
      :showAddAction="true"
      @click-add="openModal"
      @click-edit="openModal"
      @delete-record="deleteRecord"
    />
  </div>

  <div v-else class="text-center">
    <span class="text-red text-h6">
      {{ session?._id ? "No Observer is added yet!" : "Please set the signer first to add the Observers!" }}
    </span>
    <br />
    <q-btn @click="openModal()" v-if="session?._id" color="primary">Add</q-btn>
  </div>

  <ModalComponent ref="modalComponent" :ModalTitle="modalTitle">
    <FormComponent ref="formComponent" :inputs="inputList" @submitForm="submitForm">
      <div class="q-gutter-sm">
        <q-radio v-model="role" val="admin" label="Admin" />
        <q-radio v-model="role" val="translator" label="Translator" />
        <q-radio v-model="role" val="other" label="Other" />

        <q-input
          v-if="role === 'other'"
          v-model="otherRole"
          label="Other Role"
          outlined
          dense
          :rules="[
            val => !!val || 'Role is mandatory!',
            val => val.length >= 3 || 'Enter a valid role!'
          ]"
        />
      </div>
    </FormComponent>
  </ModalComponent>
</template>

<script setup>
import { defineAsyncComponent, ref, inject, onMounted } from 'vue'

const TableComponent = defineAsyncComponent(() => import("./common/TableComponent.vue"))
const ModalComponent = defineAsyncComponent(() => import("../components/common/ModalComponent.vue"))
const FormComponent = defineAsyncComponent(() => import("../components/common/FormComponent.vue"))

const modalComponent = ref()
const formComponent = ref()
const modalTitle = ref("")
const session = ref(null)
const observers = ref([])
const role = ref("admin")
const otherRole = ref("")

const $http = inject("$http")

const inputList = ref([
  {
    label: "Email",
    name: "email",
    type: "email",
    rules: [
      val => !!val || 'Email is mandatory!',
      val => /.+@.+\..+/.test(val) || 'Invalid email format.'
    ]
  },
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    rules: [
      val => !!val || 'Name is mandatory!',
      val => val.length >= 3 || 'Enter a valid name!'
    ]
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    rules: [
      val => !!val || 'Phone number is mandatory!',
      val => val.length >= 10 || 'Enter a valid phone number!'
    ]
  }
])

const columns = [
  { name: 'fullName', label: 'Full Name', field: 'fullName', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'center', sortable: true },
  { name: 'phone', label: 'Phone Number', field: 'phone', align: 'center', sortable: true },
  { name: 'role', label: 'Role', field: 'role', align: 'center', sortable: true },
  { name: 'action', label: 'Action', field: 'action', align: 'center' }
]

const openModal = (data = null) => {
  modalTitle.value = (data ? "Edit" : "Add") + " Observer"
  modalComponent.value.isModalOpen = true

  let index = -1
  if (data) {
    index = observers.value.findIndex(r => r.email === data.email)
    role.value = data.role
    otherRole.value = data.otherRole || ""
  } else {
    role.value = "admin"
    otherRole.value = ""
  }

  setTimeout(() => {
    formComponent.value.setExistingValues({ ...data, index })
  }, 100)
}

const submitForm = async (formData) => {
  formData.role = role.value
  formData.otherRole = role.value === 'other' ? otherRole.value : null

  if (modalTitle.value.includes("Edit")) {
    await $http.put(`/observer/edit/${session.value._id}`, formData)
    await getObservers()
  } else {
    const res = await $http.post(`/observer/add/${session.value._id}`, formData)
    observers.value = res?.session?.observers || []
  }

  modalComponent.value.isModalOpen = false
}

const deleteRecord = async (data) => {
  await $http.delete(`/observer/${session.value._id}/${data?._id}`)
  observers.value = observers.value.filter(r => r._id !== data._id)
}

const getObservers = async () => {
  const response = await $http.get("/signer")
  if (response?.signer) {
    session.value = response
    observers.value = response.observers || []
  }
}

onMounted(() => {
  getObservers()
})
</script>

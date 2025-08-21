<template>
    <div class="q-pa-md">
        <q-table :title="title" :rows="componentProps.tableData" :columns="componentProps.columns" row-key="name">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-for="eachColumn in componentProps.columns" :key="eachColumn.name" :props="props">
                        <!-- If action column  -->
                        <template
                            v-if="eachColumn.name === 'action' && (componentProps.showEditAction || componentProps.showDeleteAction)">
                            {{  }}
                            <q-btn v-if="componentProps.showEditAction == 1" flat round color="blue" icon="edit"
                                @click="openActionForm(props.row, 'edit')" />
                            <q-btn v-if="componentProps.showDeleteAction == 1" flat round color="red" icon="delete"
                                @click="openActionForm(props.row, 'delete')" />
                        </template>

                        <!-- else show value from the row -->
                        <template v-else>
                            {{ props.row[eachColumn.name] }}
                        </template>
                    </q-td>
                </q-tr>
            </template>

        </q-table>
    </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const componentProps = defineProps({
    tableData: {
        required: true,
        type: Array
    },
    columns: {
        required: true,
        type: Array
    },
    title: {
        type: String,
        default: "Specify Title"
    },
    showDeleteAction: {
        type: Number,
        default: 0
    },
    showEditAction: {
        type: Number,
        default: 0
    },
})

onMounted(() => {
    // console.log(props);
})
const openActionForm = (data, type) => {
    console.log(data, type);
}
</script>

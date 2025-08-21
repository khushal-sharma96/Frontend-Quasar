<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> {{ appName }} </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
const appName = ref(process.env.VUE_APP_NAME);
const linksList = [
  {
    title: 'Signer Details',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/',
  },
  {
    title: 'Additional Signer',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: '/additional-signer/details',
  },
  {
    title: 'Witnesses',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '/witnesses/details',
  },
  {
    title: 'Observers ',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/observers/details',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
console.log(appName.value);
</script>

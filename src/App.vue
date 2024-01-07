<template>
  <SiteNavigation />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from "./components/SiteNavigation.vue"
</script>

<style>
body {
  height: 100%;
  margin: 0px;
  background-color: #fafafa;
}

* {
  font-family: "Rubik", sans-serif;
}
</style>

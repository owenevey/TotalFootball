<template>
  <SiteNavigation />
  <RouterView />
  <BottomNav />
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from "./components/SiteNavigation.vue"
import BottomNav from './components/BottomNav.vue';
</script>

<style>
body {
  height: 100%;
  margin: 0px;
  background-color: #fafafa;
}

* {
  font-family: "Jost", sans-serif;
}

@media (max-width: 1000px) {
  body {
    margin-bottom: 5rem;
  }
}
</style>

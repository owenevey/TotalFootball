<template>
  <SiteNavigation />
  <RouterView />
  <BottomNav />
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/Navigation/SiteNavigation.vue";
import BottomNav from "./components/Navigation/BottomNav.vue";
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

@media (max-width: 900px) {
  body {
    margin-bottom: 4rem;
  }
}
</style>

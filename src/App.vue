<template>
  <SiteNavigation />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/Common/SiteNavigation.vue";
</script>

<style>
body {
  height: 100%;
  margin: 0px;
  margin-top: 6rem;
  background-color: #fafafa;
}

* {
  font-family: "Jost", sans-serif;
}

@media (max-width: 950px) {
  body {
    margin-bottom: 4rem;
    margin-top: 5rem;
  }
}
</style>

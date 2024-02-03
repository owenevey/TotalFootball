<template>
  <Suspense>
    <NewsPageAsync />
    <template #fallback>
      <div>loading!</div>>
    </template>
  </Suspense>
  <BottomNav />
</template>

<script setup>
import NewsPageAsync from "../components/News/NewsPageAsync.vue";
import BottomNav from "../components/Navigation/BottomNav.vue";
</script>

<style scoped>
</style>

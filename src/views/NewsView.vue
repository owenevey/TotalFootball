<template>
  <Suspense>
    <NewsPageAsync />
    <template #fallback>
      <NewsPageFallbackVue />
    </template>
  </Suspense>
  <BottomNav />
</template>

<script setup>
import NewsPageAsync from "../components/News/NewsPageAsync.vue";
import NewsPageFallbackVue from "../components/News/NewsPageFallback.vue";
import BottomNav from "../components/Common/BottomNav.vue";
</script>

<style scoped></style>

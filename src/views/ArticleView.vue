<template>
  <Suspense>
    <ArticlePageAsync />
    <template #fallback>
      <ArticlePageFallback />
    </template>
  </Suspense>
  <BottomNav />
</template>

<script setup>
import ArticlePageAsync from "../components/Article/ArticlePageAsync.vue";
import ArticlePageFallback from "../components/Article/ArticlePageFallback.vue";
import BottomNav from "../components/Common/BottomNav.vue";
</script>

<style scoped>
</style>

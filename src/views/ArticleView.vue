<template>
  <Suspense>
    <ArticlePageAsync />
    <template #fallback>
      <div>loading!</div>>
    </template>
  </Suspense>
  <BottomNav />
</template>

<script setup>
import ArticlePageAsync from "../components/Article/ArticlePageAsync.vue";
import BottomNav from "../components/Navigation/BottomNav.vue";
</script>

<style scoped>
</style>

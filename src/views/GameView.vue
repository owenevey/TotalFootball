<template>
  <main>
    <Suspense>
      <GamePageAsync />
      <template #fallback>
        <GamePageFallback />
      </template>
    </Suspense>
    <BottomNav />
  </main>
</template>

<script setup>
import GamePageAsync from "../components/Game/GamePageAsync.vue";
import GamePageFallback from "../components/Game/GamePageFallback.vue";
import BottomNav from "../components/BottomNav.vue";
</script>

<style scoped>
main {
  margin: 1rem;
}
</style>

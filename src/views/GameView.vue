<template>
    <Suspense>
      <GamePageAsync />
      <template #fallback>
        <GamePageFallback />
      </template>
    </Suspense>
    <BottomNav />
</template>

<script setup>
import GamePageAsync from "../components/Game/GamePageAsync.vue";
import GamePageFallback from "../components/Game/GamePageFallback.vue";
import BottomNav from "../components/BottomNav.vue";
</script>

<style scoped>
</style>

<template>
    <Suspense>
      <GamePageAsync />
      <template #fallback>
        <LoadingScreen />
      </template>
    </Suspense>
    <BottomNav />
</template>

<script setup>
import GamePageAsync from "../components/Game/GamePageAsync.vue";
import LoadingScreen from "../components/Common/LoadingScreen.vue";
import BottomNav from "../components/Common/BottomNav.vue";
</script>

<style scoped>
</style>

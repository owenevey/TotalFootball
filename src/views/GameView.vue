<template>
  <div id="slidingDiv">
    <header id="apiHeader">API limit exceeded, example data shown</header>
    <main>
      <Suspense>
        <GamePageAsync @passApiError="showApiLimitHeader" />
        <template #fallback>
          <LoadingScreen />
        </template>
      </Suspense>
    </main>
  </div>
  <BottomNav />
</template>

<script setup>
import GamePageAsync from "../components/Game/GamePageAsync.vue";
import LoadingScreen from "../components/Common/LoadingScreen.vue";
import BottomNav from "../components/Common/BottomNav.vue";

function showApiLimitHeader() {
  document.getElementById("slidingDiv").style.marginTop = "-1rem";
  document.getElementById("apiHeader").style.background = "#ffca53";
  document.getElementById("apiHeader").style.color = "#7a5200";
}
</script>

<style scoped>
#apiHeader {
  height: 3rem;
  width: 100%;
  background-color: #ffca53;
  color: #7a5200;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
}

#slidingDiv {
  margin-top: -4rem;
  transition: 1s;
}
</style>

<template>
  <div id="bottomNav">
    <div class="navItemContainer">
      <RouterLink :to="{ name: 'leagues' }" class="navItem" :style="route.name === 'leagues' ? { color: 'black' } : { color: 'gray' }">
        <span class="material-symbols-outlined"> trophy </span>
        <p class="navText">Leagues</p>
      </RouterLink>
    </div>
    <div class="navItemContainer">
      <RouterLink :to="{ name: 'home' }" class="navItem" :style="route.name === 'home' ? { color: 'black' } : { color: 'gray' }">
        <span class="material-symbols-outlined"> sports_and_outdoors </span>
        <p class="navText">Games</p>
      </RouterLink>
    </div>
    <div class="navItemContainer">
      <RouterLink :to="{ name: 'news' }" class="navItem" :style="route.name === 'news' ? { color: 'black' } : { color: 'gray' }">
        <span class="material-symbols-outlined"> newsmode </span>
        <p class="navText">News</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<style scoped>
#bottomNav {
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  box-shadow: 0px -1px 11px -1px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  display: none;
  z-index: 3;
}

.navItemContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.navText {
  margin: 0rem;
}

@media (max-width: 950px) {
  #bottomNav {
    display: flex;
    z-index: 1;
  }
}
</style>

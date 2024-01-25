<template>
  <main>
    <div id="newsGridContainer">
      <HomeNewsItem
        v-for="i in 20"
        class="gridItem"
        title="Newcastle thumps PSG in Group of Death Matchup"
        imageName="newcastle.jpg"
        @click="selectArticle()"
      />
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import HomeNewsItem from "../components/Home/HomeNewsItem.vue";
import BottomNav from "../components/Navigation/BottomNav.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const selectArticle = () => {
  router.push({
    name: "article",
    params: { id: 2 },
  });
};
</script>

<style scoped>
#newsGridContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  max-width: 80rem;
  margin: auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;
  padding: 1rem;
  box-sizing: border-box;
}

.gridItem {
  width: 100%;
}

main {
  margin: 1rem;
}

@media (max-width: 1200px) {
  #newsGridContainer {
    grid-template-columns: auto auto auto;
  }
}

@media (max-width: 750px) {
  #newsGridContainer {
    grid-template-columns: auto auto;
  }
}

@media (max-width: 500px) {
  #newsGridContainer {
    grid-template-columns: auto;
  }
}

@media (max-width: 800px) {
  main {
    margin: 1rem 0;
  }
}
</style>

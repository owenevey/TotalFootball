<template>
  <main>
    <div id="newsContainer">
      <h1 id="newsTitle">News</h1>
      <NewsTopStory
        class="topStory"
        title="Newcastle thumps PSG in Group of Death Matchup"
        imageName="newcastle.jpg"
        @click="selectArticle()"
      />
      <div id="newsGridContainer">
        <NewsItem
          v-for="i in 20"
          class="gridItem"
          title="Newcastle thumps PSG in Group of Death Matchup"
          imageName="newcastle.jpg"
          @click="selectArticle()"
        />
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import NewsTopStory from "../components/News/NewsTopStory.vue";
import NewsItem from "../components/News/NewsItem.vue";
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
#newsTitle {
  margin: 0;
}

#newsContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  max-width: 80rem;
  margin: auto;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#newsGridContainer {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;
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

  .topStory {
    display: none;
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

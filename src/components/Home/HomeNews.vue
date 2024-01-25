<template>
  <div id="newsContainer">
    <h3 id="newsTitle">News</h3>
    <div id="newsItemsContainer">
      <HomeNewsItem
        v-for="(file, title) in articles"
        :title="title"
        :imageName="file"
        @click="selectArticle()"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import HomeNewsItem from "./HomeNewsItem.vue";

const router = useRouter();

const selectArticle = () => {
  router.push({
    name: "article",
    params: { id: 2 },
  });
};

const articles = {
  "Ronaldo Scores Hat Trick in Portugal win vs Uruguay": "ronaldo.jpg",
  "Pochettino has Chelsea in top form": "poch.jpg",
  "Real madrid 2 - Barcelona 1: Highlights": "el_clasico.jpg",
  "Newcastle thumps PSG in Group of Death Matchup": "newcastle.jpg",
};
</script>

<style scoped>
#newsContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  height: fit-content;
}

#newsTitle {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0px;
}

#newsItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 0rem 1rem 1rem 1rem;
}

#newsItemsContainer > * {
  margin: 0;
}
</style>

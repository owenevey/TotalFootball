<template>
  <div id="newsContainer">
    <h3 id="newsTitle">News</h3>
    <div id="newsItemsContainer">
      <NewsItem
        v-for="(file, title) in articles"
        :title="title"
        :imageName="file"
      />
    </div>
  </div>
</template>

<script setup>
import NewsItem from "./NewsItem.vue";

const articles = {
  "Ronaldo Scores Hat Trick in Portugal win vs Uruguay": "ronaldo.jpg",
  "Pochettino has Chelsea in top form": "poch.jpg",
  "Real madrid 2 - Barcelona 1: Highlights": "el_clasico.jpg",
  "Newcastle thumps PSG in Group of Death Matchup": "newcastle.jpg",
};
</script>
<style scoped>
#newsTitle {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0px;
}

#newsContainer {
  border-radius: 15px;
  background-color: #ffffff;
  height: fit-content;
}

#newsItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem 1rem 1rem 1rem;
}

#newsItemsContainer > * {
  margin: 0.5rem;
}
</style>

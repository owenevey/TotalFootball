<template>
  <div id="newsContainer">
    <h3 id="newsTitle">News</h3>
    <div id="newsItemsContainer">
        <NewsItemFallback />
        <NewsItemFallback />
        <NewsItemFallback />
        <NewsItemFallback />
    </div>
  </div>
</template>

<script setup>
import NewsItemFallback from '../News/NewsItemFallback.vue';
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
</style>

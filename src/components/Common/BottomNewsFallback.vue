<template>
    <div id="newsContainer">
        <h3 id="newsTitle">News</h3>
        <div id="newsGridContainer">
          <NewsItemFallback v-for="i in 4" />
        </div>
      </div>
  </template>
  
  <script setup>
  import NewsItemFallback from '../News/NewsItemFallback.vue';
  </script>
  
  <style scoped>
  #newsContainer {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  #newsTitle {
    margin: 0;
    font-weight: 500;
  }
  
  #newsGridContainer {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto auto auto auto;
  }
  
  .gridItem {
    width: 100%;
  }
  
  @media (max-width: 1150px) {
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
    #newsContainer {
      width: calc(100% - 2rem);
    }
  }
  </style>
  
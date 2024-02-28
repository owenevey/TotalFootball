<template>
  <main>
    <div id="newsContainer">
      <h1 id="newsTitle">News</h1>
      <div id="topStoryFallback">
        <div id="topStoryImage" class="shimmer"></div>
        <div id="topStoryTextContainer">
          <div id="topStoryTitle" class="shimmer"></div>
          <div id="topStoryTitle" class="shimmer"></div>
          <p id="topStoryTimeStamp" class="shimmer"></p>
        </div>
      </div>

      <div id="newsGridContainer">
        <NewsItemFallback v-for="i in 16" />
      </div>
    </div>
  </main>
</template>

<script setup>
import NewsItemFallback from "./NewsItemFallback.vue";
</script>

<style scoped>
main {
  margin: 1rem;
}

#newsTitle {
  margin: 0;
  font-weight: 500;
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

#topStoryFallback {
  height: 20rem;
  width: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

#topStoryTextContainer {
  padding: 2rem;
  width: 60%;
  text-align: left;
}

#topStoryTitle {
  height: 2rem;
  width: 50%;
  margin: 0rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

#topStoryTimeStamp {
  height: 1.5rem;
  width: 30%;
  border-radius: 3px;
  margin: 0rem;
}

#topStoryImage {
  width: 40%;
  height: 100%;
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

  #topStoryFallback {
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
    margin: 1rem 0.5rem;
  }
}

.shimmer {
  background: linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
}

@keyframes shimmer {
  to {
    background-position-x: 0%;
  }
}
</style>

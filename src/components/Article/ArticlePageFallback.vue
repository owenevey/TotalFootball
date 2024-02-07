<template>
  <main>
    <div id="articleContainer">
      <div id="articleImage" class="shimmer"></div>

      <div id="articleBody">
        <div class="articleTitle shimmer"></div>
        <div class="articleTitle shimmer"></div>
        <div id="articleTimeStamp" class="shimmer"></div>
        <div id="articleSubtext" class="shimmer"></div>
        <div class="articleParagraph" v-for="i in 8">
          <div class="articleText shimmer"></div>
          <div class="articleText shimmer"></div>
          <div class="articleText shimmer"></div>
          <div class="articleText shimmer" style="width: 75%"></div>
        </div>
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script setup></script>

<style scoped>
main {
  margin: 1rem;
}

#articleContainer {
  max-width: 70rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#articleImage {
  width: 100%;
  height: 40rem;
  border-radius: 10px;
}

#articleBody {
  width: 54rem;
  max-width: 100%;
  margin-top: -10rem;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 3rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
}

.articleTitle {
  height: 2rem;
  width: 80%;
  border-radius: 5px;
  margin: 0;
  margin-bottom: 0.5rem;
}

#articleTimeStamp {
  height: 1.5rem;
  width: 20%;
  border-radius: 5px;
  margin: 0.5rem 0;
}

#articleSubtext {
  height: 1.5rem;
  width: 50%;
  border-radius: 5px;
  margin: 2rem 0;
}

.articleParagraph {
  margin-bottom: 2rem;
}
.articleText {
  height: 1.5rem;
  width: 100%;
  border-radius: 5px;
  margin: 0.5rem 0;
}

@media (max-width: 700px) {
  main {
    margin: 1rem 0;
  }

  #articleImage {
    height: 15rem;
    border-radius: unset;
  }

  #articleBody {
    margin-top: 0rem;
    width: 100%;
    padding: 1.5rem;
    border-radius: unset;
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

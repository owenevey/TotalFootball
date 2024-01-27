<template>
  <div class="newsContainer">
    <img :src="'/news/' + imageName" />
    <div class="textContainer">
      <h1>{{ title }}</h1>
      <p>3 hrs ago</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  imageName: String,
});
</script>

<style scoped>
.newsContainer {
  height: 20rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.newsContainer:hover {
  text-decoration-line: underline;
}

.newsContainer:hover img {
  opacity: 0.5;
}

.textContainer {
  padding: 2rem;
}

h1 {
  font-weight: 400;
  margin: 0rem;
}

p {
  color: gray;
  margin: 0rem;
}

img {
  object-fit: cover;
  width: 50%;
  height: 100%;
}
</style>

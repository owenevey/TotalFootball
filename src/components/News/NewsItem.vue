<template>
    <div class="newsContainer">
      <img :src="'/news/' + imageName" />
      <div class="textContainer">
        <h3>{{ title }}</h3>
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
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
  }
  
  .newsContainer:hover {
    text-decoration-line: underline;
  }

  .newsContainer:hover img {
    opacity: 0.5;
  }
  
  .textContainer {
    padding: 0.5rem;
  }
  
  h3 {
    font-weight: 400;
    margin: 0rem;
  }
  
  p {
    color: gray;
    margin: 0rem;
    font-size: small;
  }
  
  img {
    object-fit: cover;
    width: 100%;
    height: 10rem;
  }
  </style>
  
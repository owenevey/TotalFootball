<template>
    <div class="newsContainer">
      <div class="newsItemImageFallback shimmer"></div>
      <div class="textContainer">
        <div class="newsItemTitleFallback shimmer"></div>
        <div class="newsItemTitleFallback shimmer"></div>
        <div class="newsItemTimestampFallback shimmer"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .newsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    height: fit-content;
    width: 100%;
  }
  
  .textContainer {
    padding: 0.5rem 0;
  }
  
  .newsItemTitleFallback {
    height: 1.5rem;
    width: 12rem;
    margin: 0rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
  }
  
  .newsItemTimestampFallback {
    height: 0.75rem;
    width: 5rem;
    margin: 0rem;
    border-radius: 3px;
  }
  
  .newsItemImageFallback {
    width: 100%;
    height: 10rem;
    border-radius: 15px;
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
  
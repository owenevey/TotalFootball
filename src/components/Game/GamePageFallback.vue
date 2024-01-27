<template>
  <div id="fallback">
    <div class="loader"></div>
  </div>
</template>
<script setup></script>
<style scoped>
#fallback {
  height: 30rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 6px solid #bcbcbc;
  border-top: 6px solid #00935c;
  border-radius: 50%;
  width: 20vw;
  max-width: 40px;
  height: 20vw;
  max-height: 40px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

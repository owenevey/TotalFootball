<template>
  <div
    class="leagueContainer"
  >
    <img
      :src="
        '../src/assets/leagues/' +
        name.toLowerCase().replace(' ', '_') +
        '_logo.png'
      "
    />
    <p>{{ name }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  isActive: Boolean,
});

</script>

<style scoped>
.leagueContainer {
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 40px;
}

p {
  font-weight: 500;
}

img {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  padding-right: 1rem;
}
</style>

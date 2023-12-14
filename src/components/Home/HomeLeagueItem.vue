<template>
  <div class="leagueItemContainer">
    <img
      class="leagueItemLogo"
      :src="
        '../src/assets/leagues/' +
        name.toLowerCase().replaceAll(' ', '_') +
        '_logo.png'
      "
    />
    <p class="leagueItemName">{{ name }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
});
</script>

<style scoped>
.leagueItemContainer {
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 40px;
}

.leagueItemLogo {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  padding-right: 1rem;
}

.leagueItemName {
  font-weight: 400;
}
</style>

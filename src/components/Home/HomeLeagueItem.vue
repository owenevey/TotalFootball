<template>
  <div class="leagueItemContainer">
    <img
      class="leagueItemLogo"
      :src="
        '/leagues/' +
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
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 0 1rem;
}

.leagueItemContainer:hover {
  background-color: #f5f5f5;
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

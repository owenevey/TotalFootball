<template>
  <div id="leaguesContainer">
    <h3 id="leaguesTitle">Leagues</h3>
    <div id="leaguesItemsContainer">
      <HomeLeagueItem v-for="(_, leagueName) in leagues" :name="leagueName" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  leagues: Object
})
import HomeLeagueItem from "./HomeLeagueItem.vue";

</script>

<style scoped>
#leaguesContainer {
  border-radius: 15px;
  background-color: #ffffff;
  height: fit-content;
}

#leaguesTitle {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0;
}

#leaguesItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1rem 1rem 1rem;
}

#leaguesItemsContainer > * {
  margin: 0.25rem;
}
</style>

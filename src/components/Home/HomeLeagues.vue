<template>
  <div id="leaguesContainer">
    <h3 id="leaguesTitle">Leagues</h3>
    <div id="leaguesItemsContainer">
      <HomeLeagueItem v-for="(leagueID, leagueName) in leagues" :name="leagueName" @click="selectLeague(leagueID)" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  leagues: Object
})

import { useRouter } from "vue-router";
import HomeLeagueItem from "./HomeLeagueItem.vue";

const router = useRouter();

const selectLeague = (id) => {
  router.push({
    name: "league",
    params: { id: id },
  });
};
</script>

<style scoped>
#leaguesContainer {
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  height: fit-content;
  overflow: hidden;
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
  overflow: hidden;
}
</style>

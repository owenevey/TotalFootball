<template>
  <main>
    <div class="gameContainer">
      <div class="mainColumn">
        <GameScoreBoard :game="game"/>
        <GameLineups :game="game" :hasLineups="hasLineups" />
        <GameMatchStatsVue :game="game" />
      </div>
      <GamePlayerStats :game="game" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GameScoreBoard from "../components/GameScoreboard.vue";
import GameLineups from "../components/GameLineups.vue";
import GameMatchStatsVue from "../components/GameMatchStats.vue";
import GamePlayerStats from "../components/GamePlayerStats.vue";

const route = useRoute();

const game = ref(null);

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.id}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  console.log("result", result);
  game.value = result.data.response[0];
};

getData();
</script>

<style scoped>
main {
  margin: 2rem;
}

.gameContainer {
  display: grid;
  grid-template-columns: 60rem auto;
  column-gap: 1rem;
  margin: auto;
  max-width: 85rem;
}
.mainColumn {
  max-width: 60rem;
}


h1,
h2,
h3,
h4 {
  font-weight: 400;
}

p {
  color: gray;
}

img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}


.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

* {
  font-family: "Rubik", sans-serif;
}
</style>

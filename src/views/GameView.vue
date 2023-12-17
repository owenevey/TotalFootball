<template>
  <main>
    <div id="gameContainer">
      <div id="mainColumn">
        <GameScoreBoard :game="game" />
        <GameLineups
          :game="game"
          :hasLineups="hasLineups"
          @selectPlayer="(playerID) => (selectedPlayer = playerID)"
        />
        <GameMatchStats :game="game" />
      </div>
      <GamePlayerStats
        id="playerContainer"
        :game="game"
        :selectedPlayer="selectedPlayer"
        :hasLineups="hasLineups"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GameScoreBoard from "../components/Game/GameScoreboard.vue";
import GameLineups from "../components/Game/GameLineups.vue";
import GameMatchStats from "../components/Game/GameMatchStats.vue";
import GamePlayerStats from "../components/Game/GamePlayerStats.vue";

const route = useRoute();
const game = ref(null);
const hasLineups = ref(null);
const selectedPlayer = ref(null);
// const showModal = ref(false);

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.id}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  console.log("result", result);
  game.value = result.data.response[0];

  hasLineups.value = game.value.lineups.length > 0;
  if (hasLineups.value) {
    selectedPlayer.value = game.value.lineups[0].startXI[10].player.id;
  }
};

getData();
</script>

<style scoped>
main {
  margin: 2rem;
}

#gameContainer {
  display: grid;
  grid-template-columns: 60rem 18rem;
  column-gap: 1rem;
  margin: auto;
  max-width: 79rem;
}



@media (max-width: 84rem) {
  #gameContainer {
    grid-template-columns: auto;
  }

  #playerContainer {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}

@media (max-width: 900px) {
  main {
    margin: 2rem 0;
  }
}
</style>

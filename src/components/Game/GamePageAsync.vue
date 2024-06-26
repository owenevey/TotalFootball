<template>
  <GameHeader :game="game" />
  <main>
    <div id="contentContainer">
      <div id="gridContainer">
        <div id="mainColumn">
          <GameScoreBoard :game="game" :events="events" />

          <GameLineups
            :game="game"
            :hasLineups="hasLineups"
            @selectPlayer="(playerID) => (selectedPlayer = playerID)"
          />

          <GameMatchStats :game="game" />

          <GameEvents id="bottomEvents" :game="game" :events="events" />
        </div>

        <div id="rightColumn">
          <GamePlayerStats
            id="playerContainer"
            :game="game"
            :selectedPlayer="selectedPlayer"
            :hasLineups="hasLineups"
          />
          <GameEvents :game="game" :events="events" />
        </div>
      </div>

      <BottomNewsAsync />
    </div>
  </main>
</template>

<script setup>
const emit = defineEmits(['passApiError'])

import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GameScoreBoard from "./GameScoreboard.vue";
import GameLineups from "./GameLineups.vue";
import GameMatchStats from "./GameMatchStats.vue";
import GamePlayerStats from "./GamePlayerStats.vue";
import GameEvents from "./GameEvents.vue";
import GameHeader from "./GameHeader.vue";
import BottomNewsAsync from "../Common/BottomNewsAsync.vue";
import exampleGame from "../../exampleData/exampleGame.json";

const route = useRoute();
const game = ref(null);
const hasLineups = ref(null);
const selectedPlayer = ref(null);
const events = ref(null);

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.id}`,
    {
      headers: { "x-apisports-key": import.meta.env.VITE_APP_FOOTBALL_API_KEY },
    }
  );

  if (result.data.errors.rateLimit || result.data.errors.requests) {
    emit("passApiError")
    game.value = exampleGame;
  } else {
    game.value = result.data.response[0];
  }

  hasLineups.value = game.value.lineups[0]?.startXI !== undefined;
  if (hasLineups.value) {
    selectedPlayer.value = game.value.lineups[0].startXI[10].player.id;
  }

  const eventsList = [];

  for (const event of game.value.events) {
    eventsList.push({
      time: event.time.elapsed + (event.time.extra ?? 0),
      type: event.type,
      detail: event.detail,
      player: event.player.name,
      team: event.team.name === game.value.teams.home.name ? "home" : "away",
    });
  }

  events.value = eventsList;
};

await getData();
</script>

<style scoped>
#contentContainer {
  margin: auto;
  max-width: 80rem;
}

#gridContainer {
  display: grid;
  grid-template-columns: 60rem 18rem;
  column-gap: 1rem;
  width: 100%;
}

#mainColumn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#rightColumn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

main {
  margin: 1rem;
}

#bottomEvents {
  display: none;
}

@media (max-width: 1300px) {
  #gridContainer {
    grid-template-columns: auto;
  }

  #rightColumn {
    display: none;
  }

  #bottomEvents {
    display: flex;
  }
}

@media (max-width: 800px) {
  main {
    margin: 1rem 0.5rem;
  }
}
</style>

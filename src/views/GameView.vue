<template>
  <div id="stickyHeader" v-show="showHeader">
    <div id="headerContainer">
      <div id="headerHomeTeam">
        <h2 class="headerTeamName">{{ game.teams.home.name }}</h2>
        <img class="headerTeamLogo" :src="game.teams.home.logo" />
      </div>

      <div id="headerScoreContainer">
        <h1 id="headerScore">{{ game.goals.home }} - {{ game.goals.away }}</h1>
        <p id="headerGameStatus">{{ game.fixture.status.long }}</p>
      </div>

      <div id="headerAwayTeam">
        <img class="headerTeamLogo" :src="game.teams.away.logo" />
        <h2 class="headerTeamName">{{ game.teams.away.name }}</h2>
      </div>
    </div>
  </div>
  <main>
    <div id="gameContainer">
      <div id="mainColumn">
        <GameScoreBoard :game="game" :events="events" />
        <GameLineups
          :game="game"
          :hasLineups="hasLineups"
          @selectPlayer="(playerID) => (selectedPlayer = playerID)"
        />
        <GameMatchStats :game="game" />
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
import GameEvents from "../components/Game/GameEvents.vue";

const route = useRoute();
const game = ref(null);
const hasLineups = ref(null);
const selectedPlayer = ref(null);
const events = ref(null);
const showHeader = ref(false);

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

getData();

document.addEventListener("scroll", onScroll);

function onScroll() {
  if (window.scrollY >= 200) {
    showHeader.value = true;
  } else {
    showHeader.value = false;
  }
}
</script>

<style scoped>
#stickyHeader {
  height: 7rem;
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
  z-index: 2;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerContainer {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerHomeTeam {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#headerAwayTeam {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.headerTeamName {
  font-weight: 400;
}

.headerTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
}

#headerScoreContainer {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#headerScore {
  font-weight: 400;
  margin: 0;
}

#headerGameStatus {
  color: gray;
  margin: 0.5rem;
  text-align: center;
}

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

  #rightColumn {
    display: none;
  }
}

@media (max-width: 900px) {
  main {
    margin: 2rem 0;
  }
}
</style>

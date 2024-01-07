<template>
  <div id="scoreboardContainer">
    <div id="topRow">
      <div id="backContainer">
        <div id="backButton" @click="goBack()">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
      </div>
      <div id="leagueContainer">
        <img id="leagueLogo" :src="game.league.logo" />
        <p id="leagueRound">{{ game.league.round }}</p>
      </div>
      <div id="emptyTopRight"></div>
    </div>
    <div class="divider"></div>
    <div id="mainRow">
      <div id="homeTeamColumn">
        <h2 id="homeTeamName">{{ game.teams.home.name }}</h2>
        <div v-for="event in events">
          <p
            v-if="event.team === 'home' && event.type === 'Goal'"
            class="scoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
      <div id="middleColumn">
        <img id="homeTeamLogo" :src="game.teams.home.logo" />
        <div id="scoreColumn">
          <h1 class="score" v-if="game.fixture.status.short !== 'NS'">
            {{ game.goals.home }} - {{ game.goals.away }}
          </h1>
          <h1 class="score" v-else>
            {{
              new Date(game.fixture.date).toLocaleTimeString("en-US", {
                timeStyle: "short",
              })
            }}
          </h1>
          <p id="gameStatus">{{ game.fixture.status.long }}</p>
        </div>
        <img id="awayTeamLogo" :src="game.teams.away.logo" />
      </div>
      <div id="awayTeamColumn">

        <h2 id="awayTeamName">{{ game.teams.away.name }}</h2>
        <div v-for="event in events">
          <p
            v-if="event.team === 'away' && event.type === 'Goal'"
            class="scoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div id="bottomRow">
      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> event </span>
        <p id="date">
          {{ new Date(game.fixture.date).toLocaleDateString("en-US") }}
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> stadium </span>
        <p id="venue">{{ game.fixture.venue.name }}</p>
      </div>
      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> sports </span>
        <p id="referee">{{ game.fixture.referee }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
  events: Object,
});

import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { game } = toRefs(props);

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
#scoreboardContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#topRow {
  display: flex;
  align-items: center;
  width: 100%;
}

#backButton {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 0.75rem;
  cursor: pointer;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 200, "wght" 400, "GRAD" 0, "opsz" 24;
}

#backButton:hover {
  background-color: #1a1a1a;
}

#backButton:hover .material-symbols-outlined {
  color: white;
}

#leagueContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

#leagueLogo {
  object-fit: contain;
  height: 2rem;
  width: 2rem;
  margin: 0.5rem 1rem 0.5rem 0;
}

#leagueRound {
  color: black;
  font-size: smaller;
}

#backContainer,
#emptyTopRight {
  flex: 1;
}

#mainRow {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 1rem;
}

#homeTeamColumn {
  flex: 1;
  text-align: right;
  margin-top: 0.5rem;
}

#homeTeamNameRow {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#homeTeamName {
  font-weight: 400;
  padding-left: 1rem;
}

#homeTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-left: 1rem;
}

#awayTeamColumn {
  flex: 1;
  text-align: left;
  margin-top: 0.5rem;
}

#awayTeamNameRow {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#awayTeamName {
  font-weight: 400;
  padding-right: 1rem;
}

#awayTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-right: 1rem;
}

#middleColumn {
  display: flex;
  align-items: center;
}

#scoreColumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 0 2rem;
}

.score {
  white-space: nowrap;
  margin: 0.5rem;
  text-align: center;
  font-weight: 400;
}

#gameStatus {
  color: gray;
  margin: 0.5rem;
  text-align: center;
}

.scoreboardGoal {
  font-size: small;
  color: gray;
}

#bottomRow {
  display: flex;
  width: 80%;
  justify-content: center;
}

.bottomInfoItem {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
}

#date,
#venue,
#referee {
  padding-left: 0.5rem;
  text-align: center;
  color: gray;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.bottomInfoItem > .material-symbols-outlined {
  color: gray;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}
</style>

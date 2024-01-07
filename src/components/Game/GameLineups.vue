<template>
  <div id="lineupsContainer">
    <div class="lineupsEdgeRow">
      <div class="lineupsRowLeft">
        <img class="lineupsTeamLogo" :src="game.teams.home.logo" />
        <p v-if="hasLineups" class="lineupsFormation">
          {{ game.lineups[0].formation }}
        </p>
        <h3 id="lineupsHomeTeamName">{{ game.teams.home.name }}</h3>
      </div>
      <h3 id="lineupsTitle">Lineups</h3>
      <div id="awayTeamTopRow" class="lineupsRowRight">
        <h3 id="lineupsAwayTeamName">{{ game.teams.away.name }}</h3>
        <p v-if="hasLineups" class="lineupsFormation">
          {{ game.lineups[1].formation }}
        </p>
        <img class="lineupsTeamLogo" :src="game.teams.away.logo" />
      </div>
    </div>
    <Pitch
      :home-lineup="homeLineup"
      :away-lineup="awayLineup"
      :hasLineups="hasLineups"
      @selectPlayer="(playerID) => $emit('selectPlayer', playerID)"
    />
    <div class="lineupsEdgeRow">
      <div id="coachEdgeContainer">
        <div v-if="hasLineups" class="lineupsRowLeft">
          <img class="lineupsCoachImage" :src="game.lineups[0].coach.photo" />
          <h3 class="lineupsCoachName">{{ game.lineups[0].coach.name }}</h3>
        </div>
        <h3 v-if="hasLineups" id="lineupsCoachTitle">Coach</h3>
        <div v-if="hasLineups" class="lineupsRowRight">
          <h3 class="lineupsCoachName">{{ game.lineups[1].coach.name }}</h3>
          <img class="lineupsCoachImage" :src="game.lineups[1].coach.photo" />
        </div>
      </div>
      <div id="awayTeamBottomRow" class="lineupsRowRight">
        <h3 id="lineupsAwayTeamName">{{ game.teams.away.name }}</h3>
        <p v-if="hasLineups" class="lineupsFormation">
          {{ game.lineups[1].formation }}
        </p>
        <img class="lineupsTeamLogo" :src="game.teams.away.logo" />
      </div>
    </div>
  </div>
  <div id="coachCardContainer">
    <h3 v-if="hasLineups" id="lineupsCoachTitle">Coach</h3>
    <div id="coachCardRow">
      <div v-if="hasLineups" class="coachCardColumn">
        <img class="lineupsCoachImage" :src="game.lineups[0].coach.photo" />
        <h3 class="lineupsCoachName">{{ game.lineups[0].coach.name }}</h3>
      </div>
      <div v-if="hasLineups" class="coachCardColumn">
        <img class="lineupsCoachImage" :src="game.lineups[1].coach.photo" />
        <h3 class="lineupsCoachName">{{ game.lineups[1].coach.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
  hasLineups: Boolean,
});

import { ref, toRefs } from "vue";
import Pitch from "./Pitch.vue";

const { game, hasLineups } = toRefs(props);
const homeLineup = ref(null);
const awayLineup = ref(null);

function parseLineup(lineupData) {
  const tempDict = {};
  for (const playerObj of lineupData.startXI) {
    if (playerObj.player.grid.substring(0, 1) in tempDict) {
      tempDict[playerObj.player.grid.substring(0, 1)].push({
        name: playerObj.player.name,
        number: playerObj.player.number,
        id: playerObj.player.id,
        kitColor:
          playerObj.player.pos === "G"
            ? "#" + lineupData.team.colors.goalkeeper.primary
            : "#" + lineupData.team.colors.player.primary,
        numberColor:
          playerObj.player.pos === "G"
            ? "#" + lineupData.team.colors.goalkeeper.number
            : "#" + lineupData.team.colors.player.number,
      });
    } else {
      tempDict[playerObj.player.grid.substring(0, 1)] = [
        {
          name: playerObj.player.name,
          number: playerObj.player.number,
          id: playerObj.player.id,
          kitColor:
            playerObj.player.pos === "G"
              ? "#" + lineupData.team.colors.goalkeeper.primary
              : "#" + lineupData.team.colors.player.primary,
          numberColor:
            playerObj.player.pos === "G"
              ? "#" + lineupData.team.colors.goalkeeper.number
              : "#" + lineupData.team.colors.player.number,
        },
      ];
    }
  }
  return tempDict;
}

if (hasLineups.value) {
  const homeLineupData = game.value.lineups[0];
  const awayLineupData = game.value.lineups[1];

  homeLineup.value = parseLineup(homeLineupData);
  awayLineup.value = parseLineup(awayLineupData);
}
</script>

<style scoped>
#lineupsContainer {
  margin-top: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lineupsEdgeRow {
  width: 100%;
  min-height: 3.75rem;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

#lineupsTitle,
#lineupsCoachTitle {
  font-weight: 500;
}

.lineupsRowLeft {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0rem 1rem;
  justify-content: flex-start;
}

.lineupsRowRight {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0rem 1rem;
  justify-content: flex-end;
}

.lineupsRowLeft > *,
.lineupsRowRight > * {
  margin: 0.5rem;
}

#coachEdgeContainer {
  display: flex;
  width: 100%;
}

.lineupsTeamLogo,
.lineupsCoachImage {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

#lineupsHomeTeamName {
  font-weight: 400;
  text-align: start;
}

#lineupsAwayTeamName {
  font-weight: 400;
  text-align: end;
}

.lineupsCoachName {
  font-weight: 400;
}

.lineupsFormation {
  color: black;
  background-color: #ebebeb;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  white-space: nowrap;
}

.lineupsCoachImage {
  border-radius: 50%;
}

#awayTeamBottomRow {
  display: none;
}

#coachCardContainer {
  display: none;
}

@media (max-width: 900px) {
  #lineupsTitle,
  #awayTeamTopRow {
    display: none;
  }

  #awayTeamBottomRow {
    display: flex;
  }

  #coachEdgeContainer {
    display: none;
  }

  #coachCardContainer {
    margin-top: 1rem;
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #coachCardRow {
    display: flex;
    width: 100%;
  }

  .coachCardColumn {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    margin: 1rem;
  }
}
</style>

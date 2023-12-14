<template>
  <div class="lineups">
    <div class="lineupsTop">
      <div v-if="hasLineups" class="lineupsTopLeft">
        <img :src="game.teams.home.logo" />
        <p class="formation">{{ game.lineups[0].formation }}</p>
        <h3 class="lineupsHomeTeamName">{{ game.teams.home.name }}</h3>
      </div>
      <h3 style="font-weight: 500">Lineups</h3>
      <div v-if="hasLineups" class="lineupsTopRight">
        <h3 class="lineupsAwayTeamName">{{ game.teams.away.name }}</h3>
        <p class="formation">{{ game.lineups[1].formation }}</p>
        <img :src="game.teams.away.logo" />
      </div>
    </div>
    <div class="divider"></div>
    <Pitch
      :home-lineup="homeLineup"
      :away-lineup="awayLineup"
      :hasLineups="hasLineups"
    />
    <div class="divider"></div>
    <div class="lineupsTop">
      <div v-if="hasLineups" class="lineupsTopLeft">
        <img :src="game.lineups[0].coach.photo" class="circleImage" />
        <h3>{{ game.lineups[0].coach.name }}</h3>
      </div>
      <h3 style="font-weight: 500">Coach</h3>
      <div v-if="hasLineups" class="lineupsTopRight">
        <h4>{{ game.lineups[1].coach.name }}</h4>
        <img :src="game.lineups[1].coach.photo" class="circleImage" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  game: Object,
  hasLineups: Boolean,
});

import { ref, toRefs } from 'vue';
import Pitch from "./Pitch.vue";

const { game } = toRefs(props);

const events = ref(null);
const hasLineups = ref(null);
const homeLineup = ref(null);
const awayLineup = ref(null);

hasLineups.value = game.value.lineups.length > 0;

if (hasLineups.value) {
  const resultHomeLineup = game.value.lineups[0];

  const homePlayerDict = {};
  for (const playerObj of resultHomeLineup.startXI) {
    if (playerObj.player.grid.substring(0, 1) in homePlayerDict) {
      homePlayerDict[playerObj.player.grid.substring(0, 1)].push({
        name: playerObj.player.name,
        number: playerObj.player.number,
        kitColor:
          playerObj.player.pos === "G"
            ? "#" + resultHomeLineup.team.colors.goalkeeper.primary
            : "#" + resultHomeLineup.team.colors.player.primary,
        numberColor:
          playerObj.player.pos === "G"
            ? "#" + resultHomeLineup.team.colors.goalkeeper.number
            : "#" + resultHomeLineup.team.colors.player.number,
      });
    } else {
      homePlayerDict[playerObj.player.grid.substring(0, 1)] = [
        {
          name: playerObj.player.name,
          number: playerObj.player.number,
          kitColor:
            playerObj.player.pos === "G"
              ? "#" + resultHomeLineup.team.colors.goalkeeper.primary
              : "#" + resultHomeLineup.team.colors.player.primary,
          numberColor:
            playerObj.player.pos === "G"
              ? "#" + resultHomeLineup.team.colors.goalkeeper.number
              : "#" + resultHomeLineup.team.colors.player.number,
        },
      ];
    }
  }
  homeLineup.value = homePlayerDict;

  const resultAwayLineup = game.value.lineups[1];

  const awayPlayerDict = {};
  for (const playerObj of resultAwayLineup.startXI) {
    if (playerObj.player.grid.substring(0, 1) in awayPlayerDict) {
      awayPlayerDict[playerObj.player.grid.substring(0, 1)].push({
        name: playerObj.player.name,
        number: playerObj.player.number,
        kitColor:
          playerObj.player.pos === "G"
            ? "#" + resultAwayLineup.team.colors.goalkeeper.primary
            : "#" + resultAwayLineup.team.colors.player.primary,
        numberColor:
          playerObj.player.pos === "G"
            ? "#" + resultAwayLineup.team.colors.goalkeeper.number
            : "#" + resultAwayLineup.team.colors.player.number,
      });
    } else {
      awayPlayerDict[playerObj.player.grid.substring(0, 1)] = [
        {
          name: playerObj.player.name,
          number: playerObj.player.number,
          kitColor:
            playerObj.player.pos === "G"
              ? "#" + resultAwayLineup.team.colors.goalkeeper.primary
              : "#" + resultAwayLineup.team.colors.player.primary,
          numberColor:
            playerObj.player.pos === "G"
              ? "#" + resultAwayLineup.team.colors.goalkeeper.number
              : "#" + resultAwayLineup.team.colors.player.number,
        },
      ];
    }
  }
  awayLineup.value = awayPlayerDict;
}

</script>
<style scoped>
.lineups {
  margin-top: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lineupsTop {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lineupsTopLeft,
.lineupsTopRight {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0.5rem 1rem;
}

.lineupsTopLeft > *,
.lineupsTopRight > * {
  margin: 0.5rem;
}

.lineupsTopRight {
  justify-content: flex-end;
}

.lineupsTopLeft > img,
.lineupsTopRight > img {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

.lineupsAwayTeamName {
  text-align: end;
}

.formation {
  color: black;
  background-color: #ebebeb;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  border-radius: 10px;
  white-space: nowrap;
}

.circleImage {
  border-radius: 50%;
}
</style>

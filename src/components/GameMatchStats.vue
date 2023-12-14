<template>
  <div class="matchStats">
    <h3 style="font-weight: 500">Match Stats</h3>
    <div class="divider"></div>
    <div class="statRow" v-for="(stat, key) of Object.entries(stats)">
      <h4>{{ stat[0] }}</h4>
      <div class="statsBar">
        <p class="stat">{{ stat[1][0] }}</p>
        <div class="leftBar">
          <div
            class="leftBarInside"
            :style="{
              width: (stat[1][0] / stat[1][2]) * 100 + '%',
              backgroundColor: '#' + game.lineups[0].team.colors.player.primary,
            }"
          ></div>
        </div>
        <div class="rightBar">
          <div
            class="rightBarInside"
            :style="{
              width: (stat[1][1] / stat[1][2]) * 100 + '%',
              backgroundColor: '#' + game.lineups[1].team.colors.player.primary,
            }"
          ></div>
        </div>
        <p class="stat">{{ stat[1][1] }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  game: Object,
});

import { ref, toRefs } from "vue";

const { game } = toRefs(props);
const hasLineups = ref(null);
const stats = ref({});

function parseStat(stat) {
  if (typeof stat === "string") {
    if (stat.slice(-1) === "%") {
      stat = Number(stat.slice(0, -1));
    } else {
      stat = Number(stat);
    }
  } else if (!stat) {
    stat = 0;
  }
  return stat;
}

function parseStatName(name) {
  switch (name) {
    case "Shots insidebox":
      return "Shots Inside the Box";
    case "Shots outsidebox":
      return "Shots Outside the Box";
    case "Passes accurate":
      return "Accurate Passes";
    case "Passes %":
      return "Pass Completion Percentage";
    case "expected_goals":
      return "Expected Goals (xG)";
  }
  return name;
}

hasLineups.value = game.value.lineups.length > 0;

if (hasLineups.value) {
  const matchStats = {};
  for (const statsObj of game.value.statistics[0].statistics) {
    matchStats[parseStatName(statsObj.type)] = [parseStat(statsObj.value)];
  }

  for (const statsObj of game.value.statistics[1].statistics) {
    matchStats[parseStatName(statsObj.type)].push(parseStat(statsObj.value));
    matchStats[parseStatName(statsObj.type)].push(
      matchStats[parseStatName(statsObj.type)][0] +
        matchStats[parseStatName(statsObj.type)][1]
    );
  }
  stats.value = matchStats;
}
</script>

<style scoped>
.matchStats {
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statsBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1rem;
  margin-bottom: 2rem;
}

.leftBar {
  height: 0.5rem;
  width: 42%;
  background-color: #ebf0f7;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  display: flex;
  justify-content: flex-end;
}

.rightBar {
  height: 0.5rem;
  width: 42%;
  background-color: #ebf0f7;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
}

.leftBarInside {
  height: 0.5rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-right: 0;
}

.rightBarInside {
  height: 0.5rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-left: 0;
}

.statRow {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stat {
  width: 2rem;
  padding: 2rem;
  color: black;
  text-align: center;
}
</style>

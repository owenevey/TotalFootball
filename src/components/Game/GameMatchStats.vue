<template>
  <div id="matchStatsContainer">
    <h3 id="matchStatsTitle">Match Stats</h3>
    <div class="divider"></div>
    <div v-if="hasStats" class="statRow" v-for="(stat, _) of Object.entries(stats)">
      <h4 class="statName">{{ stat[0] }}</h4>
      <div class="statBar">
        <p class="statNumber">{{ stat[1][0] }}</p>
        <div class="leftBar">
          <div
            class="leftBarInside"
            :style="{
              width: (stat[1][0] / stat[1][2]) * 100 + '%',
            }"
          ></div>
        </div>
        <div class="spacer"></div>
        <div class="rightBar">
          <div
            class="rightBarInside"
            :style="{
              width: (stat[1][1] / stat[1][2]) * 100 + '%',
            }"
          ></div>
        </div>
        <p class="statNumber">{{ stat[1][1] }}</p>
      </div>
    </div>
    <div v-else>
      <h4 id="noStatsText">No match stats yet</h4>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  game: Object,
});

import { ref, toRefs } from "vue";

const { game } = toRefs(props);
const hasStats = ref(null);
const stats = ref({});

function parseStatNumber(stat) {
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

hasStats.value = game.value.statistics.length > 0;

if (hasStats.value) {
  const matchStats = {};
  for (const statsObj of game.value.statistics[0].statistics) {
    matchStats[parseStatName(statsObj.type)] = [
      parseStatNumber(statsObj.value),
    ];
  }

  for (const statsObj of game.value.statistics[1].statistics) {
    matchStats[parseStatName(statsObj.type)].push(
      parseStatNumber(statsObj.value)
    );
    matchStats[parseStatName(statsObj.type)].push(
      matchStats[parseStatName(statsObj.type)][0] +
        matchStats[parseStatName(statsObj.type)][1]
    );
  }
  stats.value = matchStats;
}
</script>

<style scoped>
#matchStatsContainer {
  margin-top: 1rem;
  padding-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

#matchStatsTitle {
  font-weight: 500;
}

.statRow {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.statName {
  font-weight: 400;
  margin: 1rem
}
.statBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1rem;
  margin-bottom: 1rem;
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

.spacer {
  height: 1rem;
  width: 1rem;
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
  background-color: #1a1a1a;
}

.rightBarInside {
  height: 0.5rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-left: 0;
  background-color: #1a1a1a;
}

.statNumber {
  width: 2rem;
  padding: 2rem;
  color: black;
  text-align: center;
}

#noStatsText {
  font-weight: 400;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}
</style>

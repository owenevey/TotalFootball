<template>
  <div id="playerContainer">
    <div id="playerHeader">
      <div id="playerRow">
        <img
          v-if="hasData"
          id="playerPhoto"
          :src="stats[selectedPlayer].photo"
        />
        <h3 id="playerRowText">
          {{ hasData ? stats[selectedPlayer].name : "No player info yet" }}
        </h3>
      </div>
    </div>
    <div id="playerStatsContainer">
      <div v-if="!hasData" id="noStatsContainer">
        <h4>No stats yet</h4>
      </div>
      <div
        v-if="hasData"
        v-for="(stat, _) in Object.entries(stats[selectedPlayer].stats)"
        class="statGroup"
      >
        <p class="mainStatName">{{ stat[0] }}</p>
        <div v-for="(number, name) in stat[1]" class="childStats">
          <p class="childStatName">{{ name }}</p>
          <p class="childStatNumber">{{ number ?? 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
  selectedPlayer: Number,
  hasLineups: Boolean,
});

import { ref, toRefs } from "vue";

const { game, selectedPlayer, hasLineups } = toRefs(props);

const hasStats = game.value.statistics.length > 0;
const hasPlayers = game.value.players.length > 0;

const hasData = ref(hasLineups.value && hasStats && hasPlayers);

const stats = ref({});

if (hasData.value) {
  const allPlayers = game.value.players[0].players.concat(
    game.value.players[1].players
  );

  const filteredStats = {
    games: ["minutes", "rating", "position"],
    goals: ["total", "assists"],
    passes: ["total", "key"],
    shots: ["total", "on"],
    tackles: ["total", "blocks", "interceptions"],
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function parseStats(stats) {
    function innerParse(category, statsObj) {
      const tempInner = {};
      for (const [innerKey, innerVal] of Object.entries(statsObj)) {
        if (filteredStats[category].includes(innerKey)) {
          tempInner[capitalizeFirstLetter(innerKey)] = innerVal;
        }
      }
      return tempInner;
    }

    const tempStats = {};
    for (const [key, val] of Object.entries(stats)) {
      if (Object.keys(filteredStats).includes(key)) {
        tempStats[capitalizeFirstLetter(key)] = innerParse(key, val);
      }
    }
    return tempStats;
  }

  const tempDict = {};
  for (const team of game.value.players) {
    for (const player of team.players) {
      tempDict[player.player.id] = {
        name: player.player.name,
        photo: allPlayers.find(
          (playerObj) => player.player.id === playerObj.player.id
        ).player.photo,
        stats: parseStats(player.statistics[0]),
      };
    }
  }
  stats.value = tempDict;
}
</script>

<style scoped>
#playerContainer {
  height: fit-content;
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

#playerHeader {
  width: 100%;
  height: 7rem;
  background-color: #00935c;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#playerRow {
  display: flex;
  height: 100%;
  align-items: center;
  margin: 1rem;
}

#playerRowText {
  color: white;
  margin: 0.3rem;
}

#playerPhoto {
  border-radius: 50%;
  object-fit: cover;
  height: 4rem;
  width: 4rem;
  margin-right: 1rem;
}

#playerStatsContainer {
  width: 16rem;
  min-height: 20rem;
  margin: 0.5rem 1rem;
}

.statGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.mainStatName {
  font-weight: 500;
  color: black;
}

.childStats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.childStatName {
  color: gray;
}

.childStats > *,
.mainStatName {
  margin: 0.25rem;
}

#playerPhoto {
  object-fit: contain;
  width: 4rem;
  height: 4rem;
}

#noStatsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}
</style>

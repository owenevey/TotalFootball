<template>
  <div v-if="game.players[0]?.players" class="rightColumn">
    <div class="rightTop">
      <div class="playerRow">
        <img
          class="playerPhoto"
          :src="game.players[0].players[1].player.photo"
        />
        <h3>
          {{ game.players[0].players[1].player.name }} ({{
            game.players[0].players[1].statistics[0].games.position
          }})
        </h3>
      </div>
    </div>
    <div class="playerStats">
      <div
        v-for="(stat, j) in Object.entries(
          game.players[0].players[1].statistics[0]
        )"
        class="playerStat"
      >
        <p v-if="stat[1]" class="playerStatName">{{ stat[0] }}</p>
        <div v-for="(number, name) in stat[1]" class="playerStatNumbers">
          <p>{{ name }}</p>
          <p>{{ number ?? 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  game: Object,
});
</script>
<style scoped>
.rightColumn {
  height: fit-content;
  max-width: 20rem;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.rightTop {
  width: 100%;
  height: 8rem;
  background-color: #00935c;
  display: flex;
  align-items: flex-end;
}

.playerRow {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.playerRow > * {
  margin-right: 0.5rem;
  color: white;
}

.playerPhoto {
  border-radius: 50%;
  object-fit: cover;
  height: 4rem;
  width: 4rem;
}

.playerStats {
  width: 90%;
  margin: 0.5rem 0;
}

.playerStat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.playerStatName {
  font-weight: 500;
  color: black;
}

.playerStatNumbers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.playerStatNumbers > *,
.playerStatName {
  margin: 0.25rem;
}

img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}
</style>

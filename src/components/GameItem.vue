<template>
  <div class="gameContainer">
    <p class="leftItem">{{ game.teams.home.name }}</p>
    <div class="centerItem">
      <img :src="game.teams.home.logo" />
      <p class="scoreboard">{{ game.goals.home }} - {{ game.goals.away }}</p>
      <img :src="game.teams.away.logo" />
    </div>
    <p class="rightItem">{{ game.teams.away.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  game: Object,
});
</script>

<style scoped>
.gameContainer {
  height: 4rem;
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px solid #f3f3f3;
  min-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.centerItem {
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
}

.centerItem > * {
  display: flex;
  padding: 1rem;
  flex: 1;
  white-space: nowrap;
}

.leftItem,
.rightItem {
  flex: 1;
  display: flex;
  text-align: center;
}

.leftItem {
  justify-content: flex-end;
  text-align: right;
}

.rightItem {
  justify-content: flex-start;
  text-align: left;
}

.scoreboard {
  background-color: #f3f3f3;
  color: #3f66ec;
  border-radius: 10px;
  margin: 0px;
  padding: 0.5rem;
  flex-grow: 0;
}

.gameContainer > * {
  padding: 0 1rem;
}

img {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}
</style>

<template>
  <div class="gameItemContainer">
    <p class="homeTeamName">{{ game.teams.home.name }}</p>
    <div class="centerItem">
      <img class="teamLogo" :src="game.teams.home.logo" />
      <div class="scoreboard" v-if="game.fixture.status.short !== 'NS'">
        <p>{{ game.goals.home }} - {{ game.goals.away }}</p>
        <p class="status">{{ game.fixture.status.short }}</p>
      </div>
      <div class="scoreboard" v-else>
        <p class="time">
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <img class="teamLogo" :src="game.teams.away.logo" />
    </div>
    <p class="awayTeamName">{{ game.teams.away.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  game: Object,
});
</script>

<style scoped>
.gameItemContainer {
  height: 4rem;
  width: 98%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px solid #f3f3f3;
  min-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.gameItemContainer:hover {
  background-color: #f5f5f5;
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

.homeTeamName,
.awayTeamName {
  flex: 1;
  display: flex;
  text-align: center;
}

.homeTeamName {
  justify-content: flex-end;
  text-align: right;
}

.awayTeamName {
  justify-content: flex-start;
  text-align: left;
}

.scoreboard > p {
  margin: 0;
  text-align: center;
}

.status {
  font-size: small;
  font-weight: 400;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 0px;
  padding: 0.5rem 0.75rem;
  flex-grow: 0;
  font-weight: 500;
}

.gameItemContainer > * {
  padding: 0 0.5rem;
}

.teamLogo {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}
</style>

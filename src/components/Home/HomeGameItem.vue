<template>
  <div class="gameItemContainer">
    <div class="leftItem">
      <p class="homeTeamName">{{ game.teams.home.name }}</p>
      <img class="teamLogo" :src="game.teams.home.logo" />
    </div>

    <div class="centerItem" v-if="game.fixture.status.short !== 'NS'">
      <p class="score">{{ game.goals.home }} - {{ game.goals.away }}</p>
      <p class="status">{{ game.fixture.status.short }}</p>
    </div>
    <div class="centerItem" v-else>
      <p class="time">
        {{
          new Date(game.fixture.date).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })
        }}
      </p>
    </div>

    <div class="rightItem">
      <img class="teamLogo" :src="game.teams.away.logo" />
      <p class="awayTeamName">{{ game.teams.away.name }}</p>
    </div>
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
  width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  box-sizing: border-box;
}

.gameItemContainer:hover {
  background-color: #f5f5f5;
}

.leftItem {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.homeTeamName {
  text-align: right;
}

.centerItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2rem;
}

.centerItem > * {
  padding: 0;
  margin: 0;
  white-space: nowrap;
  text-align: center;
  font-weight: 500;
}

.status {
  font-size: small;
  font-weight: 400;
}

.time {
  font-size: small;
  white-space: unset;
}

.rightItem {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.teamLogo {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

@media (max-width: 550px) {
  .gameItemContainer {
    gap: 1rem;
  }

  .leftItem,
  .rightItem {
    gap: 0.5rem;
  }
  
  .homeTeamName,
  .awayTeamName {
    font-size: 0.9rem;
  }

  .teamLogo {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>

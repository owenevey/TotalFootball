<template>
  <div class="gameItemContainer">
    <div class="leftItem">
      <p class="homeTeamName">{{ game.teams.home.name }}</p>
      <img class="teamLogo" :src="game.teams.home.logo" />
    </div>
    <div class="centerItem" v-if="game.fixture.status.short !== 'NS'">
      <p>{{ game.goals.home }} - {{ game.goals.away }}</p>
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
  border: 2px solid #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  /* margin: 1rem 0 0 0; */
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
  padding: 0 1.5rem;
}

.centerItem > * {
  padding: 0;
  margin: 0;
  white-space: nowrap;
  text-align: center;
  font-weight: 500;
}

.rightItem {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.status {
  font-size: small;
  font-weight: 400;
}

.teamLogo {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

@media (max-width: 550px) {
  .leftItem {
    flex-direction: column-reverse;
    gap: 0;
    padding: 0.5rem 0;
  }

  .rightItem {
    flex-direction: column;
    gap: 0;
    padding: 0.5rem 0;
  }

  .homeTeamName,
  .awayTeamName {
    margin: 0.5rem 0 0 0;
    text-align: center;
  }

  .centerItem {
    padding: 0 0.5rem;
  }

  .gameItemContainer {
    height: fit-content;
  }
}
</style>

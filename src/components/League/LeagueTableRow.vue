<template>
  <div class="tableRow">
    <div class="teamInfo">
      <p class="rank">{{ team.rank }}</p>
      <img class="logo" :src="team.team.logo" />
      <p class="teamName">{{ team.team.name }}</p>
    </div>
    <div class="stats">
      <p class="gamesPlayed">{{ team.all.played }}</p>
      <p class="wins">{{ team.all.win }}</p>
      <p class="draws">{{ team.all.draw }}</p>
      <p class="losses">{{ team.all.lose }}</p>
      <p class="plusMinus">
        {{ team.all.goals.for }}-{{ team.all.goals.against }}
      </p>
      <p class="goalDifferential">
        {{ team.all.goals.for - team.all.goals.against }}
      </p>
      <p class="points">{{ team.points }}</p>
    </div>
    <div class="form">
      <div
        class="formSquare"
        v-for="char in team.form"
        :style="{
          'background-color':
            char === 'W' ? '#01985f' : char === 'D' ? '#8d9498' : '#dd3636',
        }"
      >
        <p class="formText">{{ char }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  team: Object,
});
</script>

<style scoped>
.tableRow {
  width: 100%;
  height: 1.5rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.teamInfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.rank {
  width: 2rem;
  margin: 0 0.5rem;
  text-align: center;
}

.logo {
  object-fit: contain;
  width: 1.33rem;
  height: 1.33rem;
  margin: 0 1rem;
}

.teamName {
  text-align: start;
  width: 12rem;
  margin: 0 0.5rem;
  white-space: nowrap;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats > * {
  text-align: center;
  margin: 0.25rem;
  width: 3rem;
  white-space: nowrap;
}

.form {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 11.65rem;
}

.formSquare {
  height: 1.33rem;
  width: 1.33rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

.formText {
  text-align: center;
  font-size: small;
  color: white;
}

@media (max-width: 1000px) {
  .form {
    display: none;
  }
}

@media (max-width: 800px) {
  .wins,
  .draws,
  .losses,
  .plusMinus {
    display: none;
  }
}

@media (max-width: 550px) {
  .gamesPlayed,
  .goalDifferential {
    display: none;
  }
}
</style>

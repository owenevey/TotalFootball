<template>
  <div class="tableRow">
    <div class="teamInfo">
      <p class="rank">{{ team.rank }}</p>
      <v-lazy-image class="logo" :src="team.team.logo" />
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

import VLazyImage from "v-lazy-image";
</script>

<style scoped>
.tableRow {
  width: 100%;
  height: 1.5rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.teamInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.rank {
  width: 1.5rem;
  margin: 0;
  text-align: center;
}

.logo {
  object-fit: contain;
  width: 1.33rem;
  height: 1.33rem;
  margin: 0;
}

.teamName {
  text-align: left;
  margin: 0;
  white-space: nowrap;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.stats > * {
  text-align: center;
  margin: 0;
  width: 1.5rem;
  white-space: nowrap;
}

.plusMinus {
  width: 3rem;
}

.form {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 10.7rem;
  gap: 1rem;
}

.formSquare {
  height: 1.33rem;
  width: 1.33rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.formText {
  text-align: center;
  font-size: 0.8rem;
  color: white;
}

@media (max-width: 950px) {
  .form {
    display: none;
  }
}

@media (max-width: 700px) {
  .wins,
  .draws,
  .losses,
  .plusMinus {
    display: none;
  }
}

@media (max-width: 480px) {
  .gamesPlayed,
  .goalDifferential {
    display: none;
  }
}
</style>

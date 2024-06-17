<template>
  <div v-for="group in leagueStandings" class="outerContainer">
    <div class="tableContainer">
      <div class="headerRow">
        <div class="teamInfo">
          <p class="rank">#</p>
          <div class="logo"></div>
          <p class="teamName"></p>
        </div>
        <div class="stats">
          <p class="gamesPlayed">GP</p>
          <p class="wins">W</p>
          <p class="draws">D</p>
          <p class="losses">L</p>
          <p class="plusMinus">+/-</p>
          <p class="goalDifferential">GD</p>
          <p class="points">PTS</p>
        </div>
        <div class="form">
          <p>Form</p>
        </div>
      </div>
      <LeagueTableRow v-for="team in group" :team="team" />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["passApiError"]);

import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LeagueTableRow from "./LeagueTableRow.vue";
import exampleLeagueTable from "../../exampleData/exampleLeagueTable.json";

const route = useRoute();

const leagueStandings = ref(null);

const fetchData = async (id) => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/standings?league=${id}&season=2023`,
    {
      headers: { "x-apisports-key": import.meta.env.VITE_APP_FOOTBALL_API_KEY },
    }
  );

  if (result.data.errors.rateLimit || result.data.errors.requests) {
    emit("passApiError");
    leagueStandings.value = exampleLeagueTable;
  } else {
    leagueStandings.value = result.data.response[0].league.standings;
  }
};

await fetchData(route.params.id);
</script>

<style scoped>
.outerContainer {
  width: 100%;
  min-width: fit-content;
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  padding: 1rem;
  box-sizing: border-box;
}

.headerRow {
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
  justify-content: flex-start;
  width: 10.7rem;
}

.form > p {
  text-align: left;
}

.teamInfo > p,
.stats > p,
.form > p {
  color: gray;
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

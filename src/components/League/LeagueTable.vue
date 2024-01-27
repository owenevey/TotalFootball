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
        <div class="form"><p>Form</p></div>
      </div>
      <LeagueTableRow v-for="team in group" :team="team" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LeagueTableRow from "./LeagueTableRow.vue";

const route = useRoute();

const leagueStandings = ref(null);

const fetchData = async (id) => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/standings?league=${id}&season=2023`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  leagueStandings.value = result.data.response[0].league.standings;
};

await fetchData(route.params.id);
</script>

<style scoped>
.outerContainer {
  width: 100%;
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
  width: 1.33rem;
  height: 1.33rem;
  margin: 0 1rem;
}

.teamName {
  text-align: start;
  width: 12rem;
  margin: 0 0.5rem;
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
  justify-content: flex-start;
  width: 11.65rem;
}

p {
  color: gray;
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

<template>
  <div class="scoreboard">
    <p class="round">{{ game.league.round }}</p>
    <div class="divider"></div>
    <div class="mainRow">
      <div class="leftRow">
        <div class="leftTeamName">
          <h2>{{ homeTeam.team.name }}</h2>
          <img :src="homeTeam.team.logo" />
        </div>
        <p class="nameGoals">Ziyech 22'</p>
        <p class="nameGoals">Umtiti 45'</p>
        <p class="nameGoals">Haaland 68'</p>
      </div>
      <div class="score">
        <h1>{{ game.goals.home }} - {{ game.goals.away }}</h1>
        <p>Full Time</p>
      </div>
      <div class="rightRow">
        <div class="rightTeamName">
          <img :src="awayTeam.team.logo" />
          <h2>{{ awayTeam.team.name }}</h2>
        </div>
        <p class="nameGoals">Fernandes 68'</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="bottomRow">
      <p>{{ game.fixture.date.split("T")[0] }}</p>
      <p>{{ game.fixture.venue.name }}</p>
      <p>{{ game.fixture.referee }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const game = ref(null);
const homeTeam = ref(null);
const awayTeam = ref(null);

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.gameID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  console.log(result);
  game.value = result.data.response[0];

  const home = await axios.get(
    `https://v3.football.api-sports.io/teams?id=${route.query.homeID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  homeTeam.value = home.data.response[0];

  const away = await axios.get(
    `https://v3.football.api-sports.io/teams?id=${route.query.awayID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  awayTeam.value = away.data.response[0];
};

getData();
</script>

<style scoped>
.scoreboard {
  max-width: 60rem;
  /* height: 20rem; */
  margin: auto;
  margin-top: 2rem;
  background-color: #ffffff;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.mainRow {
  display: flex;
  align-items: flex-start;
  height: fit-content;
  width: 100%;
}

.leftRow {
  flex: 1;
  text-align: right;
  margin-top: 0.5rem;
}

.leftTeamName,
.rightTeamName {
  display: flex;
  align-items: center;
}

.leftTeamName {
  justify-content: flex-end;
}

.rightTeamName {
  justify-content: flex-start;
}

.leftTeamName > img {
  padding-left: 1rem;
}

.rightTeamName > img {
  padding-right: 1rem;
}

.rightRow {
  flex: 1;
  text-align: left;
  margin-top: 0.5rem;
}

.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  margin-left: 2rem;
  margin-right: 2rem;
}

.score > * {
  margin: 0.5rem;
}

h1,
h2 {
  font-weight: 400;
  white-space: nowrap;
}

hr {
  color: gray;
  border-top: 3px solid gray;
  width: 100%;
}

p {
  color: gray;
}

.nameGoals {
  font-size: small;
}

.round {
  color: black;
  font-size: smaller;
}

.bottomRow {
  display: flex;
  width: 80%;
  justify-content: center;
}
.bottomRow > p {
  padding-left: 1rem;
  padding-right: 1rem;
}

img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

* {
  font-family: "Roboto", sans-serif;
}
</style>

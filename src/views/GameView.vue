<template>
  <div class="scoreboard">
    <div class="league">
      <img :src="game.league.logo" />
      <p class="round">{{ game.league.round }}</p>
    </div>
    <div class="divider"></div>
    <div class="mainRow">
      <div class="leftRow">
        <div class="leftTeamName">
          <h2>{{ game.teams.home.name }}</h2>
          <img :src="game.teams.home.logo" />
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
          <img :src="game.teams.away.logo" />
          <h2>{{ game.teams.away.name }}</h2>
        </div>
        <p class="nameGoals">Fernandes 68'</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="bottomRow">
      <p>{{ new Date(game.fixture.date).toLocaleString() }}</p>
      <p>{{ game.fixture.venue.name }}</p>
      <p>{{ game.fixture.referee }}</p>
    </div>
  </div>
  <div class="lineups">
    <div class="lineupsTop">
      <div class="lineupsTopLeft">
        <img :src="game.teams.home.logo" />
        <p class="formation">{{ game.lineups[0].formation }}</p>
        <h3>{{ game.teams.home.name }}</h3>
      </div>
      <h3 style="font-weight: 500">Lineups</h3>
      <div class="lineupsTopRight">
        <h3>{{ game.teams.away.name }}</h3>
        <p class="formation">{{ game.lineups[1].formation }}</p>
        <img :src="game.teams.away.logo" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="pitch">
      <div class="leftPitch">
        <div class="pitchColumn">
          <div class="player goalie">
            {{ homeLineup.playerDict["1:1"] }}
          </div>
        </div>
        <div
          class="pitchColumn"
          v-for="[x, col] in homeLineup.formation.entries()"
        >
          <div v-for="y in col" class="player">
            {{ homeLineup.playerDict[x + 2 + ":" + y] }}
          </div>
        </div>
      </div>
      <div class="rightPitch">
        <div
          class="pitchColumn"
          v-for="[x, col] in awayLineup.formation.entries()"
        >
          <div v-for="y in col" class="player">
            {{
              awayLineup.playerDict[
                awayLineup.formation.length - x + 1 + ":" + (col - y + 1)
              ]
            }}
          </div>
        </div>
        <div class="pitchColumn">
          <div class="player goalie">
            {{ awayLineup.playerDict["1:1"] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const game = ref(null);
const homeLineup = ref(null);
const awayLineup = ref(null);

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.gameID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  console.log("result", result);
  game.value = result.data.response[0];
  const homeLineupArray = result.data.response[0].lineups[0].formation
    .split("-")
    .map(Number);
  const awayLineupArray = result.data.response[0].lineups[1].formation
    .split("-")
    .map(Number)
    .reverse();

  const homePlayerDict = {};
  for (const playerObj of result.data.response[0].lineups[0].startXI) {
    homePlayerDict[playerObj.player.grid] = playerObj.player.name;
  }

  const awayPlayerDict = {};
  for (const playerObj of result.data.response[0].lineups[1].startXI) {
    awayPlayerDict[playerObj.player.grid] = playerObj.player.name;
  }
  console.log("DICT", awayPlayerDict);

  homeLineup.value = { formation: homeLineupArray, playerDict: homePlayerDict };
  awayLineup.value = { formation: awayLineupArray, playerDict: awayPlayerDict };
};

getData();
</script>

<style scoped>
.scoreboard {
  max-width: 60rem;
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
h2,
h3 {
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

.league {
  display: flex;
  align-items: center;
}

.league > img {
  height: 2rem;
  width: 2rem;
  margin: 0.5rem 1rem 0.5rem 0;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

.lineups {
  max-width: 60rem;
  height: 70rem;
  margin: auto;
  margin-top: 1rem;
  background-color: #ffffff;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.lineupsTop {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lineupsTopLeft,
.lineupsTopRight {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0.5rem 1rem;
}

.lineupsTopLeft > *,
.lineupsTopRight > * {
  margin: 0.5rem;
}

.lineupsTopRight {
  justify-content: flex-end;
}

.lineupsTopLeft > img,
.lineupsTopRight > img {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

.formation {
  color: black;
  background-color: #ebebeb;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  border-radius: 10px;
  white-space: nowrap;
}

.pitch {
  background-color: #00935c;
  height: 35rem;
  width: 100%;
  display: flex;
}

.leftPitch,
.rightPitch {
  flex: 1;
  border: #0c9f67 3px solid;
  display: flex;
}

.pitchColumn {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.player {
  height: 2rem;
  width: 2rem;
  margin: 1rem;
  background-color: #ea0000;
  border-radius: 50px;
}

.goalie {
  background-color: coral;
}

* {
  font-family: "Roboto", sans-serif;
}
</style>

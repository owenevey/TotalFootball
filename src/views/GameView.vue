<template>
  <div class="mainColumn">
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
          <div v-for="event in events">
            <p
              v-if="event.team === 'home' && event.type === 'Goal'"
              class="nameGoals"
            >
              {{ event.player.split(" ").slice(-1)[0] }} {{ event.time + "'" }}
            </p>
          </div>
        </div>
        <div class="score">
          <h1 v-if="game.fixture.status.short !== 'NS'">{{ game.goals.home }} - {{ game.goals.away }}</h1>
          <h1 v-else>{{ new Date(game.fixture.date).toLocaleTimeString('en-US', {timeStyle: 'short'}) }}</h1>
          <p>{{ game.fixture.status.long }}</p>
        </div>
        <div class="rightRow">
          <div class="rightTeamName">
            <img :src="game.teams.away.logo" />
            <h2>{{ game.teams.away.name }}</h2>
          </div>
          <div v-for="event in events">
            <p
              v-if="event.team === 'away' && event.type === 'Goal'"
              class="nameGoals"
            >
              {{ event.player.split(" ").slice(-1)[0] }} {{ event.time + "'" }}
            </p>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="bottomRow">
        <p>{{ new Date(game.fixture.date).toLocaleDateString('en-US') }} {{ new Date(game.fixture.date).toLocaleTimeString('en-US', {timeStyle: 'short'}) }}</p>
        <p>{{ game.fixture.venue.name }}</p>
        <p>{{ game.fixture.referee }}</p>
      </div>
    </div>
    <div class="lineups">
      <div class="lineupsTop">
        <div v-if="hasLineups" class="lineupsTopLeft">
          <img :src="game.teams.home.logo" />
          <p class="formation">{{ game.lineups[0].formation }}</p>
          <h3>{{ game.teams.home.name }}</h3>
        </div>
        <h3 style="font-weight: 500">Lineups</h3>
        <div v-if="hasLineups" class="lineupsTopRight">
          <h3>{{ game.teams.away.name }}</h3>
          <p class="formation">{{ game.lineups[1].formation }}</p>
          <img :src="game.teams.away.logo" />
        </div>
      </div>
      <div class="divider"></div>
      <Pitch :home-lineup="homeLineup" :away-lineup="awayLineup" :hasLineups="hasLineups" />
      <div class="divider"></div>
      <div class="lineupsTop">
        <div v-if="hasLineups" class="lineupsTopLeft">
          <img :src="game.lineups[0].coach.photo" class="circleImage" />
          <h3>{{ game.lineups[0].coach.name }}</h3>
        </div>
        <h3 style="font-weight: 500">Coach</h3>
        <div v-if="hasLineups" class="lineupsTopRight">
          <h4>{{ game.lineups[1].coach.name }}</h4>
          <img :src="game.lineups[1].coach.photo" class="circleImage" />
        </div>
      </div>
    </div>
    <div class="matchStats">
      <h3 style="font-weight: 500">Match Stats</h3>
      <div class="divider"></div>
      <div class="statRow" v-for="(stat, key) of Object.entries(stats)">
        <h4>{{ stat[0] }}</h4>
        <div class="statsBar">
          <p class="stat">{{ stat[1][0] }}</p>
          <div class="leftBar">
            <div
              class="leftBarInside"
              :style="{
                width: (stat[1][0] / stat[1][2]) * 100 + '%',
                backgroundColor:
                  '#' + game.lineups[0].team.colors.player.primary,
              }"
            ></div>
          </div>
          <div class="rightBar">
            <div
              class="rightBarInside"
              :style="{
                width: (stat[1][1] / stat[1][2]) * 100 + '%',
                backgroundColor:
                  '#' + game.lineups[1].team.colors.player.primary,
              }"
            ></div>
          </div>
          <p class="stat">{{ stat[1][1] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Pitch from "../components/Pitch.vue";

const route = useRoute();

const game = ref(null);
const hasLineups = ref(null);
const homeLineup = ref(null);
const awayLineup = ref(null);
const stats = ref({});
const events = ref(null);

function parseStat(stat) {
  if (typeof stat === "string") {
    if (stat.slice(-1) === "%") {
      stat = Number(stat.slice(0, -1));
    } else {
      stat = Number(stat);
    }
  } else if (!stat) {
    stat = 0;
  }
  return stat;
}

function parseStatName(name) {
  switch (name) {
    case "Shots insidebox":
      return "Shots Inside the Box";
    case "Shots outsidebox":
      return "Shots Outside the Box";
    case "Passes accurate":
      return "Accurate Passes";
    case "Passes %":
      return "Pass Completion Percentage";
    case "expected_goals":
      return "Expected Goals (xG)";
  }
  return name;
}

const getData = async () => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?id=${route.query.id}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  console.log("result", result);
  game.value = result.data.response[0];

  hasLineups.value = game.value.lineups.length > 0;

  if (hasLineups.value) {
    const resultHomeLineup = result.data.response[0].lineups[0];

    const homePlayerDict = {};
    for (const playerObj of resultHomeLineup.startXI) {
      if (playerObj.player.grid.substring(0, 1) in homePlayerDict) {
        homePlayerDict[playerObj.player.grid.substring(0, 1)].push({
          name: playerObj.player.name,
          number: playerObj.player.number,
          kitColor:
            playerObj.player.pos === "G"
              ? "#" + resultHomeLineup.team.colors.goalkeeper.primary
              : "#" + resultHomeLineup.team.colors.player.primary,
          numberColor:
            playerObj.player.pos === "G"
              ? "#" + resultHomeLineup.team.colors.goalkeeper.number
              : "#" + resultHomeLineup.team.colors.player.number,
        });
      } else {
        homePlayerDict[playerObj.player.grid.substring(0, 1)] = [
          {
            name: playerObj.player.name,
            number: playerObj.player.number,
            kitColor:
              playerObj.player.pos === "G"
                ? "#" + resultHomeLineup.team.colors.goalkeeper.primary
                : "#" + resultHomeLineup.team.colors.player.primary,
            numberColor:
              playerObj.player.pos === "G"
                ? "#" + resultHomeLineup.team.colors.goalkeeper.number
                : "#" + resultHomeLineup.team.colors.player.number,
          },
        ];
      }
    }
    homeLineup.value = homePlayerDict;

    const resultAwayLineup = result.data.response[0].lineups[1];

    const awayPlayerDict = {};
    for (const playerObj of resultAwayLineup.startXI) {
      if (playerObj.player.grid.substring(0, 1) in awayPlayerDict) {
        awayPlayerDict[playerObj.player.grid.substring(0, 1)].push({
          name: playerObj.player.name,
          number: playerObj.player.number,
          kitColor:
            playerObj.player.pos === "G"
              ? "#" + resultAwayLineup.team.colors.goalkeeper.primary
              : "#" + resultAwayLineup.team.colors.player.primary,
          numberColor:
            playerObj.player.pos === "G"
              ? "#" + resultAwayLineup.team.colors.goalkeeper.number
              : "#" + resultAwayLineup.team.colors.player.number,
        });
      } else {
        awayPlayerDict[playerObj.player.grid.substring(0, 1)] = [
          {
            name: playerObj.player.name,
            number: playerObj.player.number,
            kitColor:
              playerObj.player.pos === "G"
                ? "#" + resultAwayLineup.team.colors.goalkeeper.primary
                : "#" + resultAwayLineup.team.colors.player.primary,
            numberColor:
              playerObj.player.pos === "G"
                ? "#" + resultAwayLineup.team.colors.goalkeeper.number
                : "#" + resultAwayLineup.team.colors.player.number,
          },
        ];
      }
    }
    awayLineup.value = awayPlayerDict;
  

  const eventsList = [];

  for (const event of game.value.events) {
    eventsList.push({
      time: event.time.elapsed + (event.time.extra ?? 0),
      type: event.type,
      player: event.player.name,
      team: event.team.name === game.value.teams.home.name ? "home" : "away",
    });
  }

  events.value = eventsList;
  console.log("events", events.value);

  const matchStats = {};
  for (const statsObj of game.value.statistics[0].statistics) {
    matchStats[parseStatName(statsObj.type)] = [parseStat(statsObj.value)];
  }

  for (const statsObj of game.value.statistics[1].statistics) {
    matchStats[parseStatName(statsObj.type)].push(parseStat(statsObj.value));
    matchStats[parseStatName(statsObj.type)].push(
      matchStats[parseStatName(statsObj.type)][0] +
        matchStats[parseStatName(statsObj.type)][1]
    );
  }
  stats.value = matchStats;
}
};

getData();
</script>

<style scoped>
.mainColumn {
  max-width: 60rem;
  margin: auto;
  margin-top: 2rem;
}
.scoreboard {
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
  padding-bottom: 1rem;
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

.leftTeamName > img,
.leftTeamName > h2 {
  padding-left: 1rem;
}

.rightTeamName > img,
.rightTeamName > h2 {
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
  padding-top: 0.5rem;
}

.score > * {
  margin: 0.5rem;
  text-align: center;
}

h1,
h2,
h3,
h4 {
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

.bottomRow > p {
  text-align: center;
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

.circleImage {
  border-radius: 50%;
}

.matchStats {
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statsBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1rem;
  margin-bottom: 2rem;
}

.leftBar {
  height: 0.5rem;
  width: 42%;
  background-color: #ebf0f7;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  display: flex;
  justify-content: flex-end;
}

.rightBar {
  height: 0.5rem;
  width: 42%;
  background-color: #ebf0f7;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
}

.leftBarInside {
  height: 0.5rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-right: 0;
}

.rightBarInside {
  height: 0.5rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-left: 0;
}

.statRow {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stat {
  width: 2rem;
  padding: 2rem;
  color: black;
  text-align: center;
}

* {
  font-family: "Rubik", sans-serif;
}
</style>

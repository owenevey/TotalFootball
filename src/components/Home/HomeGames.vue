<template>
  <div id="gamesContainer">
    <div id="dateRow">
      <div id="previousDay" @click="fetchPreviousDay()">
        <img class="chevron" src="../../assets/ChevronLeft.svg" />
      </div>
      <h3 id="dateTitle">{{ currentDateString }}</h3>
      <div id="nextDay" @click="fetchNextDay()">
        <img class="chevron" src="../../assets/ChevronRight.svg" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="leagueContainer" v-for="(fixtures, league) in gameData">
      <div class="leagueTitleRow">
        <img
          class="leagueFlag"
          :src="fixtures[0].league.flag ?? fixtures[0].league.logo"
        />
        <h4 class="leagueTitle">{{ league }}</h4>
      </div>
      <HomeGameItem
        v-for="game in fixtures"
        :game="game"
        @click="selectGame(game.fixture.id)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  leagues: Object,
});

import { ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeGameItem from "./HomeGameItem.vue";
import axios from "axios";

const { leagues } = toRefs(props);

const router = useRouter();
const route = useRoute();

const gameData = ref(null);

var currentDay = "";
if (route.params.date) {
  currentDay = route.params.date;
} else {
  currentDay = getTodaysDate();
}

const currentDate = ref(currentDay);
const currentDateString = ref(getCurrentDayString(currentDay));

function getTodaysDate() {
  var date = new Date();

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

function getCurrentDayString() {
  var currentYear = currentDate.value.substring(0, 4);
  var currentMonth = currentDate.value.substring(5, 7);
  var currentDay = currentDate.value.substring(8);

  let date = new Date(currentYear, currentMonth - 1, currentDay);

  return date.toLocaleString("en-US", { dateStyle: "full" }).slice(0, -6);
}

function getPreviousDate() {
  var currentYear = currentDate.value.substring(0, 4);
  var currentMonth = currentDate.value.substring(5, 7);
  var currentDay = currentDate.value.substring(8);

  let date = new Date(currentYear, currentMonth - 1, currentDay);
  date.setDate(date.getDate() - 1);

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = year + "-" + month + "-" + day;
  console.log(formattedDate);
  return formattedDate;
}

function getNextDate() {
  var currentYear = currentDate.value.substring(0, 4);
  var currentMonth = currentDate.value.substring(5, 7);
  var currentDay = currentDate.value.substring(8);

  let date = new Date(currentYear, currentMonth - 1, currentDay);
  date.setDate(date.getDate() + 1);

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = year + "-" + month + "-" + day;
  console.log(formattedDate);
  return formattedDate;
}

const fetchGames = async (date) => {
  const fixtures = {};
  for (const [name, id] of Object.entries(leagues.value)) {
    const result = await axios.get(
      `https://v3.football.api-sports.io/fixtures?season=2023&league=${id}&from=${date}&to=${date}`,
      { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
    );
    console.log(name, result);
    if (result.data.response.length > 0) {
      fixtures[name] = result.data.response;
    }
  }
  gameData.value = fixtures;
};

const fetchPreviousDay = () => {
  router.push({
    name: "home",
    params: { date: getPreviousDate() },
  });
};

const fetchNextDay = () => {
  router.push({
    name: "home",
    params: { date: getNextDate() },
  });
};

const selectGame = (id) => {
  router.push({
    name: "game",
    query: { id: id },
  });
};

fetchGames(currentDate.value);
</script>

<style scoped>
#gamesContainer {
  background-color: #ffffff;
  height: fit-content;
  border-radius: 15px;
}

#dateRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#previousDay,
#nextDay {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 1rem;
  cursor: pointer;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chevron {
  height: 1rem;
}

#dateTitle {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

.leagueContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 1.5rem 1rem 1.5rem;
}

.leagueContainer > * {
  margin: 0.5rem;
}

.leagueTitleRow {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.leagueFlag {
  margin-right: 1rem;
  border-radius: 50%;
  object-fit: cover;
  width: 2rem;
  height: 2rem;
}

.leagueTitle {
  font-weight: 500;
}
</style>

<template>
  <main>
    <div class="homeContainer">
      <div class="homeLeagues">
        <h3>Top Leagues</h3>
        <div class="homeLeagueItemsContainer">
          <LeagueItem
            v-for="(id, leagueName) in leagues"
            :name="leagueName"
            :isActive="league === leagueName"
          />
        </div>
      </div>
      <div class="homeGames">
        <div class="dateRow">
          <div class="previousDay" @click="fetchPreviousDay()">
            <img src="../assets/ChevronLeft.svg" class="chevron" />
          </div>
          <h3>{{ currentDateString }}</h3>
          <div class="nextDay" @click="fetchNextDay()">
            <img src="../assets/ChevronRight.svg" class="chevron" />
          </div>
        </div>
        <div class="divider"></div>
        <div
          class="homeGameItemsContainer"
          v-for="(fixtures, league) in gameData"
        >
          <div class="homeLeagueTitle">
            <img :src="fixtures[0].league.flag" class="flag" />
            <h4>{{ league }}</h4>
          </div>
          <GameItem
            v-for="game in fixtures"
            :game="game"
            @click="selectGame(game.fixture.id)"
          />
        </div>
      </div>
      <div class="homeNews">
        <h3>News</h3>
        <div class="homeNewsItemsContainer">
          <NewsItem
            v-for="(file, title) in articles"
            :title="title"
            :imageName="file"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import GameItem from "../components/GameItem.vue";
import LeagueItem from "../components/LeagueItem.vue";
import NewsItem from "../components/NewsItem.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

watch(route, (newValue, oldValue) => {
  router.go();
});

var currentDay = "asdf";
if (route.params.date) {
  currentDay = route.params.date;
} else {
  currentDay = getTodaysDate();
}

const gameData = ref(null);
const league = ref(route.query.league ?? "Premier League");

const leagues = {
  "Premier League": 39,
  "La Liga": 140,
  Bundesliga: 78,
  "Serie A": 135,
  "Ligue 1": 61,
};

const articles = {
  "Ronaldo Scores Hat Trick in Portugal win vs Uruguay": "ronaldo.jpg",
  "Pochettino has Chelsea in top form": "poch.jpg",
  "Real madrid 2 - Barcelona 1: Highlights": "el_clasico.jpg",
  "Newcastle thumps PSG in Group of Death Matchup": "newcastle.jpg",
};

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
  for (const [name, id] of Object.entries(leagues)) {
    const result = await axios.get(
      `https://v3.football.api-sports.io/fixtures?season=2023&league=${id}&from=${date}&to=${date}`,
      { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
    );
    console.log("result", result);
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
main {
  margin: 2rem;
}
.homeContainer {
  display: grid;
  grid-template-columns: 16rem auto 20rem;
  column-gap: 2rem;
  margin: auto;
  max-width: 83rem;
}

.dateRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.previousDay,
.nextDay {
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

h3 {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0px;
}

h4 {
  font-weight: 400;
}

img {
  object-fit: contain;
  width: 2rem;
  height: 2rem;
}

.flag {
  margin-right: 1rem;
  border-radius: 50%;
  object-fit: cover;
}

.homeLeagueTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.homeLeagues,
.homeGames,
.homeNews {
  border-radius: 15px;
  background-color: #ffffff;
  height: fit-content;
}

.homeLeagueItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1rem 1rem 1rem;
}

.homeGameItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 1.5rem 1rem 1.5rem;
}

.homeNewsItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem 1rem 1rem 1rem;
}

.homeGameItemsContainer > *,
.homeLeagueItemsContainer > *,
.homeNewsItemsContainer > * {
  margin: 0.5rem;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

@media (max-width: 1300px) {
  .homeContainer {
    grid-template-columns: 16rem auto;
  }
  .homeNews {
    display: none;
  }
}

@media (max-width: 1000px) {
  .homeContainer {
    grid-template-columns: auto;
  }
  .homeLeagues {
    display: none;
  }
}

* {
  font-family: "Rubik", sans-serif;
}
</style>

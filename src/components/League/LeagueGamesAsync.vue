<template>
  <div id="gamesContainer">
    <div id="dateRow">
      <div id="previousDay" @click="fetchPreviousDay()">
        <span class="material-symbols-outlined">chevron_left</span>
      </div>
      <h3 id="dateTitle">{{ currentDateString }}</h3>
      <div id="nextDay" @click="fetchNextDay()">
        <span class="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
    <div class="divider"></div>
    <div id="scrollContainer">
      <div id="gameItemsContainer">
        <HomeGameItem
          v-for="game in gameData"
          :game="game"
          @click="selectGame(game.fixture.id)"
        />
        <div id="noGamesContainer" v-if="Object.keys(gameData).length === 0">
          <h4 id="noGamesText">No Games This Day</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeGameItem from "../Home/HomeGameItem.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const gameData = ref({});

var currentDay = "";
if (route.query.date) {
  currentDay = route.query.date;
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

function getDifferentDate(dayOffset) {
  var currentYear = currentDate.value.substring(0, 4);
  var currentMonth = currentDate.value.substring(5, 7);
  var currentDay = currentDate.value.substring(8);

  let date = new Date(currentYear, currentMonth - 1, currentDay);
  date.setDate(date.getDate() + dayOffset);

  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

const fetchGames = async (date) => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/fixtures?season=2023&league=${route.params.id}&from=${date}&to=${date}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  gameData.value = result.data.response;
  console.log(result.data.response);
};

const fetchPreviousDay = () => {
  router.push({
    name: "league",
    params: { id: route.params.id },
    query: { date: getDifferentDate(-1) },
  });
};

const fetchNextDay = () => {
  router.push({
    name: "league",
    params: { id: route.params.id },
    query: { date: getDifferentDate(+1) },
  });
};

const selectGame = (id) => {
  router.push({
    name: "game",
    query: { id: id },
  });
};

await fetchGames(currentDate.value);
</script>

<style scoped>
#gamesContainer {
  flex: 2.5;
  background-color: #ffffff;
  height: 100%;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  box-sizing: border-box;
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

.material-symbols-outlined {
  font-variation-settings: "FILL" 200, "wght" 400, "GRAD" 0, "opsz" 24;
}

#previousDay:hover,
#nextDay:hover {
  background-color: #1a1a1a;
}

#previousDay:hover .material-symbols-outlined,
#nextDay:hover .material-symbols-outlined {
  color: white;
}

#dateTitle {
  font-weight: 500;
  margin: 0;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

#scrollContainer {
  height: calc(100% - 66px);
  width: 100%;
  overflow: scroll;
}

#gameItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin: 1rem 1.5rem;
}

#noGamesContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#noGamesText {
  font-weight: 400;
}

@media (max-width: 1100px) {
  #gamesContainer {
    width: 100%;
  }
}
</style>

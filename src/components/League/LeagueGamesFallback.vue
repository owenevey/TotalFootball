<template>
  <div id="gamesContainer">
    <div id="dateRow">
      <div id="previousDay">
        <span class="material-symbols-outlined">chevron_left</span>
      </div>
      <h3 id="dateTitle">{{ currentDateString }}</h3>
      <div id="nextDay">
        <span class="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
    <div class="divider"></div>
    <div id="gameItemsContainer">
      <div class="fallbackGameItem shimmer"></div>
      <div class="fallbackGameItem shimmer"></div>
      <div class="fallbackGameItem shimmer"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  leagueID: String,
});

import { ref } from "vue";
import { useRoute,  } from "vue-router";

const route = useRoute();

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
</script>

<style scoped>
#gamesContainer {
  flex: 2.5;
  background-color: #ffffff;
  height: 20.8rem;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
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
  padding: 1.3rem;
  margin: 0;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

#gameItemsContainer {
  height: 16.7rem;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#gameItemsContainer > * {
  margin-top: 1rem;
}

#noGamesContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 100%;
}

#noGamesText {
  font-weight: 400;
}

.fallbackGameItem {
  height: 4rem;
  width: 95%;
  border-radius: 15px;
}

.shimmer {
  background: linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
}

@keyframes shimmer {
  to {
    background-position-x: 0%;
  }
}

@media (max-width: 1000px) {
  #gamesContainer {
    width: 100%;
  }
}
</style>

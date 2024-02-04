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
        <div class="homeGameItemFallback shimmer"></div>
        <div class="homeGameItemFallback shimmer"></div>
        <div class="homeGameItemFallback shimmer"></div>
        <div class="homeGameItemFallback shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
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
</script>

<style scoped>
#gamesContainer {
  flex: 1;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  min-width: fit-content;
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
  flex-shrink: 0;
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
  white-space: nowrap;
  margin: 0;
}

.divider {
  background-color: #f0f0f0;
  width: 100%;
  height: 2px;
}

#scrollContainer {
  height: calc(100% - 66px);
  width: 100%;
  overflow-y: scroll;
}

#gameItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;
  gap: 0.5rem;
}

.homeGameItemFallback {
  height: 4rem;
  width: 100%;
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

@media (max-width: 420px) {
  #gameItemsContainer {
    margin: 1rem 0.5rem;
  }
}
</style>

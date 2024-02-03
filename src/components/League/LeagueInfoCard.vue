<template>
  <div id="leagueInfoContainer">
    <div class="infoRow">
      <img class="infoImage" :src="leagueData.logo" />
      <div>
        <h4 class="secondaryText">League</h4>
        <h2 class="primaryText">{{ leagueData.name }}</h2>
      </div>
    </div>

    <div class="infoRow">
      <img v-if="leagueData.flag" class="infoImage" :src="leagueData.flag" />
      <span v-else class="infoImage material-symbols-outlined"> public </span>
      <div>
        <h4 class="secondaryText">Country</h4>
        <h2 class="primaryText">{{ leagueData.country }}</h2>
      </div>
    </div>

    <div class="infoRow">
      <span class="infoImage material-symbols-outlined"> groups </span>
      <div>
        <h4 class="secondaryText">Size</h4>
        <h2 class="primaryText">
          {{ leagueData.standings.flat(Infinity).length }} Teams
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const leagueData = ref(null);

const route = useRoute();

const fetchData = async (id) => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/standings?league=${id}&season=2023`,
    { headers: { "x-apisports-key": import.meta.env.VITE_APP_FOOTBALL_API_KEY } }
  );
  leagueData.value = result.data.response[0].league;
};

await fetchData(route.params.id);
</script>

<style scoped>
#leagueInfoContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem;
  height: 100%;
  /* min-width: 15rem; */
  box-sizing: border-box;
}

.infoRow {
  gap: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.infoImage {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}

.material-symbols-outlined {
  font-size: 3rem;
}

.secondaryText {
  font-weight: 400;
  color: gray;
  margin: 0;
}

.primaryText {
  font-weight: 400;
  margin: 0;
}

@media (max-width: 900px) {
  #leagueInfoContainer {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }

  .infoRow {
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 0;
  }

  .primaryText,
  .secondaryText {
    text-align: center;
  }
}

@media (max-width: 450px) {
  .primaryText {
    font-size: large;
  }
}
</style>

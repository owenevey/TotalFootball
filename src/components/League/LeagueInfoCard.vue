<template>
  <div id="leagueInfoContainer">
    <div id="rowsContainer">
        <div class="infoRow">
          <img class="infoImage" :src="leagueData.logo" />
          <div>
            <h4 class="secondaryText">League</h4>
            <h2 class="primaryText">{{ leagueData.name }}</h2>
          </div>
      </div>
        <div class="infoRow">
          <img
            v-if="leagueData.flag"
            class="infoImage"
            :src="leagueData.flag"
          />
          <span v-else class="infoImage material-symbols-outlined">
            public
          </span>
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
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  leagueData.value = result.data.response[0].league;
};

await fetchData(route.params.id);
</script>

<style scoped>
#leagueInfoContainer {
  flex: 1;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  height: 20.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
}

#rowsContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.infoRowContainer {
  flex: 1;
}

.infoRow {
  flex: 1;
  margin: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
}

.infoImage {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-right: 1rem;
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

@media (max-width: 1100px) {
  #leagueInfoContainer {
    margin-right: unset;
    margin-bottom: 1rem;
    width: 100%;
  }

  #rowsContainer {
    flex-direction: row;
    justify-content: space-between;
    min-width: 90%;
  }
}

@media (max-width: 750px) {
.infoRowContainer {
  display: flex;
  justify-content: center;
  align-self: center;
}
  .infoRow {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

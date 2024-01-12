<template>
  <main>
    <div id="leagueContainer">
      <div id="topContainer">
        <LeagueInfoRow :league="leagueData" />
        <Suspense>
          <LeagueGamesAsync :leagueID="route.params.id" />
          <template #fallback>
            <LeagueGamesFallback />
          </template>
        </Suspense>
      </div>
      <LeagueTable :league="leagueData" />
    </div>
  </main>
</template>

<script setup>
import { watch } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import LeagueInfoRow from "../components/League/LeagueInfoRow.vue";
import LeagueGamesAsync from "../components/League/LeagueGamesAsync.vue";
import LeagueGamesFallback from "../components/League/LeagueGamesFallback.vue";
import LeagueTable from "../components/League/LeagueTable.vue";

const route = useRoute();
const router = useRouter();

watch(route, (newValue, oldValue) => {
  router.go();
});

const leagueData = ref(null);

const fetchData = async (id) => {
  const result = await axios.get(
    `https://v3.football.api-sports.io/standings?league=${id}&season=2023`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );

  leagueData.value = result.data.response[0].league;

  console.log("result", result.data.response[0].league);
};

fetchData(route.params.id);
</script>

<style scoped>
main {
  margin: 1rem;
}

#leagueContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80rem;
  margin: auto;
}

#topContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

@media (max-width: 1000px) {
  #topContainer {
    flex-direction: column;
  }
}

@media (max-width: 800px) {
  main {
    margin: 1rem 0;
  }
}
</style>

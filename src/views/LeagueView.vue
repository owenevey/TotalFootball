<template>
  <main>
    <div id="leagueContainer">
      <div id="topContainer">
        <Suspense>
          <LeagueInfoCard />
          <template #fallback>
            <LeagueInfoCardFallbackVue />
          </template>
        </Suspense>
        <Suspense>
          <LeagueGamesAsync />
          <template #fallback>
            <LeagueGamesFallback />
          </template>
        </Suspense>
      </div>
      <Suspense>
        <LeagueTable />
        <template #fallback>
          <LeagueTableFallback />
        </template>
      </Suspense>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LeagueInfoCard from "../components/League/LeagueInfoCard.vue";
import LeagueInfoCardFallbackVue from "../components/League/LeagueInfoCardFallback.vue";
import LeagueGamesAsync from "../components/League/LeagueGamesAsync.vue";
import LeagueGamesFallback from "../components/League/LeagueGamesFallback.vue";
import LeagueTable from "../components/League/LeagueTable.vue";
import LeagueTableFallback from "../components/League/LeagueTableFallback.vue";
import BottomNav from "../components/BottomNav.vue";

const route = useRoute();
const router = useRouter();

watch(route, (newValue, oldValue) => {
  router.go();
});
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
  max-width: 70rem;
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

@media (max-width: 1100px) {
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

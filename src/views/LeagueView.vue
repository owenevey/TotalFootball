<template>
  <main>
    <div id="contentContainer">
      <div id="leagueContainer">
        <div id="topContainer">
          <Suspense>
            <LeagueInfoCardAsync />
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
          <LeagueTableAsync />
          <template #fallback>
            <LeagueTableFallback />
          </template>
        </Suspense>
      </div>

      <Suspense>
        <BottomNewsAsync />
        <template #fallback>
          <BottomNewsFallback />
        </template>
      </Suspense>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LeagueInfoCardAsync from "../components/League/LeagueInfoCardAsync.vue";
import LeagueInfoCardFallbackVue from "../components/League/LeagueInfoCardFallback.vue";
import LeagueGamesAsync from "../components/League/LeagueGamesAsync.vue";
import LeagueGamesFallback from "../components/League/LeagueGamesFallback.vue";
import LeagueTableAsync from "../components/League/LeagueTableAsync.vue";
import LeagueTableFallback from "../components/League/LeagueTableFallback.vue";
import BottomNav from "../components/Common/BottomNav.vue";
import BottomNewsAsync from "../components/Common/BottomNewsAsync.vue";
import BottomNewsFallback from "../components/Common/BottomNewsFallback.vue";

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

#contentContainer {
  max-width: 70rem;
  margin: auto;
}

#leagueContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

#topContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18.9rem;
  gap: 1rem;
}

@media (max-width: 900px) {
  #topContainer {
    flex-direction: column;
    height: fit-content;
  }
}

@media (max-width: 800px) {
  main {
    margin: 1rem 0.5rem;
  }
}
</style>

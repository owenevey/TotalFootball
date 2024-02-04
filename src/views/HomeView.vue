<template>
  <main>
    <div id="homeContainer">
      <HomeLeagues id="leaguesContainer" :leagues="leagues" />

      <Suspense>
        <HomeGamesAsync :leagues="leagues" />
        <template #fallback>
          <HomeGamesFallback />
        </template>
      </Suspense>

      <Suspense>
        <HomeNewsAsync id="newsContainer" />
        <template #fallback>
          <HomeNewsFallback id="newsContainer" />
        </template>
      </Suspense>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeLeagues from "../components/Home/HomeLeagues.vue";
import HomeGamesAsync from "../components/Home/HomeGamesAsync.vue";
import HomeGamesFallback from "../components/Home/HomeGamesFallback.vue";
import HomeNewsAsync from "../components/Home/HomeNewsAsync.vue";
import HomeNewsFallback from "../components/Home/HomeNewsFallback.vue";
import BottomNav from "../components/Navigation/BottomNav.vue";

const router = useRouter();
const route = useRoute();

watch(route, (newValue, oldValue) => {
  router.go();
});

const leagues = {
  "Premier League": 39,
  "La Liga": 140,
  Bundesliga: 78,
  "Serie A": 135,
  "Ligue 1": 61,
  "UEFA Champions League": 2,
  "UEFA Europa League": 3,
  Eredivisie: 88,
  "Primeira Liga": 94,
  "Major League Soccer": 253,
  "Liga MX": 262,
  "Pro League": 307,
};
</script>

<style scoped>
main {
  margin: 1rem;
}

#homeContainer {
  display: grid;
  grid-template-columns: 16rem auto 20rem;
  column-gap: 1rem;
  margin: auto;
  max-width: 83rem;
}

@media (max-width: 1300px) {
  #homeContainer {
    grid-template-columns: 16rem auto;
  }
  #newsContainer {
    display: none;
  }
}

@media (max-width: 1000px) {
  #homeContainer {
    grid-template-columns: auto;
  }

  #leaguesContainer {
    display: none;
  }
}

@media (max-width: 700px) {
  main {
    margin: 1rem 0;
  }
}
</style>

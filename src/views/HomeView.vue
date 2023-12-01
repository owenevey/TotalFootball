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
        <h3>Today</h3>
        <div
          class="homeGameItemsContainer"
          v-for="(fixtures, league) in gameData"
        >
          <div class="homeLeagueTitle">
            <img :src="fixtures[0].league.flag" />
            <h4>{{ league }}</h4>
          </div>
          <GameItem
            v-for="game in fixtures"
            :game="game"
            @click="
              selectGame(game.teams.home, game.teams.away, game.fixture.id)
            "
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import GameItem from "../components/GameItem.vue";
import LeagueItem from "../components/LeagueItem.vue";
import NewsItem from "../components/NewsItem.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

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

const fetchGames = async () => {
  const fixtures = {};

  for (const [name, id] of Object.entries(leagues)) {
    const result = await axios.get(
      `https://v3.football.api-sports.io/fixtures?season=2023&league=${id}&from=2023-11-26&to=2023-11-26`,
      { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
    );
    console.log(result);
    fixtures[name] = result.data.response;
  }
  gameData.value = fixtures;
};

const selectGame = (homeTeam, awayTeam, id) => {
  router.push({
    name: "game",
    params: { homeTeam: homeTeam.name, awayTeam: awayTeam.name },
    query: { gameID: id },
  });
};

fetchGames();
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
  padding-right: 1rem;
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
  font-family: "Roboto", sans-serif;
}
</style>

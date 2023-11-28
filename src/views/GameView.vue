<template>
  <div class="gameContainer">
    <div class="gameScoreboard">
      <img :src="homeTeam.team.logo" />
      <p>vs</p>
      <img :src="awayTeam.team.logo" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const homeTeam = ref(null);
const awayTeam = ref(null);
const venueImage = ref(null);

const getTeamData = async () => {
  const home = await axios.get(
    `https://v3.football.api-sports.io/teams?id=${route.query.homeID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  homeTeam.value = home.data.response[0];

  const away = await axios.get(
    `https://v3.football.api-sports.io/teams?id=${route.query.awayID}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  awayTeam.value = away.data.response[0];

  const homeVenue = await axios.get(
    `https://v3.football.api-sports.io/venues?id=${homeTeam.value.venue.id}`,
    { headers: { "x-apisports-key": "40aeba2773c22a5e9fa2a99c765cd909" } }
  );
  venueImage.value = homeVenue.data.response[0].image;
};

getTeamData();
</script>

<style scoped>
.gameContainer {
  width: 50rem;
  margin: auto;
}

.gameScoreboard {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 75%;
  margin: auto;
}

img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}

p {
    margin: 2rem;
}
.venueImage {
  width: 100%;
  height: 30rem;
  object-fit: cover;
}

* {
  font-family: "Roboto", sans-serif;
}
</style>

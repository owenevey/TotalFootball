<template>
  <div class="scoreboard">
    <div class="league">
      <img :src="game.league.logo" />
      <p class="round">{{ game.league.round }}</p>
    </div>
    <div class="divider"></div>
    <div class="mainRow">
      <div class="leftRow">
        <div class="leftTeamName">
          <h2>{{ game.teams.home.name }}</h2>
          <img :src="game.teams.home.logo" />
        </div>
        <div v-for="event in events">
          <p
            v-if="event.team === 'home' && event.type === 'Goal'"
            class="nameGoals"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
      <div class="score">
        <h1 v-if="game.fixture.status.short !== 'NS'">
          {{ game.goals.home }} - {{ game.goals.away }}
        </h1>
        <h1 v-else>
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </h1>
        <p>{{ game.fixture.status.long }}</p>
      </div>
      <div class="rightRow">
        <div class="rightTeamName">
          <img :src="game.teams.away.logo" />
          <h2>{{ game.teams.away.name }}</h2>
        </div>
        <div v-for="event in events">
          <p
            v-if="event.team === 'away' && event.type === 'Goal'"
            class="nameGoals"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="bottomRow">
      <p>
        {{ new Date(game.fixture.date).toLocaleDateString("en-US") }}
        {{
          new Date(game.fixture.date).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })
        }}
      </p>
      <p>{{ game.fixture.venue.name }}</p>
      <p>{{ game.fixture.referee }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
});

import { ref, toRefs } from 'vue';

const { game } = toRefs(props);
const events = ref(null);

const eventsList = [];

for (const event of game.value.events) {
  eventsList.push({
    time: event.time.elapsed + (event.time.extra ?? 0),
    type: event.type,
    player: event.player.name,
    team: event.team.name === game.value.teams.home.name ? "home" : "away",
  });
}

events.value = eventsList;
</script>

<style scoped>
.scoreboard {
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mainRow {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 1rem;
}

.leftRow {
  flex: 1;
  text-align: right;
  margin-top: 0.5rem;
}

.leftTeamName,
.rightTeamName {
  display: flex;
  align-items: center;
}

.leftTeamName {
  justify-content: flex-end;
}

.rightTeamName {
  justify-content: flex-start;
}

.leftTeamName > img,
.leftTeamName > h2 {
  padding-left: 1rem;
}

.rightTeamName > img,
.rightTeamName > h2 {
  padding-right: 1rem;
}

.rightRow {
  flex: 1;
  text-align: left;
  margin-top: 0.5rem;
}

.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-top: 0.5rem;
}

.score > * {
  margin: 0.5rem;
  text-align: center;
}

.score > h1 {
  white-space: nowrap;
}

h1,
h2,
h3,
h4 {
  font-weight: 400;
}

hr {
  color: gray;
  border-top: 3px solid gray;
  width: 100%;
}

p {
  color: gray;
}

.bottomRow > p {
  text-align: center;
}

.nameGoals {
  font-size: small;
}

.round {
  color: black;
  font-size: smaller;
}

.bottomRow {
  display: flex;
  width: 80%;
  justify-content: center;
}
.bottomRow > p {
  padding-left: 1rem;
  padding-right: 1rem;
}

img {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}

.league {
  display: flex;
  align-items: center;
}

.league > img {
  height: 2rem;
  width: 2rem;
  margin: 0.5rem 1rem 0.5rem 0;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}
</style>

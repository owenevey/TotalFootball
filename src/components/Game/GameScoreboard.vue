<template>
  <div id="scoreboardContainer">
    <div id="league">
      <img id="leagueLogo" :src="game.league.logo" />
      <p id="leagueRound">{{ game.league.round }}</p>
    </div>
    <div class="divider"></div>
    <div id="mainRow">
      <div id="homeTeamColumn">
        <div id="homeTeamNameRow">
          <h2 id="homeTeamName">{{ game.teams.home.name }}</h2>
          <img id="homeTeamLogo" :src="game.teams.home.logo" />
        </div>
        <div v-for="event in events">
          <p
            v-if="event.team === 'home' && event.type === 'Goal'"
            class="scoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
      <div id="scoreColumn">
        <h1 class="score" v-if="game.fixture.status.short !== 'NS'">
          {{ game.goals.home }} - {{ game.goals.away }}
        </h1>
        <h1 class="score" v-else>
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </h1>
        <p id="gameStatus">{{ game.fixture.status.long }}</p>
      </div>
      <div id="awayTeamColumn">
        <div id="awayTeamNameRow">
          <img id="awayTeamLogo" :src="game.teams.away.logo" />
          <h2 id="awayTeamName">{{ game.teams.away.name }}</h2>
        </div>
        <div v-for="event in events">
          <p
            v-if="event.team === 'away' && event.type === 'Goal'"
            class="scoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div id="bottomRow">
      <p id="date">
        {{ new Date(game.fixture.date).toLocaleDateString("en-US") }}
        {{
          new Date(game.fixture.date).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })
        }}
      </p>
      <p id="venue">{{ game.fixture.venue.name }}</p>
      <p id="referee">{{ game.fixture.referee }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
});

import { ref, toRefs } from "vue";

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
#scoreboardContainer {
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#league {
  display: flex;
  align-items: center;
}

#leagueLogo {
  object-fit: contain;
  height: 2rem;
  width: 2rem;
  margin: 0.5rem 1rem 0.5rem 0;
}

#leagueRound {
  color: black;
  font-size: smaller;
}

#mainRow {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 1rem;
}

#homeTeamColumn {
  flex: 1;
  text-align: right;
  margin-top: 0.5rem;
}

#homeTeamNameRow {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#homeTeamName {
  font-weight: 400;
  padding-left: 1rem;
}

#homeTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-left: 1rem;
}

#awayTeamColumn {
  flex: 1;
  text-align: left;
  margin-top: 0.5rem;
}

#awayTeamNameRow {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#awayTeamName {
  font-weight: 400;
  padding-right: 1rem;
}

#awayTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-right: 1rem;
}

#scoreColumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  margin-left: 2rem;
  margin-right: 2rem;
  
  padding-top: 0.5rem;
}

.score {
  white-space: nowrap;
  margin: 0.5rem;
  text-align: center;
  font-weight: 400;
}

#gameStatus {
  color: gray;
  margin: 0.5rem;
  text-align: center;
}

.scoreboardGoal {
  font-size: small;
  color: gray;
}

#bottomRow {
  display: flex;
  width: 80%;
  justify-content: center;
}

#date,
#venue,
#referee {
  padding: 0 1rem;
  text-align: center;
  color: gray;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}
</style>

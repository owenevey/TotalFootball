<template>
  <div id="scoreboardContainer">
    <div id="topRow">
      <div id="backContainer">
        <div id="backButton" @click="goBack()">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
      </div>
      <div id="leagueContainer">
        <img id="leagueLogo" :src="game.league.logo" />
        <p id="leagueRound">{{ game.league.round }}</p>
      </div>
      <div id="emptyTopRight"></div>
    </div>

    <div class="divider"></div>

    <div id="mainRow">
      <div id="homeTeamColumn">
        <h2 id="homeTeamName">{{ game.teams.home.name }}</h2>
        <img id="homeTeamLogo" :src="game.teams.home.logo" />
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
        <img id="awayTeamLogo" :src="game.teams.away.logo" />
        <h2 id="awayTeamName">{{ game.teams.away.name }}</h2>
      </div>
    </div>

    <div id="goalsRow">
      <div id="homeGoalsColumn">
        <div v-for="event in events">
          <p
            v-if="event.team === 'home' && event.type === 'Goal'"
            class="awayScoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>

        <span id="dividerBallIcon" class="material-symbols-outlined"> sports_soccer </span>

      <div id="awayGoalsColumn">
        <div v-for="event in events">
          <p
            v-if="event.team === 'away' && event.type === 'Goal'"
            class="homeScoreboardGoal"
          >
            {{ event.player.split(" ").slice(-1)[0] }}
            {{ event.time + "'" }}
          </p>
        </div>
      </div>
    </div>

    <div id="bottomRowDivider" class="divider"></div>

    <div id="bottomRow">
      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> event </span>
        <p id="date">
          {{ new Date(game.fixture.date).toLocaleDateString("en-US") }}
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>

      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> stadium </span>
        <p id="venue">{{ game.fixture.venue.name }}</p>
      </div>

      <div class="bottomInfoItem">
        <span class="material-symbols-outlined"> sports </span>
        <p id="referee">{{ game.fixture.referee }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
  events: Object,
});

import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { game } = toRefs(props);

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
#scoreboardContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

#topRow {
  display: flex;
  align-items: center;
  width: 100%;
}

#backButton {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 0.75rem;
  cursor: pointer;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 200, "wght" 400, "GRAD" 0, "opsz" 24;
}

#backButton:hover {
  background-color: #1a1a1a;
}

#backButton:hover .material-symbols-outlined {
  color: white;
}

#leagueContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 1rem;
  margin: 0rem;
}

#leagueLogo {
  object-fit: contain;
  height: 2rem;
  width: 2rem;
}

#leagueRound {
  color: black;
  font-size: smaller;
  text-align: center;
}

#backContainer,
#emptyTopRight {
  flex: 1;
}

#mainRow {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
}

#homeTeamColumn {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

#homeTeamName,
#awayTeamName {
  font-weight: 400;
  margin: 0;
  padding: 0 0.5rem;
}

#homeTeamLogo,
#awayTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
}

#awayTeamColumn {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

#scoreColumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 0 2rem;
}

.score {
  white-space: nowrap;
  text-align: center;
  margin: 0;
  font-weight: 400;
}

#gameStatus {
  color: gray;
  margin: 0;
  text-align: center;
}

#goalsRow {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 6rem;
  width: 100%;
  padding: 1rem 0;
}

#homeGoalsColumn {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
}

#awayGoalsColumn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.homeScoreboardGoal {
  font-size: small;
  color: gray;
  text-align: right;
  margin: 0.15rem 0;
}

.awayScoreboardGoal {
  font-size: small;
  color: gray;
  text-align: left;
  margin: 0.5rem 0;
}


#dividerBallIcon {
  margin-top: 0.6rem;
  font-size: medium;
  color: gray;
}

#bottomRow {
  display: flex;
  width: 80%;
  justify-content: center;
}

.bottomInfoItem {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  gap: 0.5rem;
}

#date,
#venue,
#referee {
  text-align: center;
  color: gray;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.bottomInfoItem > .material-symbols-outlined {
  color: gray;
}

.divider {
  background-color: #f5f5f5;
  width: 100%;
  height: 2px;
}

@media (max-width: 900px) {
  #homeTeamColumn {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  #awayTeamColumn {
    flex-direction: column;
    gap: 0.5rem;
  }

  #scoreColumn {
    padding: 0 0.5rem;
  }

  #goalsRow {
    gap: 1.5rem;
  }

  #homeTeamName,
  #awayTeamName {
    font-size: medium;
    text-align: center;
  }

  #gameStatus {
    font-size: small;
  }

  #bottomRow,
  #bottomRowDivider {
    display: none;
  }
}
</style>

<template>
  <div id="stickyHeader">
    <div id="headerContainer">
      <div id="headerHomeTeam">
        <h2 class="headerTeamName">{{ game.teams.home.name }}</h2>
        <img class="headerTeamLogo" :src="game.teams.home.logo" />
      </div>

      <div id="headerScoreContainer">
        <h1 id="headerScore" v-if="game.fixture.status.short !== 'NS'">
          {{ game.goals.home }} - {{ game.goals.away }}
        </h1>
        <h1 id="headerScore" v-else>
          {{
            new Date(game.fixture.date).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })
          }}
        </h1>
        <p id="headerGameStatus">{{ game.fixture.status.long }}</p>
      </div>

      <div id="headerAwayTeam">
        <img class="headerTeamLogo" :src="game.teams.away.logo" />
        <h2 class="headerTeamName">{{ game.teams.away.name }}</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  game: Object,
});

document.addEventListener("scroll", onScroll);

function onScroll() {
  if (
    document.body.scrollTop > 190 ||
    document.documentElement.scrollTop > 190
  ) {
    document.getElementById("stickyHeader").style.top = "0";
  } else {
    document.getElementById("stickyHeader").style.top = "-8rem";
  }
}
</script>
<style scoped>
#stickyHeader {
  height: 7rem;
  width: 100%;
  background-color: white;
  position: fixed;
  top: -8rem;
  transition: top 0.4s;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.25);
  z-index: 2;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerContainer {
  height: 100%;
  min-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerHomeTeam {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
}

#headerAwayTeam {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.headerTeamName {
  font-weight: 400;
}

.headerTeamLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
}

#headerScoreContainer {
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#headerScore {
  font-weight: 400;
  margin: 0.5rem 0.5rem 0 0.5rem;
}

#headerGameStatus {
  color: gray;
  margin: 0.5rem;
  text-align: center;
}
</style>

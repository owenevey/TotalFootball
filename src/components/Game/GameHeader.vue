<template>
  <div id="stickyHeader">
    <div id="headerContainer">
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
  </div>
</template>

<script setup>
defineProps({
  game: Object,
});

document.addEventListener("scroll", onScroll);

function onScroll() {
  if (
    document.body.scrollTop > 130 ||
    document.documentElement.scrollTop > 130
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
  background-color: #ffffff;
  position: fixed;
  top: -8rem;
  transition: top 0.4s;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.25);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

#headerContainer {
  display: flex;
  align-items: center;
  width: 100%;
}

#homeTeamColumn {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

#homeTeamName {
  text-align: right;
}

#homeTeamName, #awayTeamName {
  font-weight: 400;
  margin: 0;
}

#homeTeamLogo, #awayTeamLogo {
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

@media (max-width: 900px) {
  #stickyHeader {
    display: none;
  }
}
</style>

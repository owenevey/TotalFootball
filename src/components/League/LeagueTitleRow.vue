<template>
  <div id="leagueTitleContainer">
    <div id="leagueTextRow">
      <img id="leagueLogo" :src="league.logo" />
      <div>
        <h2 id="leagueTitleName">{{ league.name }}</h2>
        <h4 id="leagueTitleCountry">{{ league.country }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  league: Object
});
</script>

<style scoped>
#leagueTitleContainer {
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  height: 30rem;
}

#leagueTextRow {
  margin: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#leagueLogo {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-right: 1rem;
}

#leagueTitleName {
  font-weight: 400;
  margin: 0;
}

#leagueTitleCountry {
  font-weight: 400;
  color: gray;
  margin: 0;
}
</style>

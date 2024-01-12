<template>
  <div id="leagueInfoContainer">
    <div id="rowsContainer">
      <div class="infoRow">
        <img class="infoImage" :src="league.logo" />
        <div>
          <h4 class="secondaryText">League</h4>
          <h2 class="primaryText">{{ league.name }}</h2>
        </div>
      </div>
      <div class="infoRow">
        <img v-if="league.flag" class="infoImage" :src="league.flag" />
        <span v-else class="infoImage material-symbols-outlined"> public </span>
        <div>
          <h4 class="secondaryText">Country</h4>
          <h2 class="primaryText">{{ league.country }}</h2>
        </div>
      </div>
      <div class="infoRow">
        <span class="infoImage material-symbols-outlined"> groups </span>
        <div>
          <h4 class="secondaryText">Size</h4>
          <h2 class="primaryText">{{ league.standings[0].length }} Teams</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  league: Object,
});
</script>

<style scoped>
#leagueInfoContainer {
  flex: 1;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  height: 20.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

#rowsContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.infoRow {
  flex: 1;
  margin: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.infoImage {
  object-fit: contain;
  width: 3rem;
  height: 3rem;
  padding-right: 1rem;
}

.material-symbols-outlined {
  font-size: 3rem;
}

.secondaryText {
  font-weight: 400;
  color: gray;
  margin: 0;
}

.primaryText {
  font-weight: 400;
  margin: 0;
}

@media (max-width: 1000px) {
  #leagueInfoContainer {
    margin-right: unset;
    margin-bottom: 1rem;
    width: 100%;
  }

  #rowsContainer {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

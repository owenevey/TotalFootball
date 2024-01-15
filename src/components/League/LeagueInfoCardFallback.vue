<template>
  <div id="leagueInfoContainer">
    <div id="rowsContainer">
      <div class="infoRow">
        <div class="infoImage shimmer"></div>
        <div>
          <h4 class="secondaryText">League</h4>
          <div class="primaryText shimmer"></div>
        </div>
      </div>
      <div class="infoRow">
        <div class="infoImage shimmer"></div>
        <div>
          <h4 class="secondaryText">Country</h4>
          <div class="primaryText shimmer"></div>
        </div>
      </div>
      <div class="infoRow">
        <div class="infoImage shimmer"></div>
        <div>
          <h4 class="secondaryText">Size</h4>
          <div class="primaryText shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#leagueInfoContainer {
  flex: 1;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  height: 20.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
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
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 15px;
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
  width: 7rem;
  height: 1.5rem;
  margin: 0;
  border-radius: 5px;
}

.shimmer {
  background: linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
}

@keyframes shimmer {
  to {
    background-position-x: 0%;
  }
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
    min-width: 90%;
  }
}

@media (max-width: 800px) {
  .infoRow {
    /* width: fit-content; */
  }
  #rowsContainer {
    flex-direction: column;
    justify-content: space-between;
    min-width: unset;
  }
}
</style>

<template>
  <div class="outerContainer">
    <div class="tableContainer">
      <div class="headerRow">
        <div class="teamInfo">
          <p class="rank">#</p>
          <div class="logo"></div>
          <p class="teamName"></p>
        </div>
        <div class="stats">
          <p class="gamesPlayed">GP</p>
          <p class="wins">W</p>
          <p class="draws">D</p>
          <p class="losses">L</p>
          <p class="plusMinus">+/-</p>
          <p class="goalDifferential">GD</p>
          <p class="points">PTS</p>
        </div>
        <div class="form"><p>Form</p></div>
      </div>
      <div class="fallbackTableRow" v-for="i in 20">
        <div class="fallbackTeamInfo shimmer"></div>
        <div class="fallbackStats shimmer"></div>
        <div class="fallbackForm shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.outerContainer {
  width: 100%;
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.headerRow {
  width: 100%;
  height: 1.5rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.teamInfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.rank {
  width: 2rem;
  margin: 0 0.5rem;
  text-align: center;
}

.logo {
  width: 1.33rem;
  height: 1.33rem;
  margin: 0 1rem;
}

.teamName {
  text-align: start;
  width: 12rem;
  margin: 0 0.5rem;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats > * {
  text-align: center;
  margin: 0.25rem;
  width: 3rem;
  white-space: nowrap;
}

.form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 11.65rem;
}

p {
  color: gray;
}

.fallbackTableRow {
  width: 100%;
  height: 1.5rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fallbackTeamInfo {
  height: 100%;
  width: 19rem;
  margin-left: 0.75rem;
  border-radius: 5px;
}

.fallbackStats {
  height: 100%;
  width: 24rem;
  border-radius: 5px;
}

.fallbackForm {
  height: 100%;
  width: 11.6rem;
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

@media (max-width: 1100px) {
  .fallbackForm, .form {
    display: none;
  }
}

@media (max-width: 850px) {
  .wins,
  .draws,
  .losses,
  .plusMinus {
    display: none;
  }

  .fallbackStats {
    width: 10.5rem;
  }
}
</style>

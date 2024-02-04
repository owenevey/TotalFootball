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
        <div class="form">
          <p>Form</p>
        </div>
      </div>

      <div v-for="i in 20" class="headerRow">
        <div class="teamInfo">
          <div class="teamInfoFallback shimmer"></div>
        </div>

        <div class="statsFallback shimmer"></div>
        <div class="formFallback shimmer"></div>
      </div>

    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.outerContainer {
  width: 100%;
  min-width: fit-content;
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  background-color: #ffffff;
  padding: 1rem;
  box-sizing: border-box;
}

.headerRow {
  width: 100%;
  height: 1.5rem;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.teamInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.rank {
  width: 1.5rem;
  margin: 0;
  text-align: center;
}

.logo {
  object-fit: contain;
  width: 1.33rem;
  height: 1.33rem;
  margin: 0;
}

.teamName {
  text-align: left;
  margin: 0;
  white-space: nowrap;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.stats > * {
  text-align: center;
  margin: 0;
  width: 1.5rem;
  white-space: nowrap;
}

.plusMinus {
  width: 3rem;
}

.form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 10.7rem;
}

.form > p {
  text-align: left;
}

.teamInfo > p,
.stats > p,
.form > p {
  color: gray;
}

.teamInfoFallback {
  height: 1.33rem;
  width: 18rem;
  border-radius: 3px;
}

.statsFallback {
  height: 1.33rem;
  width: 21rem;
  border-radius: 3px;
}

.formFallback {
  height: 1.33rem;
  width: 10.7rem;
  border-radius: 3px;
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

@media (max-width: 950px) {
  .form, .formFallback {
    display: none;
  }
}

@media (max-width: 700px) {
  .wins,
  .draws,
  .losses,
  .plusMinus {
    display: none;
  }

  .statsFallback {
    width: 7.5rem;
  }
}

@media (max-width: 480px) {
  .gamesPlayed,
  .goalDifferential {
    display: none;
  }

  .statsFallback {
    width: 2rem;
  }

  .teamInfoFallback {
    width: 12rem;
  }
}
</style>

<template>
  <div id="leagueInfoContainer">
    <div class="infoRow">
      <div class="infoImageFallback shimmer"></div>
      <div>
        <div class="secondaryTextFallback shimmer"></div>
        <div class="primaryTextFallback shimmer"></div>
      </div>
    </div>

    <div class="infoRow">
      <div class="infoImageFallback shimmer"></div>
      <div>
        <div class="secondaryTextFallback shimmer"></div>
        <div class="primaryTextFallback shimmer"></div>
      </div>
    </div>

    <div class="infoRow">
      <div class="infoImageFallback shimmer"></div>
      <div>
        <div class="secondaryTextFallback shimmer"></div>
        <div class="primaryTextFallback shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#leagueInfoContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem;
  height: 100%;
  min-width: fit-content;
  box-sizing: border-box;
}

.infoRow {
  gap: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.infoImageFallback {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.secondaryTextFallback {
  height: 1rem;
  width: 4rem;
  margin: 0.25rem;
  border-radius: 5px;
}

.primaryTextFallback {
  height: 1.5rem;
  width: 8rem;
  margin: 0.25rem;
  border-radius: 5px;
}

@media (max-width: 900px) {
  #leagueInfoContainer {
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    min-width: fit-content;
  }

  .infoRow {
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 0;
  }

  .primaryTextFallback {
    width: 5rem;
  }

  .secondaryTextFallback {
    width: 3rem;
  }

  .primaryTextFallback,
  .secondaryTextFallback {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 450px) {
  .primaryText {
    font-size: large;
  }
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
</style>

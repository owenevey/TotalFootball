<template>
  <main>
    <div id="container">
      <h1>Error 404 Not Found</h1>
      <div id="similarResultsContainer">
        <h3>Searches with similar results:</h3>
        <p>Tottenham trophies</p>
        <p>Arsenal Champions League trophies</p>
        <p>Thierry Henry in big games</p>
        <div id="homeButton" @click="goHome()">
            Go Home
        </div>
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import { useRouter } from "vue-router";
import BottomNav from "../components/Common/BottomNav.vue";

const router = useRouter();

const goHome = () => {
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
main {
  margin: 1rem;
}

#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#topRow {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  padding: 2rem;
  margin: 0;
  font-weight: 500;
  font-size: 3rem;
  text-align: center;
}

h3 {
    margin: 1rem 0;
}

p {
    margin: 0.5rem;
}

#similarResultsContainer {
    display: flex;
    flex-direction: column;
}

#homeButton {
    background-color: #00935c;
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    color: white;
    padding: 0.75rem;
    margin-top: 1rem;
    align-self: center;
}

#homeButton:hover {
    opacity: 0.5;
}
</style>

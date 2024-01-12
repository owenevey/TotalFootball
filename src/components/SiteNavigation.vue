<template>
  <header>
    <nav>
      <div id="brandingContainer" @click="goHome()">
        <img id="brandingLogo" src="../assets/icon.svg" />
        <h1 id="brandingName">Sports Scores</h1>
      </div>
      <div>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">News</p>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">Settings</p>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">About Us</p>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00935c;
  padding: 0 40px;
  margin-bottom: 0rem;
}

#brandingContainer {
    display: flex;
    align-items: center;
    cursor: pointer;
}

#brandingLogo {
  display: none;
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  fill: white;
}

#brandingName {
  padding-left: 0.5rem;
  color: white;
  font-weight: 500;
}

.navLink {
  display: inline;
  padding: 10px;
  color: white;
  text-decoration: none;
}
</style>

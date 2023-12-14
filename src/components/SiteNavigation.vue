<template>
  <header>
    <nav>
      <div id="logo" @click="goHome()">
        <img id="logoImg" src="../assets/icon.svg" />
        <h1 id="logoName">Sports Scores</h1>
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

#logo {
    display: flex;
    align-items: center;
    cursor: pointer;
}

#logoImg {
  display: none;
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  fill: white;
}

#logoName {
  padding-left: 0.5rem;
  color: white;
}

.navLink {
  display: inline;
  padding: 10px;
  color: white;
  text-decoration: none;
}
</style>

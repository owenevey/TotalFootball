<template>
  <header>
    <nav>
      <div class="logo" @click="goHome()">
        <img src="../assets/icon.svg" />
        <h1>Sports Scores</h1>
      </div>
      <div>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p>Settings</p>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p>About Us</p>
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
  background-color: #34a853;
  padding: 0 40px;
  margin-bottom: 0rem;
}

.logo {
    display: flex;
    align-items: center;
    cursor: pointer;
}

p {
  display: inline;
  padding: 10px;
  color: white;
  text-decoration: none;
}

body {
  margin: 0px;
}

* {
  font-family: "Rubik", sans-serif;
}

h1 {
  padding-left: 0.5rem;
  color: white;
}

img {
  display: none;
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  color: white;
}
</style>

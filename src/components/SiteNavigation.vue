<template>
  <header>
    <nav>
      <h1 id="brandingName" @click="goHome()">
        <span id="leftBrandName">Total</span>Football
      </h1>
      <div id="navLinks">
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">News</p>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">Settings</p>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink">About</p>
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
  background-color: #ffffff;
  padding: 0 40px;
  margin-bottom: 0rem;
  border-bottom: 2px #f0f0f0 solid;
}

#brandingName {
  font-size: xx-large;
  margin: 1.33rem 0;
  padding-right: 2px;
  font-style: italic;
  cursor: pointer;
}

#brandingName:hover {
  opacity: 0.6;
}

#leftBrandName {
  color: #00935c;
  font-style: italic;
  font-size: xx-large;
}

.navLink {
  display: inline;
  padding: 10px;
  color: black;
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 550px) {
  #navLinks {
    display: none;
  }
}
</style>

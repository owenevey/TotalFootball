<template>
  <header>
    <nav>
      <h1 id="brandingName" @click="goHome()">
        <span id="leftBrandName">Total</span>Football
      </h1>
      <div id="navLinks">
        <RouterLink :to="{ name: 'home' }" style="text-decoration: none">
          <p class="navLink games">Games</p>
        </RouterLink>
        <RouterLink :to="{ name: 'news' }" style="text-decoration: none">
          <p class="navLink news">News</p>
        </RouterLink>
        <RouterLink :to="{ name: 'about' }" style="text-decoration: none">
          <p class="navLink about">About</p>
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
  top: 0;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 30px;
  margin-bottom: 0;
  border-bottom: 2px #f0f0f0 solid;
  z-index: 2;
}

#brandingName {
  font-size: xx-large;
  margin: 0;
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
}

.navLink {
  display: inline;
  padding: 20px;
  color: black;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
}

.navLink:hover {
  text-decoration: underline;
}

@media (max-width: 950px) {
  nav {
    height: 4rem;
  }

  #brandingName {
    font-size: x-large;
  }

  .news,
  .games {
    display: none;
  }
}

@media (max-width: 550px) {
  .about {
    padding: 15px;
    font-weight: 600;
    font-size: unset;
  }

  nav {
    padding: 0 15px;
  }
}
</style>

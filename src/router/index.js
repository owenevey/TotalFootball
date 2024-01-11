import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import LeagueView from "../views/LeagueView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/game/",
      name: "game",
      component: GameView,
    },
    {
      path: "/league/:id",
      name: "league",
      component: LeagueView,
    },
  ],
});

export default router;

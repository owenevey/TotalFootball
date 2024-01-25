import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import LeagueView from "../views/LeagueView.vue";
import LeaguesView from "../views/LeaguesView.vue";
import NewsView from "../views/NewsView.vue";
import ArticleView from "../views/ArticleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: HomeView,
      // Do funny 404 message
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
    {
      path: "/leagues",
      name: "leagues",
      component: LeaguesView,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/news/article/:id",
      name: "article",
      component: ArticleView,
    },
  ],
});

export default router;

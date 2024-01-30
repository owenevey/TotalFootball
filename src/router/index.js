import { createRouter, createWebHistory } from "vue-router";
import NotFoundView from "../views/NotFoundView.vue"
import AboutView from "../views/AboutView.vue"
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
      path: "/totalfootball",
      redirect: "/totalfootball/home",
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundView,
    },
    {
      path: "/totalfootball/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/totalfootball/game/",
      name: "game",
      component: GameView,
    },
    {
      path: "/totalfootball/league/:id",
      name: "league",
      component: LeagueView,
    },
    {
      path: "/totalfootball/leagues",
      name: "leagues",
      component: LeaguesView,
    },
    {
      path: "/totalfootball/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/totalfootball/news/article/:id",
      name: "article",
      component: ArticleView,
    },
    {
      path: "/totalfootball/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;

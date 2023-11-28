import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from "../views/GameView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game/:homeTeam/:awayTeam/',
      name: 'game',
      component: GameView,
      props: true,
    },
  ]
})

export default router

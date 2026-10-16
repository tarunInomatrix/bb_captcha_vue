import { createRouter, createWebHistory } from 'vue-router'
import ProdPage from '../pages/ProdPage.vue'
import DevPage from '../pages/DevPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/prod'
    },
    {
      path: '/prod',
      name: 'prod',
      component: ProdPage,
      meta: { title: 'BotBuster - Prod Environment' }
    },
    {
      path: '/dev',
      name: 'dev',
      component: DevPage,
      meta: { title: 'BotBuster - Dev Environment' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/prod'
    }
  ]
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router

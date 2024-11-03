import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue')
        },
        {
          path: '/teams',
          name: 'teams',
          component: () => import('@/views/TeamView.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/UserView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router

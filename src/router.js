import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('./views/MainPage.vue')
  },
  {
    path: '/important',
    name: 'ImportantTasksPage',
    component: () => import('./views/ImportantTasksPage.vue')
  },
  {
    path: '/done',
    name: 'DoneTasksPage',
    component: () => import('./views/DoneTasksPage.vue')
  },
  {
    path: '/all',
    name: 'AllTasksPage',
    component: () => import('./views/AllTasksPage.vue')
  },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: () => import('./views/CategoryPage.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router;
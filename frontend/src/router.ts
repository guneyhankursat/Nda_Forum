import { createRouter, createWebHistory } from 'vue-router';
import NDAForm from './components/NDAForm.vue';
import Login from './components/Login.vue';

const routes = [
  { path: '/login', component: Login },
  { 
    path: '/', 
    component: NDAForm,
    beforeEnter: (_to: any, _from: any, next: any) => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
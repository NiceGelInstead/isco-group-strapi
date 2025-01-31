import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import MemberProfile from '../views/MemberProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/members/:id', component: MemberProfile }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

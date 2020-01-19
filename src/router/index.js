import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTES } from '@/constants';

import { HomePage } from '@/components/routes/home/page';

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME.PATH,
    name: ROUTES.HOME.NAME,
    component: HomePage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

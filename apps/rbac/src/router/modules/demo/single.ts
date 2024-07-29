import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: '/single',
  component: () => import('@/views/demo/single/index.vue'),
  name: 'Single',
  meta: {
    title: '单页面路由',
    singleMenu: true,
    icon: 'i-solar-confetti-minimalistic-bold',
  },
};

export default routes;

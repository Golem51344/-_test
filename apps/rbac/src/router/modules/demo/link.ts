import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: '/link',
  name: 'Link',
  redirect: '',
  meta: {
    title: '跳转路由',
    singleMenu: true,
    icon: 'i-solar-confetti-minimalistic-bold',
    link: 'http://124.223.184.245:10000/docs/',
  },
};

export default routes;

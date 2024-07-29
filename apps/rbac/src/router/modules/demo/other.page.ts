import type { RouteRecordRaw } from 'vue-router';

function Layout() {
  return import('@/layouts/index.vue');
}
const routes: RouteRecordRaw = {
  path: '/other-page',
  redirect: '/other-page/list',
  component: Layout,
  name: 'OtherPage',
  meta: {
    title: '下探页面',
    icon: 'i-solar-confetti-minimalistic-bold',
  },
  children: [
    {
      path: 'list',
      name: 'OtherPageList',
      component: () => import('@/views/demo/other_page/index.vue'),
      meta: {
        title: '列表页',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/other-page',
      },
    },
    {
      path: 'detail',
      name: 'OtherPageDetail',
      component: () => import('@/views/demo/other_page/des.vue'),
      meta: {
        title: '详情页',
        sidebar: false,
        breadcrumb: true,
        activeMenu: '/other-page',
      },
    },
  ],
};

export default routes;

import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/dictionary',
  component: Layout,
  redirect: '/dictionary/page',
  name: 'DictionaryPage',
  meta: {
    title: '字典管理',
    icon: 'i-fluent-apps-add-in-24-regular',
    i18n: $t('route.rbac.dictionary'),
    auth: 'dictionary',
  },
  children: [
    {
      path: 'page',
      name: 'Dictionary',
      component: () => import('@/views/dictionary/index.vue'),
      meta: {
        title: '字典管理',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/dictionary',
      },
    },
    {
      path: 'detail/:id',
      name: 'DictionaryItem',
      component: () => import('@/views/dictionary/itemlist.vue'),
      meta: {
        title: '字典数据',
        sidebar: false,
        breadcrumb: true,
        activeMenu: '/dictionary',
        cache: true,
        noCache: 'Dictionary',
      },
    },
  ],
};

export default routes;

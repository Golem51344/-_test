import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/system_manage',
  component: Layout,
  redirect: '/system_manage/dictionary',
  name: 'systemManage',
  meta: {
    title: '系统配置',
    icon: 'icon_safe_manage',
  },
  children: [
    {
      path: '/system_manage/dictionary',
      name: 'DictionaryPage',
      meta: {
        title: '字典管理',
        i18n: $t('route.rbac.dictionary'),
        auth: 'dictionary',
        activeIcon: 'system-point',
      },
      children: [
        {
          path: '',
          name: 'Dictionary',
          component: () => import('@/views/dictionary/index.vue'),
          meta: {
            title: '字典管理',
            sidebar: false,
            breadcrumb: false,
            activeMenu: '/system_manage/dictionary',
            cache: 'DictionaryItem',
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
            activeMenu: '/system_manage/dictionary',
          },
        },
      ],
    },
    {
      path: 'position',
      component: () => import('@/views/position/index.vue'),
      name: 'Position',
      meta: {
        title: '岗位管理',
        singleMenu: true,
        i18n: $t('route.rbac.position'),
        auth: 'position',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'region',
      component: () => import('@/views/region/index.vue'),
      name: 'Region',
      meta: {
        title: '区域管理',
        singleMenu: true,
        i18n: $t('route.rbac.region'),
        auth: 'region',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'group',
      component: () => import('@/views/group/index.vue'),
      name: 'Group',
      meta: {
        title: '群组管理',
        singleMenu: true,
        i18n: $t('route.rbac.group'),
        auth: 'group',
        activeIcon: 'system-point',
      },
    },
  ],
};

export default routes;

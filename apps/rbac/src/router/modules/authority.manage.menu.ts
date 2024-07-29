import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/authority_manage',
  component: Layout,
  redirect: '/authority_manage/resource',
  name: 'authorityManage',
  meta: {
    title: '用户权限管理',
    icon: 'icon_system_manage',
  },
  children: [
    {
      path: 'resource',
      component: () => import('@/views/resource/index.vue'),
      name: 'Resource',
      meta: {
        title: '资源管理',
        singleMenu: true,
        i18n: $t('route.rbac.resource'),
        auth: 'resource',
        activeIcon: 'system-point',
      },

    },
    {
      path: 'role',
      component: () => import('@/views/role/index.vue'),
      name: 'Role',
      meta: {
        title: '角色管理',
        singleMenu: true,
        i18n: $t('route.rbac.role'),
        auth: 'role',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'data-permission',
      component: () => import('@/views/data-permission/index.vue'),
      name: 'DataPermission',
      meta: {
        title: '数据权限管理',
        singleMenu: true,
        i18n: $t('route.rbac.dataPermission'),
        auth: 'data_permission',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'organization',
      component: () => import('@/views/organization/index.vue'),
      name: 'Organization',
      meta: {
        title: '组织管理',
        singleMenu: true,
        i18n: $t('route.rbac.organization'),
        auth: 'organization',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'user',
      component: () => import('@/views/user/index.vue'),
      name: 'User',
      meta: {
        title: '用户管理',
        singleMenu: true,
        i18n: $t('route.rbac.user'),
        auth: 'user',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'tenant',
      component: () => import('@/views/tenant/index.vue'),
      name: 'Tenant',
      meta: {
        title: '租户管理',
        singleMenu: true,
        i18n: $t('route.rbac.tenant'),
        auth: 'tenant',
        activeIcon: 'system-point',
      },
    },
  ],
};

export default routes;

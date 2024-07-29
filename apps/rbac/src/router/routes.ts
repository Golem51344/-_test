import { setupLayouts } from 'virtual:meta-layouts';

import { routes } from 'vue-router/auto-routes';
import type { RouteRecordRaw } from 'vue-router';
import { constantRoutes, systemRoutes } from './constant';

import AuthorityManageMenu from './modules/authority.manage.menu';
import StyleSettingMangeMenu from './modules/stylesetting.manage.menu';
import SystemManageMenu from './modules/system.manage.menu';
import SafeManageMenu from './modules/safe.manage.menu';
import LogManageMenu from './modules/log.manage.menu';

import MultilevelMenuExample from './modules/demo/multilevel.menu.example';
import Single from './modules/demo/single';
import OtherPage from './modules/demo/other.page';
import Link from './modules/demo/link';
import breadcrumb from './modules/demo/breadcrumb.example';

import type { Route } from '#/vue-router';
import { $t } from '@/locales';

function constantRoutesByFilesystem(routes: RouteRecordRaw[]) {
  const filterRouters = routes.filter((item) => {
    return item.meta?.enabled !== false && item.meta?.constant === true;
  });
  return filterRouters;
}

const asyncRoutesByFilesystem = setupLayouts(routes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false;
}));

/**
 * ========================================================================
 *                       动态路由（异步路由、导航栏路由）
 *========================================================================*
 */
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示管理系统',
      i18n: $t('route.demo'),
      icon: 'workbench',
    },
    children: [
      Single,
      MultilevelMenuExample,
      OtherPage,
      Link,
      breadcrumb,
    ],
  },
  {
    meta: {
      title: '权限管理系统',
      i18n: $t('route.rbac.title'),
      icon: 'authority',
    },
    children: [
      AuthorityManageMenu,
      SystemManageMenu,
      StyleSettingMangeMenu,
      SafeManageMenu,
      LogManageMenu,
    ],
  },
  {
    meta: {
      title: '演示系统1',
      icon: 'process-management',
      isDev: true,
    },
  },
  {
    meta: {
      title: '演示系统2',
      icon: 'process-management',
      isDev: true,
    },
  },
  {
    meta: {
      title: '演示系统3',
      icon: 'process-management',
      isDev: true,
    },
  },
  {
    meta: {
      title: '演示系统4',
      icon: 'process-management',
      isDev: true,
    },
  },
];

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
};

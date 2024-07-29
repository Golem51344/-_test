import type { RouteRecordRaw } from 'vue-router';
import { isUndefined } from 'lodash-es';
import useSettingsStore from '@/store/modules/settings';
import userStore from '@/store/modules/user';
import { signIn } from '@/utils/auth';
/**
 * ========================================================================
 *                          固定路由（默认路由）
 *========================================================================*
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login/login.vue'),
    beforeEnter: () => {
      // 开启4A登录
      if (import.meta.env.VITE_AUTH_4A_ENABLED === 'true') {
        signIn('4A');
        return false;
      }
      return true;
    },
    meta: {
      whiteList: true,
      title: '登录',
      i18n: 'route.login',
    },
  },
  {
    path: '/change-password/:changePassWordToken',
    name: 'changePassword',
    component: () => import('@/views/system/change-password/index.vue'),
    // 特殊处理changelog-password路由，不允许直接访问
    // 其实应该移入到鉴权组路由,但是会导致需要频繁挂载销毁路由
    beforeEnter: (to) => {
      if (isUndefined(to.params.changePassWordToken)) {
        return {
          name: 'login',
        };
      }
      return true;
    },
    meta: {
      whiteList: true,
      title: '修改密码',
    },
  },
  {
    path: '/change-organization/:orgId',
    name: 'ChangeOrganization',
    component: () => import('@/views/system/change-organization/index.vue'),
    beforeEnter: (to) => {
      const user = userStore();
      if (isUndefined(to.params.orgId) || to.params.orgId !== user.orgId) {
        return {
          name: 'login',
        };
      }
      return true;
    },
    meta: {
      whiteList: true,
      title: '切换组织',
    },
  },
  {
    path: '/auth/:type',
    name: 'Auth',
    component: () => import('@/views/system/auth.vue'),
    meta: {
      whiteList: true,
      title: '第三方授权登录',
    },
  },
  {
    path: '/NotPermission',
    name: 'NotPermission',
    component: () => import('@/views/system/notPermission/index.vue'),
    meta: {
      title: '无权限访问',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/system/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
];

// 系统路由
export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/system/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          i18n: 'route.home',
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/system/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
      {
        path: 'personal/notification',
        name: 'personalNotification',
        component: () => import('@/views/personal/notification.vue'),
        meta: {
          title: '通知中心',
          i18n: 'route.personal.notification',
        },
      },
    ],
  },
];

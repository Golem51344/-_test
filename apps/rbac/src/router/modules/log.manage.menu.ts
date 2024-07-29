import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/log_manage',
  component: Layout,
  redirect: '/log_manage/login_history',
  name: 'logManage',
  meta: {
    title: '日志中心',
    icon: 'log-center',
  },
  children: [
    {
      path: 'login_history',
      component: () => import('@/views/log_center/login_history.vue'),
      name: 'LoginHistory',
      meta: {
        title: '登录日志',
        singleMenu: true,
        i18n: $t('route.rbac.loginHistory'),
        activeIcon: 'system-point',
        auth: 'login_history',
      },
    },
    {
      path: 'operate_history',
      component: () => import('@/views/log_center/operate_history.vue'),
      name: 'OperateHistory',
      meta: {
        title: '操作日志',
        singleMenu: true,
        i18n: $t('route.rbac.operateHistory'),
        activeIcon: 'system-point',
        auth: 'operate_history',
      },
    },
  ],
};

export default routes;

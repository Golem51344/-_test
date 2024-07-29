import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/user',
  component: () => import('@/views/user/index.vue'),
  name: 'User',
  meta: {
    title: '用户管理',
    singleMenu: true,
    icon: 'i-fluent-person-board-32-regular',
    i18n: $t('route.rbac.user'),
    auth: 'user',
  },
};

export default routes;

import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/role',
  component: () => import('@/views/role/index.vue'),
  name: 'Role',
  meta: {
    title: '角色管理',
    singleMenu: true,
    icon: 'i-fluent-tag-multiple-16-regular',
    i18n: $t('route.rbac.role'),
    auth: 'role',
  },
};

export default routes;

import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/group',
  component: () => import('@/views/group/index.vue'),
  name: 'Group',
  meta: {
    title: '群组管理',
    singleMenu: true,
    icon: 'i-mdi-select-group',
    i18n: $t('route.rbac.group'),
    auth: 'group',
  },
};

export default routes;

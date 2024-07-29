import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/organization',
  component: () => import('@/views/organization/index.vue'),
  name: 'Organization',
  meta: {
    title: '组织管理',
    singleMenu: true,
    icon: 'i-fluent-form-multiple-24-regular',
    i18n: $t('route.rbac.organization'),
    auth: 'organization',
  },
};

export default routes;

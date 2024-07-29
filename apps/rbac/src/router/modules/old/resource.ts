import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/resource',
  component: () => import('@/views/resource/index.vue'),
  name: 'Resource',
  meta: {
    title: '资源管理',
    singleMenu: true,
    icon: 'i-fluent-document-queue-24-regular',
    i18n: $t('route.rbac.resource'),
    auth: 'resource',
  },
};

export default routes;

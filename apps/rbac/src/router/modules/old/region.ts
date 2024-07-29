import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/region',
  component: () => import('@/views/region/index.vue'),
  name: 'Region',
  meta: {
    title: '区域管理',
    singleMenu: true,
    icon: 'i-solar-align-right-linear',
    i18n: $t('route.rbac.region'),
    auth: 'region',
  },
};

export default routes;

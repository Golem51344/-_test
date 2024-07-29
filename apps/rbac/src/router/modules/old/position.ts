import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

const routes: RouteRecordRaw = {
  path: '/position',
  component: () => import('@/views/position/index.vue'),
  name: 'Position',
  meta: {
    title: '岗位管理',
    singleMenu: true,
    icon: 'i-solar-posts-carousel-horizontal-line-duotone',
    i18n: $t('route.rbac.position'),
    auth: 'position',
  },
};

export default routes;

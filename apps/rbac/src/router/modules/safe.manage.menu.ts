import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/safe_manage',
  component: Layout,
  redirect: '/safe_manage/blacklist',
  name: 'safeManage',
  meta: {
    title: '安全管理',
    icon: 'icon_safe_manage',
  },
  children: [
    {
      path: 'blacklist',
      component: () => import('@/views/blackWhiteList/index.vue'),
      name: 'Blacklist',
      meta: {
        title: '黑名单管理',
        singleMenu: true,
        i18n: $t('route.rbac.blacklist'),
        auth: 'blacklist',
        type: 'black',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'whitelist',
      component: () => import('@/views/blackWhiteList/index.vue'),
      name: 'Whitelist',
      meta: {
        title: '白名单管理',
        singleMenu: true,
        i18n: $t('route.rbac.whitelist'),
        auth: 'whitelist',
        type: 'white',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'safe-setting',
      component: () => import('@/views/safe_setting/index.vue'),
      name: 'SafeSetting',
      meta: {
        title: '安全配置',
        singleMenu: true,
        i18n: $t('route.rbac.safeSetting'),
        activeIcon: 'system-point',
        auth: 'safe_setting',
      },
    },
    {
      path: 'watermark-setting',
      component: () => import('@/views/watermark_setting/index.vue'),
      name: 'WatermarkSetting',
      meta: {
        title: '页面水印配置',
        singleMenu: true,
        i18n: $t('route.rbac.watermarkSetting'),
        activeIcon: 'system-point',
        auth: 'watermarkSetting',
      },
    },
  ],
};

export default routes;

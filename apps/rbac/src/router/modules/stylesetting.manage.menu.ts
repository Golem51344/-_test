import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/locales';

function Layout() {
  return import('@/layouts/index.vue');
}

const routes: RouteRecordRaw = {
  path: '/setting_manage',
  component: Layout,
  redirect: '/setting_manage/theme-setting',
  name: 'SettingManage',
  meta: {
    title: '样式配置',
    icon: 'setting-manage',
    auth: 'globalsettings',
  },
  children: [
    {
      path: 'theme-setting',
      component: () => import('@/views/theme_setting/index.vue'),
      name: 'ThemeSetting',
      meta: {
        title: '主题配置',
        singleMenu: true,
        i18n: $t('route.rbac.themeSetting'),
        auth: 'themeSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'layout-setting',
      component: () => import('@/views/layout_setting/index.vue'),
      name: 'LayoutSetting',
      meta: {
        title: '布局配置',
        singleMenu: true,
        i18n: $t('route.rbac.layoutSetting'),
        auth: 'layoutSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'page-animation-setting',
      component: () => import('@/views/page_animation_setting/index.vue'),
      name: 'pageAnimationSetting',
      meta: {
        title: '页面动画配置',
        singleMenu: true,
        i18n: $t('route.rbac.pageAnimationSetting'),
        auth: 'pageSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'page-size-setting',
      component: () => import('@/views/page_w_setting/index.vue'),
      name: 'PageSizeSetting',
      meta: {
        title: '页宽配置',
        singleMenu: true,
        i18n: $t('route.rbac.pageSizeSetting'),
        auth: 'pagesizeSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'menu-setting',
      component: () => import('@/views/menu_setting/index.vue'),
      name: 'MenuSetting',
      meta: {
        title: '导航栏配置',
        singleMenu: true,
        i18n: $t('route.rbac.menuSetting'),
        auth: 'menuSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'tabbar-setting',
      component: () => import('@/views/tabbar_setting/index.vue'),
      name: 'TabbarSetting',
      meta: {
        title: '标签栏配置',
        singleMenu: true,
        i18n: $t('route.rbac.tabbarSetting'),
        auth: 'tabbarSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'toolbar-setting',
      component: () => import('@/views/toolbar_setting/index.vue'),
      name: 'ToolbarSetting',
      meta: {
        title: '工具栏配置',
        singleMenu: true,
        i18n: $t('route.rbac.toolbarSetting'),
        auth: 'toolbarSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'breadcrumb-setting',
      component: () => import('@/views/breadcrumb_setting/index.vue'),
      name: 'BreadcrumbSetting',
      meta: {
        title: '面包屑配置',
        singleMenu: true,
        i18n: $t('route.rbac.breadcrumbSetting'),
        auth: 'breadcrumbSetting',
        activeIcon: 'system-point',
      },
    },
    {
      path: 'other-setting',
      component: () => import('@/views/other_setting/index.vue'),
      name: 'OtherSetting',
      meta: {
        title: '其他配置',
        singleMenu: true,
        i18n: $t('route.rbac.otherSetting'),
        auth: 'otherSetting',
        activeIcon: 'system-point',
      },
    },
  ],
};

export default routes;

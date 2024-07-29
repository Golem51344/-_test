import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'synthwave',
  colors: {
    'label': '紫电流',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#58c7f3',
    '--ui-text': '#1a272e',
    // 主体
    '--g-bg': '#1a103c',
    '--g-container-bg': '#221551',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#1a103c',
    '--g-header-color': '#f9f7fd',
    '--g-header-menu-color': '#f9f7fd',
    '--g-header-menu-hover-color': '#f9f7fd',
    '--g-header-menu-hover-bg': '#221551',
    '--g-header-menu-active-color': '#f9f7fd',
    '--g-header-menu-active-bg': '#221551',
    // 主导航
    '--g-main-sidebar-bg': '#1a103c',
    '--g-main-sidebar-menu-color': '#f9f7fd',
    '--g-main-sidebar-menu-hover-color': '#f9f7fd',
    '--g-main-sidebar-menu-hover-bg': '#221551',
    '--g-main-sidebar-menu-active-color': '#f9f7fd',
    '--g-main-sidebar-menu-active-bg': '#221551',
    // 次导航
    '--g-sub-sidebar-bg': '#221551',
    '--g-sub-sidebar-logo-color': '#f9f7fd',
    '--g-sub-sidebar-logo-bg': '#1a103c',
    '--g-sub-sidebar-menu-color': '#f9f7fd',
    '--g-sub-sidebar-menu-hover-color': '#f9f7fd',
    '--g-sub-sidebar-menu-hover-bg': '#160e35',
    '--g-sub-sidebar-menu-active-color': '#f9f7fd',
    '--g-sub-sidebar-menu-active-bg': '#160e35',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
});

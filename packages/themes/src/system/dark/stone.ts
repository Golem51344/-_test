import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'stone',
  colors: {
    'label': '石青润',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#68d1bf',
    '--ui-text': '#1b1a18',
    // 主体
    '--g-bg': '#1b1917',
    '--g-container-bg': '#282524',
    '--g-border-color': '#43403c',
    // 头部
    '--g-header-bg': '#1b1917',
    '--g-header-color': '#e7e5e4',
    '--g-header-menu-color': '#e7e5e4',
    '--g-header-menu-hover-color': '#e7e5e4',
    '--g-header-menu-hover-bg': '#282524',
    '--g-header-menu-active-color': '#e7e5e4',
    '--g-header-menu-active-bg': '#282524',
    // 主导航
    '--g-main-sidebar-bg': '#1b1917',
    '--g-main-sidebar-menu-color': '#e7e5e4',
    '--g-main-sidebar-menu-hover-color': '#e7e5e4',
    '--g-main-sidebar-menu-hover-bg': '#282524',
    '--g-main-sidebar-menu-active-color': '#e7e5e4',
    '--g-main-sidebar-menu-active-bg': '#282524',
    // 次导航
    '--g-sub-sidebar-bg': '#282524',
    '--g-sub-sidebar-logo-color': '#e7e5e4',
    '--g-sub-sidebar-logo-bg': '#1a103c',
    '--g-sub-sidebar-menu-color': '#e7e5e4',
    '--g-sub-sidebar-menu-hover-color': '#e7e5e4',
    '--g-sub-sidebar-menu-hover-bg': '#1b1917',
    '--g-sub-sidebar-menu-active-color': '#e7e5e4',
    '--g-sub-sidebar-menu-active-bg': '#1b1917',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#282524',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
});

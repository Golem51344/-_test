import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'luxury',
  colors: {
    'label': '金华丽',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#dca54c',
    '--ui-text': '#242b33',
    // 主体
    '--g-bg': '#09090b',
    '--g-container-bg': '#171618',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#09090b',
    '--g-header-color': '#dca54c',
    '--g-header-menu-color': '#dca54c',
    '--g-header-menu-hover-color': '#dca54c',
    '--g-header-menu-hover-bg': '#331800',
    '--g-header-menu-active-color': '#ffe7a3',
    '--g-header-menu-active-bg': '#331800',
    // 主导航
    '--g-main-sidebar-bg': '#09090b',
    '--g-main-sidebar-menu-color': '#dca54c',
    '--g-main-sidebar-menu-hover-color': '#dca54c',
    '--g-main-sidebar-menu-hover-bg': '#331800',
    '--g-main-sidebar-menu-active-color': '#ffe7a3',
    '--g-main-sidebar-menu-active-bg': '#331800',
    // 次导航
    '--g-sub-sidebar-bg': '#171618',
    '--g-sub-sidebar-logo-color': '#e3d664',
    '--g-sub-sidebar-logo-bg': '#09090b',
    '--g-sub-sidebar-menu-color': '#dca54c',
    '--g-sub-sidebar-menu-hover-color': '#dca54c',
    '--g-sub-sidebar-menu-hover-bg': '#331800',
    '--g-sub-sidebar-menu-active-color': '#ffe7a3',
    '--g-sub-sidebar-menu-active-bg': '#331800',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
});

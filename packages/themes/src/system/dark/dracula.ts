import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'dracula',
  colors: {
    'label': '暗蓝秘',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#a6adbb',
    '--ui-text': '#242b33',
    // 主体
    '--g-bg': '#272935',
    '--g-container-bg': '#1d232a',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#191E24',
    '--g-header-color': '#f8f8f2',
    '--g-header-menu-color': '#a6adbb',
    '--g-header-menu-hover-color': '#f8f8f2',
    '--g-header-menu-hover-bg': '#181920',
    '--g-header-menu-active-color': '#f8f8f2',
    '--g-header-menu-active-bg': '#414558',
    // 主导航
    '--g-main-sidebar-bg': '#191E24',
    '--g-main-sidebar-menu-color': '#a6adbb',
    '--g-main-sidebar-menu-hover-color': '#f8f8f2',
    '--g-main-sidebar-menu-hover-bg': '#181920',
    '--g-main-sidebar-menu-active-color': '#f8f8f2',
    '--g-main-sidebar-menu-active-bg': '#414558',
    // 次导航
    '--g-sub-sidebar-bg': '#1d232a',
    '--g-sub-sidebar-logo-color': '#1d232a',
    '--g-sub-sidebar-logo-bg': '#a6adbb',
    '--g-sub-sidebar-menu-color': '#a6adbb',
    '--g-sub-sidebar-menu-hover-color': '#f8f8f2',
    '--g-sub-sidebar-menu-hover-bg': '#181920',
    '--g-sub-sidebar-menu-active-color': '#f8f8f2',
    '--g-sub-sidebar-menu-active-bg': '#414558',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#f8f8f2',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#f8f8f2',
  },
});

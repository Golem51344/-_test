import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'night',
  colors: {
    'label': '夜蓝梦',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#0ca6e9',
    '--ui-text': '#242b33',
    // 主体
    '--g-bg': '#0f1729',
    '--g-container-bg': '#1d283a',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#0f1729',
    '--g-header-color': '#c8cad0',
    '--g-header-menu-color': '#a6adbb',
    '--g-header-menu-hover-color': '#c8cad0',
    '--g-header-menu-hover-bg': '#1d283a',
    '--g-header-menu-active-color': '#c8cad0',
    '--g-header-menu-active-bg': '#1d283a',
    // 主导航
    '--g-main-sidebar-bg': '#0f1729',
    '--g-main-sidebar-menu-color': '#a6adbb',
    '--g-main-sidebar-menu-hover-color': '#c8cad0',
    '--g-main-sidebar-menu-hover-bg': '#1d283a',
    '--g-main-sidebar-menu-active-color': '#c8cad0',
    '--g-main-sidebar-menu-active-bg': '#1d283a',
    // 次导航
    '--g-sub-sidebar-bg': '#1d283a',
    '--g-sub-sidebar-logo-color': '#1d232a',
    '--g-sub-sidebar-logo-bg': '#a6adbb',
    '--g-sub-sidebar-menu-color': '#a6adbb',
    '--g-sub-sidebar-menu-hover-color': '#c8cad0',
    '--g-sub-sidebar-menu-hover-bg': '#273449',
    '--g-sub-sidebar-menu-active-color': '#c8cad0',
    '--g-sub-sidebar-menu-active-bg': '#0f1729',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
});

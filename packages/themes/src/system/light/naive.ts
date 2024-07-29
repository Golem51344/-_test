import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'naive',
  colors: {
    'label': '青宇古',
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': '#18a058',
    '--ui-text': '#fcfcfc',
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#1d2935',
    '--g-header-color': '#fff',
    '--g-header-menu-color': '#fff',
    '--g-header-menu-hover-bg': '#42b983',
    '--g-header-menu-hover-color': '#fff',
    '--g-header-menu-active-bg': '#18a058',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#1d2935',
    '--g-main-sidebar-menu-color': '#fff',
    '--g-main-sidebar-menu-hover-bg': '#42b983',
    '--g-main-sidebar-menu-hover-color': '#fff',
    '--g-main-sidebar-menu-active-bg': '#18a058',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#1d2935',
    '--g-sub-sidebar-logo-color': '#fff',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#42b983',
    '--g-sub-sidebar-menu-hover-color': '#fff',
    '--g-sub-sidebar-menu-active-bg': '#18a058',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
});

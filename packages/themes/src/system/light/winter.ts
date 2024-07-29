import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'winter',
  colors: {
    'label': '冰雪蓝',
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': '#a6e4f8',
    '--ui-text': '#3e4e68',
    // 主体
    '--g-bg': '#f1f5fe',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#fff',
    '--g-header-color': '#3e4e68',
    '--g-header-menu-color': '#3e4e68',
    '--g-header-menu-hover-bg': '#e3e8f2',
    '--g-header-menu-hover-color': '#3e4e68',
    '--g-header-menu-active-bg': '#a6e4f8',
    '--g-header-menu-active-color': '#3e4e68',
    // 主导航
    '--g-main-sidebar-bg': '#f1f5fe',
    '--g-main-sidebar-menu-color': '#3e4e68',
    '--g-main-sidebar-menu-hover-bg': '#e3e8f2',
    '--g-main-sidebar-menu-hover-color': '#3e4e68',
    '--g-main-sidebar-menu-active-bg': '#a6e4f8',
    '--g-main-sidebar-menu-active-color': '#3e4e68',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#e3e8f2',
    '--g-sub-sidebar-logo-color': '#3e4e68',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#e3e8f2',
    '--g-sub-sidebar-menu-hover-color': '#3e4e68',
    '--g-sub-sidebar-menu-active-bg': '#a6e4f8',
    '--g-sub-sidebar-menu-active-color': '#3e4e68',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
});

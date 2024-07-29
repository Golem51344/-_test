import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'classic',
  colors: {
    'label': '蓝古雅',
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': '#1677ff',
    '--ui-text': '#fcfcfc',
    // 主体
    '--g-bg': '#F5F8FE',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#2264F1',
    '--g-header-color': '#fff',
    '--g-header-menu-color': '#fff',
    '--g-header-menu-hover-bg': '#57A1F7',
    '--g-header-menu-hover-color': '#fff',
    '--g-header-menu-active-bg': '#57A1F7',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#222b45',
    '--g-main-sidebar-menu-color': '#fff',
    '--g-main-sidebar-menu-hover-bg': '#334067',
    '--g-main-sidebar-menu-hover-color': '#fff',
    '--g-main-sidebar-menu-active-bg': '#334067',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#F5F8FE',
    '--g-sub-sidebar-logo-bg': '#F5F8FE',
    '--g-sub-sidebar-logo-color': '#0f0f0f',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dde1e3',
    '--g-sub-sidebar-menu-hover-color': '#0f0f0f',
    '--g-sub-sidebar-menu-active-bg': '#F8FAFE',
    '--g-sub-sidebar-menu-active-color': '#2264F1',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
});

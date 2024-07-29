import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'dark',
  colors: {
    'label': '墨夜幽',
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': '#e5e5e5',
    '--ui-text': '#0f0f0f',
    // 主体
    '--g-bg': '#0a0a0a',
    '--g-container-bg': '#141414',
    '--g-border-color': '#15191e',
    // 头部
    '--g-header-bg': '#141414',
    '--g-header-color': '#e5e5e5',
    '--g-header-menu-color': '#a8a29e',
    '--g-header-menu-hover-bg': '#141414',
    '--g-header-menu-hover-color': '#e5e5e5',
    '--g-header-menu-active-bg': '#2d2c2c',
    '--g-header-menu-active-color': '#ffffff',
    // 主导航
    '--g-main-sidebar-bg': '#101010',
    '--g-main-sidebar-menu-color': '#a8a29e',
    '--g-main-sidebar-menu-hover-bg': '#141414',
    '--g-main-sidebar-menu-hover-color': '#e5e5e5',
    '--g-main-sidebar-menu-active-bg': '#1D1D1D',
    '--g-main-sidebar-menu-active-color': '#ffffff',
    // 次导航
    '--g-sub-sidebar-bg': '#202020',
    '--g-sub-sidebar-logo-bg': '#0f0f0f',
    '--g-sub-sidebar-logo-color': '#e5e5e5',
    '--g-sub-sidebar-menu-color': '#a8a29e',
    '--g-sub-sidebar-menu-hover-bg': '#0a0a0a',
    '--g-sub-sidebar-menu-hover-color': '#e5e5e5',
    '--g-sub-sidebar-menu-active-bg': '#0a0a0a',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a8a29e',
    '--g-tabbar-tab-color': '#a8a29e',
    '--g-tabbar-tab-hover-bg': '#1b1b1b',
    '--g-tabbar-tab-hover-color': '#e5e5e5',
    '--g-tabbar-tab-active-color': '#e5e5e5',
  },
});

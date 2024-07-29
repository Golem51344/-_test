import { defineTheme } from '../../utils';

export default defineTheme({
  name: 'cyberpunk',
  colors: {
    'label': '黄未来',
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': '#dbcb00',
    '--ui-text': '#0f0f0f',
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#fff',
    '--g-header-color': '#302d12',
    '--g-header-menu-color': '#302d12',
    '--g-header-menu-hover-bg': '#dbcb00',
    '--g-header-menu-hover-color': '#302d12',
    '--g-header-menu-active-bg': '#dbcb00',
    '--g-header-menu-active-color': '#302d12',
    // 主导航
    '--g-main-sidebar-bg': '#f2f2f2',
    '--g-main-sidebar-menu-color': '#302d12',
    '--g-main-sidebar-menu-hover-bg': '#dbcb00',
    '--g-main-sidebar-menu-hover-color': '#302d12',
    '--g-main-sidebar-menu-active-bg': '#dbcb00',
    '--g-main-sidebar-menu-active-color': '#302d12',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#dbcb00',
    '--g-sub-sidebar-logo-color': '#302d12',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dbcb00',
    '--g-sub-sidebar-menu-hover-color': '#302d12',
    '--g-sub-sidebar-menu-active-bg': '#dbcb00',
    '--g-sub-sidebar-menu-active-color': '#302d12',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
});

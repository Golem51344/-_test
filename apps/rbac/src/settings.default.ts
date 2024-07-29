/**
 * ========================================================================
 * ?                                ABOUT
 * @author         :  weiyafei
 * @email          :  2553241022@qq.com
 * @createdOn      :  2023-12-15 23:17
 * @description    :  app配置文件的,使用者不应当修改此文件
 *========================================================================*
 */

import type { RequiredDeep } from 'type-fest';

const globalSettingsDefault: RequiredDeep<Settings.all> = {
  app: {
    lightTheme: 'classic',
    darkTheme: 'dark',
    colorScheme: 'light',
    defaultLang: 'zh-cn',
    enablePermission: true,
    enableProgress: true,
    enableDynamicTitle: true,
    storagePrefix: 'teat1',
    // enableWatermark: false,
    enableErrorLog: false,
    routeBaseOn: 'frontend',
    enableUserPreferences: true,
    enableSettingPreferences: true,
    enableAppSetting: true,
  },
  home: {
    enable: false,
    title: '主页',
  },
  layout: {
    widthMode: 'adaption',
    enableMobileAdaptation: false,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'head',
    isRounded: true,
    menuActiveStyle: '',
    switchMainMenuAndPageJump: true,
    subMenuUniqueOpened: true,
    subMenuOnlyOneHide: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: true,
    enableHotkeys: false,
  },
  topbar: {
    mode: 'fixed',
    switchTabbarAndToolbar: false,
  },
  tabbar: {
    enable: true,
    style: 'fashion',
    enableIcon: true,
    mergeTabsBy: 'activeMenu',
    enableMemory: true,
    enableHotkeys: true,
    storageTo: 'local',
  },
  toolbar: {
    enableNotification: true,
    enableI18n: true,
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
  },
  favorites: {
    enable: true,
    storageTo: 'local',
  },
  breadcrumb: {
    enable: true,
    style: '',
    enableMainMenu: true,
  },
  mainPage: {
    enableHotkeys: true,
    iframeCacheMax: 3,
    enableTransition: true,
    transitionMode: 'fade',
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '2024-2025',
    company: '浙江省公众信息产业有限公司',
    website: '',
    beian: '',
  },
  watermark: {
    enable: false,
    text: 'PUBINFO',
    width: 150,
    x: 0,
    y: 0,
    x_space: 50,
    y_space: 50,
    alpha: 0.1,
  },
};

export default globalSettingsDefault;

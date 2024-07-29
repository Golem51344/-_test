<script setup lang="ts">
import { message } from 'ant-design-vue';
import SetItem from '../components/setItem.vue';

import {
  darkEnableColorSchemeData,
  darkEnableFullscreenData,
  darkEnableI18nData,
  darkEnableNotificationData,
  darkEnablePageReloadData,
  darkEnableUserPreferencesData,

  darkNavSearchEnableData,
  darkNavSearchEnableHotkeysData,
  lightEnableColorSchemeData,
  lightEnableFullscreenData,
  lightEnableI18nData,
  lightEnableNotificationData,

  lightEnablePageReloadData,
  lightEnableUserPreferencesData,
  lightNavSearchEnableData,
  lightNavSearchEnableHotkeysData,
} from './animationData.ts';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'ToolbarSetting',
});

const settingsStore = useSettingsStore();

const toolbarList = reactive<
  {
    name: string
    type: string
    descripe: string
    parentName: string
    childName: string
    open: boolean
    activeStyle: string
    lightData: string
    darkData: string
  }[]
>([
  {
    name: '通知中心',
    type: 'switch',
    descripe: '该功能具体业务功能需自行开发，框架仅提供示例模版',
    open: settingsStore.globalSettings.toolbar.enableNotification,
    parentName: 'toolbar',
    childName: 'enableNotification',
    activeStyle: '',
    lightData: lightEnableNotificationData,
    darkData: darkEnableNotificationData,
  },
  {
    name: '国际化',
    type: 'switch',
    descripe: '',
    parentName: 'toolbar',
    childName: 'enableI18n',
    open: settingsStore.globalSettings.toolbar.enableI18n,
    activeStyle: '',
    lightData: lightEnableI18nData,
    darkData: darkEnableI18nData,
  },
  {
    name: '全屏',
    type: 'switch',
    descripe: '',
    parentName: 'toolbar',
    childName: 'enableFullscreen',
    open: settingsStore.globalSettings.toolbar.enableFullscreen,
    activeStyle: '',
    lightData: lightEnableFullscreenData,
    darkData: darkEnableFullscreenData,
  },
  {
    name: '页面刷新',
    type: 'switch',
    descripe: '使用框架内提供的刷新功能进行页面刷新',
    parentName: 'toolbar',
    childName: 'enablePageReload',
    open: settingsStore.globalSettings.toolbar.enablePageReload,
    activeStyle: '',
    lightData: lightEnablePageReloadData,
    darkData: darkEnablePageReloadData,
  },
  {
    name: '暗黑主题切换',
    type: 'switch',
    descripe: '开启后可在明亮/暗黑模式中切换',
    parentName: 'toolbar',
    childName: 'enableColorScheme',
    open: settingsStore.globalSettings.toolbar.enableColorScheme,
    activeStyle: '',
    lightData: lightEnableColorSchemeData,
    darkData: darkEnableColorSchemeData,
  },
  {
    name: '个性偏好设置',
    type: 'switch',
    descripe: '',
    parentName: 'app',
    childName: 'enableUserPreferences',
    open: settingsStore.globalSettings.app.enableUserPreferences,
    activeStyle: '',
    lightData: lightEnableUserPreferencesData,
    darkData: darkEnableUserPreferencesData,
  },
  {
    name: '导航搜索',
    type: 'switch',
    descripe: '',
    parentName: 'navSearch',
    childName: 'enable',
    open: settingsStore.globalSettings.navSearch.enable,
    activeStyle: '',
    lightData: lightNavSearchEnableData,
    darkData: darkNavSearchEnableData,
  },
  {
    name: '导航搜索快捷键',
    type: 'switch',
    descripe: '',
    parentName: 'navSearch',
    childName: 'enableHotkeys',
    open: settingsStore.globalSettings.navSearch.enableHotkeys,
    activeStyle: '',
    lightData: lightNavSearchEnableHotkeysData,
    darkData: darkNavSearchEnableHotkeysData,
  },
]);

type objType = typeof settingsStore.globalSettings;

function onChange<K extends keyof objType, V extends keyof objType[K]>(
  parentName: K,
  childName: V,
  ck: objType[K][V],
) {
  if (settingsStore.globalSettings[parentName]
    && settingsStore.globalSettings[parentName][childName] !== undefined
    && typeof settingsStore.globalSettings[parentName][childName] === 'boolean') {
    settingsStore.globalSettings[parentName][childName] = ck;

    const result: objType = {} as objType;
    result[parentName] = {} as objType[K];
    result[parentName][childName] = ck;

    const jsonStr = JSON.stringify(result);
    setStyle(jsonStr);
  }
}

function setStyle(jsonStr: string) {
  postSysconfigAddOrEidtSysThemeStyleConfig({ content: jsonStr }).then((res: API.ResponseDataBoolean) => {
    if (res.success) {
      message.success('设置成功');
    }
  });
}
</script>

<template>
  <div
    w-full
    h-full
    p-10px
  >
    <div class="w-full h-full bg-white overflow-y-auto p-10px pb-30px flex flex-col box-border dark:bg-[#141414]">
      <div class="h-[38px] pl-[16px] flex flex-row items-center bar-header">
        <PubSvgIcon name="icon_toolbar" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">工具栏</span>
      </div>
      <div class="mt-[22px] grid grid-cols-3 gap-x-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2] ">
        <SetItem
          v-for="item in toolbarList"
          :key="item.name"
          class="mb-20px"
          aspect="[9/6]"
          :name="item.name"
          :descripe="item.descripe"
          :open="item.open"
          :type="item.type"
          :light-animation-data="item.lightData"
          :dark-animation-data="item.darkData"
          @change="(val) => onChange(item.parentName, item.childName, val)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar-header {
  background: var(--g-bg);
}
</style>

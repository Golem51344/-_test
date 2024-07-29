<script setup lang="ts">
import { message } from 'ant-design-vue';
import SetItem from '../components/setItem.vue';

import {
  darkEnableData,
  darkEnableMainMenuData,
  darkStyleData,
  lightEnableData,
  lightEnableMainMenuData,
  lightStyleData,
} from './animationData.ts';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'BreadcrumbSetting',
});

const settingsStore = useSettingsStore();
type Val = Exclude<Settings.breadcrumb['style'], undefined>;

const styleOptions = [
  { label: '默认', value: '' },
  { label: '现代', value: 'modern' },
];

const breadcrumbList = reactive<
  {
    name: string
    type: string
    descripe: string
    open: boolean
    activeStyle: Val
    styleOptions?: typeof styleOptions
    lightData: string
    darkData: string
  }[]
>([
  {
    name: '是否启用',
    type: 'switch',
    descripe: '',
    open: settingsStore.globalSettings.breadcrumb.enable,
    activeStyle: '',
    lightData: lightEnableData,
    darkData: darkEnableData,
  },
  {
    name: '风格',
    type: 'check',
    descripe: '',
    open: true,
    activeStyle: settingsStore.globalSettings.breadcrumb.style,
    styleOptions,
    lightData: lightStyleData,
    darkData: darkStyleData,
  },
  {
    name: '是否显示主导航',
    type: 'switch',
    descripe: '',
    open: settingsStore.globalSettings.breadcrumb.enableMainMenu,
    activeStyle: '',
    lightData: lightEnableMainMenuData,
    darkData: darkEnableMainMenuData,
  },
]);

let jsonStr = '';

function onChange(index: number, ck: boolean | Val) {
  switch (index) {
    case 0:
      settingsStore.globalSettings.breadcrumb.enable = ck as boolean;
      jsonStr = JSON.stringify({
        breadcrumb: {
          enable: ck,
        },
      });
      break;
    case 1:
      settingsStore.globalSettings.breadcrumb.style = ck as Val;
      jsonStr = JSON.stringify({
        breadcrumb: {
          style: ck,
        },
      });
      break;
    case 2:
      settingsStore.globalSettings.breadcrumb.enableMainMenu = ck as boolean;
      jsonStr = JSON.stringify({
        breadcrumb: {
          enableMainMenu: ck,
        },
      });
      break;
  }
  setStyle(jsonStr);
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
    <div class="w-full h-full bg-white overflow-y-auto p-10px flex flex-col box-border dark:bg-[#141414]">
      <div class="h-[38px] pl-[16px] flex flex-row items-center bar-header">
        <PubSvgIcon name="icon_breadcrumb" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">面包屑导航</span>
      </div>
      <div class="mt-[22px] grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2] ">
        <SetItem
          v-for="(item, index) in breadcrumbList"
          :key="item.name"
          class="mb-20px"
          aspect="[9/6]"
          :name="item.name"
          :descripe="item.descripe"
          :open="item.open"
          :type="item.type"
          :active-style="item.activeStyle"
          :style-options="item.styleOptions"
          :light-animation-data="item.lightData"
          :dark-animation-data="item.darkData"
          @change="(val) => onChange(index, val)"
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

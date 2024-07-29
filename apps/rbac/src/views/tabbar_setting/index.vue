<script setup lang="ts">
import { message } from 'ant-design-vue';
import SetItem from '../components/setItem.vue';
import {
  darkEnableData,
  darkEnableHotkeysData,
  darkEnableIconData,
  darkEnableMemoryData,
  darkStyleData,
  lightEnableData,
  lightEnableHotkeysData,
  lightEnableIconData,
  lightEnableMemoryData,
  lightStyleData,
} from './animationData.ts';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'TabbarAnimationSetting',
});

const settingsStore = useSettingsStore();

const styleOptions = [
  { label: '时尚', value: 'fashion' },
  { label: '卡片', value: 'card' },
  { label: '方块', value: 'square' },
];
type RelVal = Exclude<Settings.tabbar['style'], undefined>;
type Val = RelVal | '';

const tabbarAnimationList = reactive<
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
    open: settingsStore.globalSettings.tabbar.enable,
    activeStyle: '',
    lightData: lightEnableData,
    darkData: darkEnableData,
  },
  {
    name: '风格',
    type: 'check',
    descripe: '',
    open: true,
    activeStyle: settingsStore.globalSettings.tabbar.style,
    styleOptions,
    lightData: lightStyleData,
    darkData: darkStyleData,
  },
  {
    name: '是否显示图标',
    type: 'switch',
    descripe: '',
    open: settingsStore.globalSettings.tabbar.enableIcon,
    activeStyle: '',
    lightData: lightEnableIconData,
    darkData: darkEnableIconData,
  },
  {
    name: '是否启用记忆功能',
    type: 'switch',
    descripe: '开启该功能后，非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失',
    open: settingsStore.globalSettings.tabbar.enableMemory,
    activeStyle: '',
    lightData: lightEnableMemoryData,
    darkData: darkEnableMemoryData,
  },

  {
    name: '是否启用快捷键',
    type: 'switch',
    descripe: '',
    open: settingsStore.globalSettings.tabbar.enableHotkeys,
    activeStyle: '',
    lightData: lightEnableHotkeysData,
    darkData: darkEnableHotkeysData,
  },
]);

let jsonStr = '';
function onChange(index: number, ck: boolean | Val) {
  switch (index) {
    case 0:
      settingsStore.globalSettings.tabbar.enable = ck as boolean;
      jsonStr = JSON.stringify({
        tabbar: {
          enable: ck,
        },
      });
      break;
    case 1:
      settingsStore.globalSettings.tabbar.style = ck as RelVal;
      jsonStr = JSON.stringify({
        tabbar: {
          style: ck,
        },
      });
      break;
    case 2:
      settingsStore.globalSettings.tabbar.enableIcon = ck as boolean;
      jsonStr = JSON.stringify({
        tabbar: {
          enableIcon: ck,
        },
      });
      break;
    case 3:
      settingsStore.globalSettings.tabbar.enableMemory = ck as boolean;
      jsonStr = JSON.stringify({
        tabbar: {
          enableMemory: ck,
        },
      });
      break;
    case 4:
      settingsStore.globalSettings.tabbar.enableHotkeys = ck as boolean;
      jsonStr = JSON.stringify({
        tabbar: {
          enableHotkeys: ck,
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
        <PubSvgIcon name="icon_tabbar" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">标签栏</span>
      </div>
      <div class="mt-[22px] grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2] ">
        <SetItem
          v-for="(item, index) in tabbarAnimationList"
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
          @change="(val: Val) => onChange(index, val)"
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

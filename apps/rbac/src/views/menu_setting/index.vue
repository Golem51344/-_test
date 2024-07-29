<script setup lang="ts">
import { message } from 'ant-design-vue';
import SetItem from '../components/setItem.vue';

import {
  darkEnableHotkeysData,
  darkEnableSubMenuCollapseButtonData,
  darkIsRoundedData,
  darkMenuActiveStyleData,
  darkSubMenuCollapseData,
  darkSubMenuUniqueOpenedData,
  lightEnableHotkeysData,
  lightEnableSubMenuCollapseButtonData,
  lightIsRoundedData,
  lightMenuActiveStyleData,
  lightSubMenuCollapseData,
  lightSubMenuUniqueOpenedData,
} from './animationData.ts';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'MenuAnimationSetting',
});

const settingsStore = useSettingsStore();
const menuMode = toRef(settingsStore.globalSettings.menu, 'menuMode');

const styleOptions = [
  { icon: 'i-jam-stop-sign', value: '' },
  { icon: ['head', 'only-head'].includes(menuMode.value) ? 'i-ep-caret-top' : 'i-ep-caret-left', value: 'arrow' },
  { icon: ['side', 'only-side'].includes(menuMode.value) ? 'i-tabler-minus-vertical' : 'i-tabler-minus', value: 'line' },
  { icon: 'i-icon-park-outline-dot', value: 'dot' },
];

type Val = Exclude<Settings.menu['menuActiveStyle'], undefined>;

const menuAnimationList = reactive<
  {
    type: string
    name: string
    descripe: string
    open: boolean
    activeStyle: Val
    styleOptions?: typeof styleOptions
    lightData: string
    darkData: string
  }[]
>([
  {
    type: 'switch',
    name: '次导航保持展开一个',
    descripe: '开启该功能后，次导航只保持单个菜单的展开',
    open: settingsStore.globalSettings.menu.subMenuUniqueOpened,
    activeStyle: '',
    lightData: lightSubMenuUniqueOpenedData,
    darkData: darkSubMenuUniqueOpenedData,
  },
  {
    type: 'switch',
    name: '次导航是否折叠',
    descripe: '',
    open: settingsStore.globalSettings.menu.subMenuCollapse,
    activeStyle: '',
    lightData: lightSubMenuCollapseData,
    darkData: darkSubMenuCollapseData,
  },
  {
    type: 'switch',
    name: '显示次导航折叠按钮',
    descripe: '',
    open: settingsStore.globalSettings.menu.enableSubMenuCollapseButton,
    activeStyle: '',
    lightData: lightEnableSubMenuCollapseButtonData,
    darkData: darkEnableSubMenuCollapseButtonData,
  },
  {
    type: 'switch',
    name: '是否圆角',
    descripe: '',
    open: settingsStore.globalSettings.menu.isRounded,
    activeStyle: '',
    lightData: lightIsRoundedData,
    darkData: darkIsRoundedData,
  },
  {
    type: 'check',
    name: '激活风格',
    descripe: '',
    open: true,
    activeStyle: settingsStore.globalSettings.menu.menuActiveStyle,
    styleOptions,
    lightData: lightMenuActiveStyleData,
    darkData: darkMenuActiveStyleData,
  },
  {
    type: 'switch',
    name: '是否启用快捷键',
    descripe: '',
    open: settingsStore.globalSettings.menu.enableHotkeys,
    activeStyle: '',
    lightData: lightEnableHotkeysData,
    darkData: darkEnableHotkeysData,
  },
]);

let jsonStr = '';
function onChange(index: number, ck: boolean | Val) {
  switch (index) {
    case 0:
      settingsStore.globalSettings.menu.subMenuUniqueOpened = ck as boolean;
      jsonStr = JSON.stringify({
        menu: {
          subMenuUniqueOpened: ck,
        },
      });
      break;
    case 1:
      settingsStore.globalSettings.menu.subMenuCollapse = ck as boolean;
      jsonStr = JSON.stringify({
        menu: {
          subMenuCollapse: ck,
        },
      });
      break;
    case 2:
      settingsStore.globalSettings.menu.enableSubMenuCollapseButton = ck as boolean;
      jsonStr = JSON.stringify({
        menu: {
          enableSubMenuCollapseButton: ck,
        },
      });
      break;
    case 3:
      settingsStore.globalSettings.menu.isRounded = ck as boolean;
      jsonStr = JSON.stringify({
        menu: {
          isRounded: ck,
        },
      });
      break;
    case 4:
      settingsStore.globalSettings.menu.menuActiveStyle = ck as Val;
      jsonStr = JSON.stringify({
        menu: {
          menuActiveStyle: ck,
        },
      });
      break;
    case 5:
      settingsStore.globalSettings.menu.enableHotkeys = ck as boolean;
      jsonStr = JSON.stringify({
        menu: {
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
        <PubSvgIcon name="icon_menu" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">导航栏</span>
      </div>
      <div class="mt-[22px] grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2] ">
        <SetItem
          v-for="(item, index) in menuAnimationList"
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

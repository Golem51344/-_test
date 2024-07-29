<script setup lang="ts">
import { message } from 'ant-design-vue';
import SetItem from '../components/setItem.vue';
import type { Form, Item, objType } from './interface';
import {
  darkEnableCopyrightData,
  darkEnableHotkeysData,
  darkSwitchTabbarAndToolbarData,
  lightEnableCopyrightData,
  lightEnableHotkeysData,
  lightSwitchTabbarAndToolbarData,
} from './animationData.ts';

import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'OtherSetting',
});

const settingsStore = useSettingsStore();

const activeKey = ref<string[]>(['0', '1', '2']);
const otherList = reactive<
  {
    tabName: string
    tabIcon: string
    list: Item[]
  }[]
>([
  {
    tabName: '底部版权',
    tabIcon: 'icon_copyright',
    list: [{
      name: '是否启用',
      type: 'switch',
      descripe: '',
      parentName: 'copyright',
      childName: 'enable',
      open: settingsStore.globalSettings.copyright.enable,
      activeStyle: '',
      lightData: lightEnableCopyrightData,
      darkData: darkEnableCopyrightData,
    }],
  },
  {
    tabName: '页面',
    tabIcon: 'icon_mainpage',
    list: [{
      name: '是否启用快捷键',
      type: 'switch',
      descripe: '',
      parentName: 'mainPage',
      childName: 'enableHotkeys',
      open: settingsStore.globalSettings.mainPage.enableHotkeys,
      activeStyle: '',
      lightData: lightEnableHotkeysData,
      darkData: darkEnableHotkeysData,
    }],
  },

  {
    tabName: '顶栏',
    tabIcon: 'icon_topbar',
    list: [{
      name: '展示切换',
      type: 'switch',
      descripe: '切换标签栏和工具栏的展示顺序',
      parentName: 'topbar',
      childName: 'switchTabbarAndToolbar',
      open: settingsStore.globalSettings.topbar.switchTabbarAndToolbar,
      activeStyle: '',
      lightData: lightSwitchTabbarAndToolbarData,
      darkData: darkSwitchTabbarAndToolbarData,
    }],

  },
]);

function onChange<K extends keyof objType, V extends keyof objType[K]>(
  parentName: K,
  childName: V,
  ck: objType[K][V],
) {
  if (settingsStore.globalSettings[parentName]
    && settingsStore.globalSettings[parentName][childName] !== undefined) {
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

const copyrightForm = ref<Form>({
  dates: settingsStore.globalSettings.copyright.dates,
  company: settingsStore.globalSettings.copyright.company,
  website: settingsStore.globalSettings.copyright.website,
  beian: settingsStore.globalSettings.copyright.beian,
});

function onSubmit() {
  const jsonStr = JSON.stringify({
    copyright: {
      dates: copyrightForm.value.dates,
      company: copyrightForm.value.company,
      website: copyrightForm.value.website,
      beian: copyrightForm.value.beian,
    },
  });
  settingsStore.globalSettings.copyright.dates = copyrightForm.value.dates;
  settingsStore.globalSettings.copyright.company = copyrightForm.value.company;
  settingsStore.globalSettings.copyright.website = copyrightForm.value.website;
  settingsStore.globalSettings.copyright.beian = copyrightForm.value.beian;

  setStyle(jsonStr);
}

function onReset() {
  copyrightForm.value = {
    dates: settingsStore.globalSettings.copyright.dates,
    company: settingsStore.globalSettings.copyright.company,
    website: settingsStore.globalSettings.copyright.website,
    beian: settingsStore.globalSettings.copyright.beian,
  };
}
</script>

<template>
  <div
    w-full
    h-full
    p-10px
  >
    <div class="w-full h-full bg-white overflow-y-auto p-10px flex flex-col box-border dark:bg-[#141414]">
      <a-collapse
        v-model:activeKey="activeKey"
        :bordered="false"
        :ghost="true"
        expand-icon-position="end"
      >
        <template #expandIcon="pros">
          <div class="w-16px h-16px bg-[#fff] rounded-16px flex items-center justify-center">
            <PubSvgIcon
              name="icon_jt"
              class="text-base"
              :rotate="pros?.isActive ? 0 : 180"
              :size="16"
              @click="console.log('pros', pros)"
            />
          </div>
        </template>
        <a-collapse-panel v-for="(option, index) in otherList" :key="index" style="margin-bottom: 10px;">
          <template #header>
            <div class="flex flex-row items-center">
              <PubSvgIcon :name="option.tabIcon" class="text-base mr-[6px]" :size="22" />
              <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">{{ option.tabName }}</span>
            </div>
          </template>
          <div v-if="option.tabName !== '底部版权'" class="grid grid-cols-3 gap-[20px] px-30px w-full max-w-1300px">
            <SetItem
              v-for="item in option.list"
              :key="item.name"
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
          <div v-else>
            <div v-for="item in option.list" :key="item.name" class="grid grid-cols-3 gap-[20px] px-30px w-full max-w-1300px">
              <SetItem
                :key="item.name"
                aspect="[9/6]"
                :name="item.name"
                :descripe="item.descripe"
                :open="item.open"
                :type="item.type"
                :light-animation-data="item.lightData"
                :dark-animation-data="item.darkData"
                @change="(val) => onChange(item.parentName, item.childName, val)"
              />
              <div class="grid-col-span-2 pt-40px">
                <div class="flex items-center mb-20px w-560px">
                  <label class="w-130px text-right mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">日期</label>
                  <a-input
                    v-model:value="copyrightForm.dates"
                    class="flex-1"
                  />
                </div>
                <div class="flex items-center mb-20px w-560px">
                  <label class="w-130px text-right mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">公司</label>
                  <a-input
                    v-model:value="copyrightForm.company"
                    class="flex-1"
                  />
                </div>
                <div class="flex items-center mb-20px w-560px">
                  <label class="w-130px text-right mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">网址</label>
                  <a-input
                    v-model:value="copyrightForm.website"
                    class="flex-1"
                  />
                </div>
                <div class="flex items-center mb-20px w-560px">
                  <label class="w-130px text-right mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">备案</label>
                  <a-input
                    v-model:value="copyrightForm.beian"
                    class="flex-1"
                  />
                </div>
                <div class="flex items-center flex-row-reverse w-560px">
                  <a-button style="margin-left: 10px;" @click="onReset">
                    重置
                  </a-button>
                  <a-button type="primary" @click="onSubmit">
                    确定
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-collapse-header) {
  padding: 6.5px 16px !important;
  background: var(--g-bg);
}
.bar-header {
  background: var(--g-bg);
}
</style>

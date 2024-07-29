<script setup lang="ts">
import { message } from 'ant-design-vue';
import AnimationItem from '../components/animation_item.vue';
import {
  darkFadeInOutData,
  darkToBottomData,
  darkToLeftData,
  darkToRightData,
  darkToTopData,
  lightFadeInOutData,
  lightToBottomData,
  lightToLeftData,
  lightToRightData,
  lightToTopData,
} from './animationData.ts';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'PageAnimationSetting',
});

const settingsStore = useSettingsStore();

const { enableTransition, transitionMode } = toRefs(settingsStore.globalSettings.mainPage);

const itemRefs = ref<(InstanceType<typeof AnimationItem> | null)[]>([]);

const transitionModeList = reactive<
  {
    descripe: string
    active: Settings.mainPage['transitionMode']
    class: string
    lightData: string
    darkData: string
  }[]
>([
  {
    descripe: '淡入淡出',
    active: 'fade',
    class: 'mode-fade',
    lightData: lightFadeInOutData,
    darkData: darkFadeInOutData,
  },
  {
    descripe: '向左滑动',
    active: 'slide-left',
    class: 'mode-slide-left',
    lightData: lightToLeftData,
    darkData: darkToLeftData,
  },
  {
    descripe: '向右滑动',
    active: 'slide-right',
    class: 'mode-slide-right',
    lightData: lightToRightData,
    darkData: darkToRightData,
  },
  {
    descripe: '向上滑动',
    active: 'slide-top',
    class: 'mode-slide-top',
    lightData: lightToTopData,
    darkData: darkToTopData,
  },
  {
    descripe: '向下滑动',
    active: 'slide-bottom',
    class: 'mode-slide-bottom',
    lightData: lightToBottomData,
    darkData: darkToBottomData,
  },
]);

function play(index: number) {
  if (itemRefs.value[index]) {
    itemRefs.value[index]?.play();
  }
}

function stop(index: number) {
  if (itemRefs.value[index]) {
    itemRefs.value[index]?.stop();
  }
}

const enableTran = ref<boolean>(enableTransition.value);

function onChange(ck: boolean | string | number) {
  settingsStore.globalSettings.mainPage.enableTransition = ck as boolean;
  const jsonStr = JSON.stringify({
    mainPage: {
      enableTransition: ck,
    },
  });
  setStyle(jsonStr);
}

function clickHandle(item: any) {
  if (item) {
    transitionMode.value = item;
    settingsStore.globalSettings.mainPage.transitionMode = item;
    const jsonStr = JSON.stringify({
      mainPage: {
        transitionMode: item,
      },
    });
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
    <div class="w-full h-full bg-white overflow-y-auto p-10px flex flex-col box-border dark:bg-[#141414]">
      <div class="bg-[#F0F4FF] h-[38px] pl-[16px] flex flex-row items-center dark:bg-[#32353B]">
        <PubSvgIcon name="icon_menu" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">页面切换动画</span>
      </div>
      <div class="mt-[15px] flex-1 flex flex-col">
        <div class="flex flex-row items-center">
          <div class="w-[110px] text-right font-400 text-[#4e5969] text-[14px] dark:text-[#C9CDD4]">
            开启动画效果
          </div>
          <a-switch
            v-model:checked="enableTran"
            class="ml-30px"
            checked-children="开启"
            un-checked-children="关闭"
            @change="onChange"
          />
        </div>
        <div class="mt-[15px] flex-1 flex flex-row">
          <div class="flex-none w-[110px] text-right font-400 text-[#4e5969] text-[14px] pt-10px dark:text-[#C9CDD4]">
            动画模式
          </div>
          <div class="flex-auto grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2]">
            <div
              v-for="(mode, index) in transitionModeList"
              :key="mode.active"
              class="item dark:bg-[#3a3e43]! "
              :class="[transitionMode === mode.active ? 'active' : '', `item-${mode.active}`]"
              aspect="[9/6]"
              @click="clickHandle(mode.active)"
              @mouseenter="play(index)"
              @mouseleave="stop(index)"
            >
              <div class="text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">
                {{ mode.descripe }}
              </div>
              <div class="flex-1 mt-[20px] w-[75%] rounded-[8px] jb py-[10px] flex justify-center">
                <AnimationItem
                  :key="index"
                  :ref="(el: any) => (itemRefs[index] = el as InstanceType<typeof AnimationItem>)"
                  :light-animation-data="mode.lightData"
                  :dark-animation-data="mode.darkData"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 26px;
  cursor: pointer;
  background-color: var(--g-bg);
  border: 1px solid var(--g-tabbar-tab-hover-bg);
  border-radius: 8px;
  .jb {
    background: linear-gradient(180deg, var(--g-container-bg) 0%, #ffffff00 100%);
  }
  &.active {
    border: 2.6px solid rgb(var(--ui-primary));
    border-radius: 8px;
    box-shadow: 0 2.6px 13px 0 #59626940;
  }
}
</style>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import AnimationItem from '../components/animation_item.vue';

import {
  darkEnableData,
  lightEnableData,
} from './animationData.ts';

import eventBus from '@/utils/eventBus';

import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'WatermarkSetting',
});

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    return () => props.vnodes;
  },
});

const settingsStore = useSettingsStore();

const animateItem = ref();

function play() {
  if (animateItem.value) {
    animateItem.value?.play();
  }
}

function stop() {
  if (animateItem.value) {
    animateItem.value?.stop();
  }
}

const watermarkForm = ref({
  text: settingsStore.globalSettings.watermark.text,
  x: settingsStore.globalSettings.watermark.x,
  y: settingsStore.globalSettings.watermark.y,
  x_space: settingsStore.globalSettings.watermark.x_space,
  y_space: settingsStore.globalSettings.watermark.y_space,
  alpha: settingsStore.globalSettings.watermark.alpha,
  width: settingsStore.globalSettings.watermark.width,
  enable: settingsStore.globalSettings.watermark.enable,
});

const options = reactive([{
  label: '组织名称',
  value: 'O',
}, {
  label: '用户名称',
  value: 'U',
}, {
  label: '组织名称 用户名称',
  value: 'OU',
}]);
const name = ref('');
function addItem(e: any) {
  e.preventDefault();
  if (name.value) {
    options.push({
      label: name.value,
      value: name.value,
    });
    name.value = '';
  }
}

function setStyle(jsonStr: string) {
  postSysconfigAddOrEidtSysThemeStyleConfig({ content: jsonStr }).then((res: API.ResponseDataBoolean) => {
    if (res.success) {
      message.success('设置成功');
      eventBus.emit('updateWatermark');
    }
  });
}

function onReset() {
  watermarkForm.value = {
    text: settingsStore.globalSettings.watermark.text,
    x: settingsStore.globalSettings.watermark.x,
    y: settingsStore.globalSettings.watermark.y,
    x_space: settingsStore.globalSettings.watermark.x_space,
    y_space: settingsStore.globalSettings.watermark.y_space,
    alpha: settingsStore.globalSettings.watermark.alpha,
    width: settingsStore.globalSettings.watermark.width,
    enable: settingsStore.globalSettings.watermark.enable,
  };
}

function onSubmit() {
  settingsStore.globalSettings.watermark.text = watermarkForm.value.text;
  settingsStore.globalSettings.watermark.width = watermarkForm.value.width;
  settingsStore.globalSettings.watermark.x = watermarkForm.value.x;
  settingsStore.globalSettings.watermark.y = watermarkForm.value.y;
  settingsStore.globalSettings.watermark.x_space = watermarkForm.value.x_space;
  settingsStore.globalSettings.watermark.y_space = watermarkForm.value.y_space;
  settingsStore.globalSettings.watermark.alpha = watermarkForm.value.alpha;
  settingsStore.globalSettings.watermark.enable = watermarkForm.value.enable;

  const jsonStr = JSON.stringify({
    watermark: {
      text: watermarkForm.value.text,
      width: watermarkForm.value.width,
      x: watermarkForm.value.x,
      y: watermarkForm.value.y,
      x_space: watermarkForm.value.x_space,
      y_space: watermarkForm.value.y_space,
      alpha: watermarkForm.value.alpha,
      enable: watermarkForm.value.enable,
    },
  });

  setStyle(jsonStr);
}
</script>

<template>
  <div
    w-full
    h-full
    p-10px
  >
    <div class="w-full h-full bg-white overflow-y-auto p-10px box-border dark:bg-[#141414]">
      <div class="h-[38px] pl-[16px] flex flex-row items-center bar-header">
        <PubSvgIcon name="icon_watermark" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">页面水印</span>
      </div>
      <div class="px-30px py-20px max-w-1300px flex flex-wrap">
        <div
          class="w-400px h-270px mr-60px mb-20px item_ani dark:bg-[#3a3e43]! dark:border-transparent!"
          @mouseenter="play()"
          @mouseleave="stop()"
        >
          <div class="h-full w-[75%] rounded-[8px] jb flex justify-center">
            <AnimationItem
              ref="animateItem"
              :light-animation-data="lightEnableData"
              :dark-animation-data="darkEnableData"
            />
          </div>
        </div>
        <div class="pt-0px">
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印文案</label>
            <a-select
              v-model:value="watermarkForm.text"
              class="flex-1"
              :options="options.map(item => ({ ...item }))"
            >
              <template #dropdownRender="{ menuNode: menu }">
                <VNodes :vnodes="menu" />
                <a-divider style="margin: 4px 0;" />
                <a-space style="padding: 4px 8px;">
                  <a-input v-model:value="name" placeholder="输入你需要的内容" />
                  <a-button type="text" @click="addItem">
                    <template #icon>
                      <plus-outlined />
                    </template>
                    增加选项
                  </a-button>
                </a-space>
              </template>
            </a-select>
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印宽度</label>
            <a-input-number v-model:value="watermarkForm.width" class="flex-1" :min="1" />
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印起始位置</label>
            <div class="flex-1">
              <a-space>
                <a-input-number v-model:value="watermarkForm.x" addon-before="x轴坐标" :min="1" />
                <a-input-number v-model:value="watermarkForm.y" addon-before="y轴坐标" :min="1" />
              </a-space>
            </div>
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印x轴间距</label>
            <a-input-number v-model:value="watermarkForm.x_space" class="flex-1" :min="1" />
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印y轴间距</label>
            <a-input-number v-model:value="watermarkForm.y_space" class="flex-1" :min="1" />
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印透明度</label>
            <a-input-number v-model:value="watermarkForm.alpha" class="flex-1" :min="0" :step="0.01" />
          </div>
          <div class="flex items-center mb-20px w-560px">
            <label class="w-90px mr-10px text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">水印开启</label>
            <a-switch v-model:checked="watermarkForm.enable" checked-children="开启" un-checked-children="关闭" />
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
  </div>
</template>

<style lang="scss" scoped>
.item_ani {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 26px;
  background-color: var(--g-bg);
  border: 1px solid var(--g-tabbar-tab-hover-bg);
  border-radius: 8px;
  .jb {
    background: linear-gradient(180deg, var(--g-container-bg) 0%, #ffffff00 100%);
  }
}
.bar-header {
  background: var(--g-bg);
}
</style>

<script setup lang="ts">
import AnimationItem from './animation_item.vue';

defineOptions({
  name: 'SetItem',
});
const props = withDefaults(
  defineProps<{
    name: string
    descripe: string
    type: string
    open: boolean
    activeStyle?: Val
    styleOptions?: CheckOptions
    lightAnimationData: string
    darkAnimationData: string
  }>(),
  {
    name: '',
    descripe: '',
    type: '',
    open: false,
    activeStyle: '',
    styleOptions: () => { return []; },
    lightAnimationData: '',
    darkAnimationData: '',
  },
);

const emit = defineEmits(['change']);

type CheckOptions = {
  label?: string | number
  icon?: string
  value: string | number
  disabled?: boolean
}[];

type Val = Exclude<Settings.breadcrumb['style'] | Settings.menu['menuActiveStyle'] | Settings.tabbar['style'], undefined>;

const setOpen = ref(props.open);
const setActiveStyle = ref(props.activeStyle);
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

watch(() => setOpen.value, () => {
  emit('change', setOpen.value);
});

watch(() => setActiveStyle.value, () => {
  emit('change', setActiveStyle.value);
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center justify-between h-24px">
      <div class="flex flex-row items-center">
        <span class="text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">{{ props.name }}</span>
        <a-tooltip v-if="props.descripe" :title="props.descripe">
          <PubSvgIcon name="i-ri-question-line" class="text-[#4E5969] dark:text-[#C9CDD4]" />
        </a-tooltip>
      </div>

      <a-switch
        v-if="props.type === 'switch'"
        v-model:checked="setOpen"
        checked-children="开启"
        un-checked-children="关闭"
      />
      <HCheckList
        v-if="props.type === 'check'"
        v-model="setActiveStyle"
        class="custom_style h-24px"
        :options="styleOptions"
      />
    </div>
    <div
      class="mt-[16px] item_ani flex-1 dark:bg-[#3a3e43]! dark:border-transparent!"
      @mouseenter="play()"
      @mouseleave="stop()"
    >
      <div class="h-full w-[75%] rounded-[8px] jb flex justify-center">
        <AnimationItem
          ref="animateItem"
          :light-animation-data="props.lightAnimationData"
          :dark-animation-data="props.darkAnimationData"
        />
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
.custom_style {
  :deep(.text-sm) {
    font-size: 12px;
  }
}
</style>

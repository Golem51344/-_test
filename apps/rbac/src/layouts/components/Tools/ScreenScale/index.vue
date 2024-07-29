<script setup lang="ts">
import { onClickOutside, useToggle } from '@vueuse/core';
import FluentSubtract16Regular from '~icons/fluent/subtract-16-regular';
import FluentAdd16Regular from '~icons/fluent/add-16-regular';

defineOptions({
  name: 'ScreenScale',
});

const [open, setOpen] = useToggle(false);
const popoverRef = ref();
onClickOutside(popoverRef, () => setOpen(false));

const zoom = ref(1);
const zoomRatio = computed(() => `${(zoom.value * 100).toFixed(0)}%`);
watch(zoom, (_zoom) => {
  (document.documentElement.style as any).zoom = `${_zoom}`;
});

function reset() {
  zoom.value = 1;
}
function add() {
  zoom.value += 0.1;
}
function sub() {
  zoom.value -= 0.1;
}

onMounted(() => {
  if ((window.screen.width * window.devicePixelRatio) <= 1366) {
    zoom.value = 0.9;
  }
});
</script>

<template>
  <span ref="popoverRef">
    <PubSvgIcon text="18px" name="icon_screen_scale" @click="setOpen()" />
    <div
      v-if="open"
      class="fixed right-12 top-12 z-9999 flex items-center justify-between py-3 px-4 rounded-xl text-[#1d2129] dark:text-white bg-white dark:bg-[#141414] shadow-md"
    >
      <div class="w-20">{{ zoomRatio }}</div>

      <div class="flex items-center">
        <span class="flex-center p-1.5 cursor-pointer rounded-full hover:bg-stone-2 dark:hover:bg-stone-8" @click="sub()">
          <FluentSubtract16Regular text="18px" />
        </span>
        <span class="flex-center p-1.5 cursor-pointer rounded-full hover:bg-stone-2 dark:hover:bg-stone-8" @click="add()">
          <FluentAdd16Regular text="18px" />
        </span>
        <HButton class="ml-2" @click="reset()">重置</HButton>
      </div>
    </div>
  </span>
</template>

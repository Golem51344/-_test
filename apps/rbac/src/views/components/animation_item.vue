<script setup lang="ts">
defineOptions({
  name: 'AnimationItem',
});

const props = withDefaults(
  defineProps<{
    lightAnimationData: string
    darkAnimationData: string
  }>(),
  {
    lightAnimationData: () => { return ''; },
    darkAnimationData: () => { return ''; },
  },
);

const AnimationRef = ref<HTMLElement | null>(null);

const { play, stop } = useLottie(
  AnimationRef,
  {
    lightAnimationData: props.lightAnimationData,
    darkAnimationData: props.darkAnimationData,
  },
);

defineExpose({
  play,
  stop,
});
</script>

<template>
  <div ref="AnimationRef" class="w-[70%]" />
</template>

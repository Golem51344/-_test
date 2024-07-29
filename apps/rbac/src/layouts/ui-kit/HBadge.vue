<script setup lang="ts">
const props = defineProps<{
  value: string | number | boolean
}>();

const show = computed(() => {
  switch (typeof props.value) {
    case 'string':
      return props.value.length > 0;
    case 'number':
      return props.value > 0;
    case 'boolean':
      return props.value;
    default:
      return props.value !== undefined && props.value !== null;
  }
});

const transitionClass = ref({
  enterActiveClass: 'ease-in-out duration-500',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'ease-in-out duration-500',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
});
</script>

<template>
  <div class="relative inline-flex">
    <slot />
    <Transition v-bind="transitionClass">
      <span
        v-if="show"
        class="absolute left-[50%] top-0 z-20 whitespace-nowrap rounded-full bg-ui-primary px-1.5 text-xs text-ui-text ring-1 ring-light -translate-y-[50%] dark:ring-dark"
      >
        {{ value }}
      </span>
    </Transition>
  </div>
</template>

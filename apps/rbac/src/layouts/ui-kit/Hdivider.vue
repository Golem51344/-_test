<script setup lang="ts">
defineOptions({
  name: 'Hdivider',
});

const props = defineProps<{
  title: string
}>();
</script>

<template>
  <div w-full>
    <div class="divider">
      <div class="divider-card">
        {{ props.title }}
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.divider {
  --at-apply:
    flex
    items-center
    justify-between
    gap-4
    my-4
    whitespace-nowrap
    text-sm
    font-500;

  &::before,
  &::after {
    --at-apply:
      content-empty
      w-full
      h-1px
      bg-stone-2
      dark:bg-stone-6;
  }

  .divider-card {
    padding: 5px 10px;

    // --at-apply:
    //   rounded-md
    //   bg-#409EFF
    //   dark:bg-blue;
  }
}
</style>

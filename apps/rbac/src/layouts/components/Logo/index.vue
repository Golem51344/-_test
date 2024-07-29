<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-12-01 22:45:03
 * @LastEditors: wsy
-->
<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'Logo',
});

withDefaults(
  defineProps<{
    showLogo?: boolean
    showTitle?: boolean
  }>(),
  {
    showLogo: true,
    showTitle: true,
  },
);

const settingsStore = useSettingsStore();

const title = ref(import.meta.env.VITE_APP_TITLE);

const to = computed(() => {
  return {
    ...(settingsStore.settings.home.enable && { name: 'home' }),
  };
});
</script>

<template>
  <RouterLink
    :to="to"
    class="h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline"
    :class="{ 'cursor-pointer': settingsStore.settings.home.enable }"
    :title="title"
  >
    <PubSvgIcon
      v-if="showLogo"
      name="logo"
      :size="30"
      color="transparent"
    />
    <span v-if="showTitle" class="title block truncate">{{ title }}</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
// @font-face {
//   font-family: title;
//   src: url("@/assets/fonts/title.otf");
// }
.title {
  // font-family: title;
  font-size: 19px;
  font-weight: 600;
}
</style>

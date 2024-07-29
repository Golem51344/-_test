<script setup lang="ts">
import { theme } from 'ant-design-vue';
import { token } from '@pubinfo/themes';
import useSettingsStore from '@/store/modules/settings';
import { getUILocales } from '@/locales';

defineOptions({
  name: 'HProvider',
});

function getContainer(triggerNode?: HTMLElement | undefined) {
  if (triggerNode) {
    return triggerNode.parentElement!;
  }
  return document.body;
}

const { isDark } = useTheme();
const settingsStore = useSettingsStore();

const UILocales = computed(() => {
  const locale = getUILocales();
  return locale[settingsStore.settings.app.defaultLang].ui;
});

const themeMode = computed(() => {
  return isDark.value
    ? { algorithm: [theme.darkAlgorithm] }
    : {};
});

const themeConfig = computed(() => {
  return Object.assign({
    token,
  }, themeMode.value);
});
</script>

<template>
  <AConfigProvider
    :locale="UILocales"
    :theme="themeConfig"
    :get-popup-container="getContainer"
  >
    <template #renderEmpty>
      <div class="flex-center">
        <img src="@/assets/icons/not-data.svg" alt="">
      </div>
    </template>
    <slot />
  </AConfigProvider>
</template>

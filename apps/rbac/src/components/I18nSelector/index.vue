<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { getUILocales } from '@/locales';
import useSettingsStore from '@/store/modules/settings';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';

defineOptions({
  name: 'I18nSelector',
});

const { locale } = useI18n();
const route = useRoute();

const settingsStore = useSettingsStore();

const UILocales = computed(() => getUILocales());

const langItems = computed(() => {
  return Object.keys(UILocales.value).map((item: string) => {
    const icons: Record<string, string> = {
      'en': 'i-circle-flags-en',
      'zh-cn': 'i-circle-flags-cn',
      'zh-tw': 'i-circle-flags-cn',
    };
    return {
      icon: icons[item],
      label: UILocales.value[item].labelName,
      disabled: settingsStore.settings.app.defaultLang === item,
      handle: () => setLanguage(item),
    };
  });
});

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

function setLanguage(name: string) {
  locale.value = name;
  settingsStore.setDefaultLang(name);
  if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
    if (route.meta.breadcrumbNeste?.at(-1)?.i18n || route.meta.breadcrumbNeste?.at(-1)?.title) {
      settingsStore.setTitle(generateI18nTitle(route.meta.breadcrumbNeste?.at(-1)?.i18n, route.meta.breadcrumbNeste?.at(-1)?.title));
    }
    else {
      settingsStore.setTitle(generateI18nTitle(route.meta.i18n, route.meta.title));
    }
  }
  else {
    if (route.meta.i18n || route.meta.title) {
      settingsStore.setTitle(generateI18nTitle(route.meta.i18n, route.meta.title));
    }
  }
}
</script>

<template>
  <HDropdownMenu v-if="settingsStore.settings.toolbar.enableI18n" :items="[langItems]">
    <slot />
  </HDropdownMenu>
</template>

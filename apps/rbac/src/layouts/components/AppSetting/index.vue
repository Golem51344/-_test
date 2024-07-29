<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import Message from 'vue-m-message';
import eventBus from '@/utils/eventBus';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';
import EpDocumentCopy from '~icons/ep/document-copy';

defineOptions({
  name: 'AppSetting',
  components: {
    SettingThemes: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingThemes.vue')),
    SettingsMode: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingMode.vue')),
    SettingWidthMode: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingWidthMode.vue')),
    SettingEnableTransition: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingEnableTransition.vue')),
    SettingMenu: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingMenu.vue')),
    SettingTopbar: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingTopbar.vue')),
    SettingTabbar: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingTabbar.vue')),
    SettingToolbar: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingToolbar.vue')),
    SettingBreadcrumb: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingBreadcrumb.vue')),
    SettingPage: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingPage.vue')),
    SettingNavSearch: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingNavSearch.vue')),
    SettingCopyright: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingCopyright.vue')),
    SettingHome: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingHome.vue')),
    SettingOther: defineAsyncComponent(() => import('@/layouts/components/AppSetting/components/SettingOther.vue')),
  },
});

const route = useRoute();
const settingsStore = useSettingsStore();
const menuStore = useMenuStore();
const isShow = ref(false);

const isMobile = computed(() => {
  return settingsStore.mode !== 'pc';
});

const settingComponents = computed(() => {
  const normal = [
    'SettingsMode',
    'SettingWidthMode',
    'SettingEnableTransition',
    'SettingBreadcrumb',
  ];
  return excludesComponents(
    [
      'SettingThemes',
      'SettingsMode',
      'SettingWidthMode',
      'SettingEnableTransition',
      'SettingMenu',
      'SettingTopbar',
      'SettingTabbar',
      'SettingToolbar',
      'SettingBreadcrumb',
      'SettingPage',
      'SettingNavSearch',
      'SettingHome',
      'SettingCopyright',
      'SettingOther',
    ],
    normal,
  );
});

watch(() => settingsStore.settings.menu.menuMode, (value) => {
  if (value === 'single') {
    menuStore.setActived(0);
  }
  else {
    menuStore.setActived(route.fullPath);
  }
});

onMounted(() => {
  eventBus.on('global-app-setting-toggle', () => {
    isShow.value = !isShow.value;
  });
});

const { copy, copied, isSupported } = useClipboard();

watch(copied, (val) => {
  if (val) {
    Message.success('复制成功，请粘贴到 src/settings.ts 文件中！', {
      zIndex: 2000,
    });
  }
});

function handleCopy() {
  copy(JSON.stringify(settingsStore.settings, null, 2));
}

function excludesComponents(all: string[], excludes: string[]) {
  return all.filter((comp) => {
    if (isMobile.value) {
      return !excludes.includes(comp);
    }
    return comp;
  });
}
</script>

<template>
  <HSlideover v-model="isShow" title="应用配置">
    <div class="settong-warp">
      <div class="rounded-2 bg-rose/20 px-4 py-2 text-sm/6 c-rose">
        <p class="my-1">
          应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到 src/settings.ts 文件中。
        </p>
        <p class="my-1">
          注意：在生产环境中应关闭该模块。
        </p>
      </div>
      <template v-for="comp in settingComponents" :key="comp">
        <component :is="comp" />
      </template>
    </div>
    <template v-if="isSupported" #footer>
      <HButton block @click="handleCopy">
        <EpDocumentCopy />
        复制配置
      </HButton>
    </template>
  </HSlideover>
</template>

<style lang="scss" scoped>
.settong-warp :deep(.setting-item) {
  --at-apply:
    flex
    items-center
    justify-between
    gap-4
    px-4
    py-2
    rounded-2
    transition;

  &:hover {
    --at-apply: bg-stone-1 dark:bg-stone-1 dark:bg-stone-9;
  }

  .label {
    --at-apply: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --at-apply: text-xl text-orange cursor-help;
    }
  }
}
</style>

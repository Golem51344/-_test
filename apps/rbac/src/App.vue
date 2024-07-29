<script setup lang="ts">
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';
import { useTitle } from '@/utils/composables/useTitle';
import { registerGlobalSystemInfo } from '@/utils/composables/useGlobalSystem';
import HProvider from '@/layouts/ui-kit/HProvider.vue';

const { mainSidebarActualWidth, subSidebarActualWidth } = useGetSidebarActualWidth();
const route = useRoute();

// 设置网页 title
const { generateI18nTitle } = useTitle();
provide(i18nTitleInjectionKey, generateI18nTitle);

// 注册全局系统信息
registerGlobalSystemInfo();

const { auth } = useAuth();

const isAuth = computed(() => {
  return route.matched.every((item) => {
    return auth(item.meta.auth ?? '');
  });
});
</script>

<template>
  <HProvider>
    <RouterView
      v-slot="{ Component }"
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    >
      <component :is="Component" v-if="isAuth" />
      <NotAllowed v-else />
    </RouterView>
    <SystemInfo />
  </HProvider>
</template>

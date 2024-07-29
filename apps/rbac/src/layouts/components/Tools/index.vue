<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useFullscreen } from '@vueuse/core';
import Notification from './Notification/index.vue';
import ScreenScale from './ScreenScale/index.vue';
import DayNightSwitch from '@/layouts/components/DayNightSwitch/DayNightSwitch.vue';
import eventBus from '@/utils/eventBus';
import useSettingsStore from '@/store/modules/settings';
import useUserStore from '@/store/modules/user';
import useNotificationStore from '@/store/modules/notification';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';
import IconamoonSearch from '~icons/iconamoon/search';
import FluentAlert12Regular from '~icons/fluent/alert-12-regular';
import RiTranslate from '~icons/ri/translate';
import FluentArrowSync16Filled from '~icons/fluent/arrow-sync-16-filled';
import CarbonUserAvatarFilledAlt from '~icons/carbon/user-avatar-filled-alt';
import MaterialSymbolsExpandMoreRounded from '~icons/material-symbols/expand-more-rounded';
import FluentFullScreenMinimize16Filled from '~icons/fluent/full-screen-minimize-16-filled';
import FluentFullScreenMaximize16Filled from '~icons/fluent/full-screen-maximize-16-filled';
import PhLineVerticalThin from '~icons/ph/line-vertical-thin';

defineOptions({
  name: 'Tools',
});

const router = useRouter();

const settingsStore = useSettingsStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();

notificationStore.init();

const { t } = useI18n();

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

const mainPage = useMainPage();
const { isFullscreen, toggle } = useFullscreen();

const userMenu = computed(() => [
  [
    {
      label: generateI18nTitle('route.home', settingsStore.settings.home.title),
      handle: () => router.push({ name: 'home' }),
      hide: !settingsStore.settings.home.enable,
    },
    {
      label: t('app.preferences'),
      icon: 'i-iconamoon-star-duotone',
      handle: () => eventBus.emit('global-preferences-toggle'),
      hide: !settingsStore.settings.app.enableUserPreferences,
    },
  ],
  [
    {
      label: t('app.hotkeys'),
      icon: 'i-iconamoon-lightning-2-duotone',
      handle: () => eventBus.emit('global-hotkeys-intro-toggle'),
      hide: settingsStore.mode !== 'pc',
    },
  ],
  [
    {
      label: t('app.changeOrg'),
      icon: 'i-iconamoon-synchronize-duotone',
      handle: () => router.push({
        name: 'ChangeOrganization',
        params: { orgId: userStore.orgId },
      }),
      hide: userStore.orgList.length <= 1,
    },
    {
      label: t('app.changePassword'),
      icon: 'i-iconamoon-lock-duotone',
      handle: () => router.push({
        name: 'changePassword',
        params: {
          changePassWordToken: userStore.token,
        },
      }),
    },
    {
      label: t('app.logout'),
      icon: 'i-iconamoon-arrow-left-3-square-duotone',
      handle: () => userStore.logout(),
    },
  ],
]);

function toggleColorScheme(event: MouseEvent) {
  const { startViewTransition } = useViewTransition(async () => {
    const colorScheme = settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark';
    settingsStore.setColorScheme(colorScheme);
    await userStore.setPreferencesSetting({
      app: {
        colorScheme,
      },
    });
  });

  startViewTransition()?.ready.then(() => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: settingsStore.settings.app.colorScheme !== 'dark' ? clipPath : clipPath.reverse(),
      },
      {
        duration: 300,
        easing: 'ease-out',
        pseudoElement: settingsStore.settings.app.colorScheme !== 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    );
  });
}

const avatarError = ref(false);

watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false;
  }
});

const searchComponentsClass = computed(() => {
  const componentsClass = {
    'side': 'ring-1 ',
    'head': 'bg-[var(--g-header-menu-active-bg)]',
    'single': ' ring-1',
    'only-side': 'ring-1',
    'only-head': ' bg-[var(--g-header-menu-active-bg)]',
  };
  const menuMode = settingsStore.settings.menu.menuMode;
  return componentsClass[menuMode];
});
</script>

<template>
  <div class="tools flex items-center gap-4 whitespace-nowrap px-4">
    <span
      v-if="settingsStore.settings.navSearch.enable && settingsStore.mode === 'pc'"
      class="group inline-flex cursor-pointer items-center gap-1 rounded-2 px-2 py-1.5 hover:ring-1 ring-inset transition ring-stone-3 dark:ring-stone-7"
      :class="searchComponentsClass"
      @click="eventBus.emit('global-search-toggle')"
    >
      <IconamoonSearch text="14px" />
      <span class="text-sm  transition ">{{ t('app.search.text') }}</span>
      <HKbd
        v-if="settingsStore.settings.navSearch.enableHotkeys"
        class="ml-2"
      >{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} S</HKbd>
    </span>
    <div class="flex items-center empty:hidden">
      <span
        v-if="settingsStore.settings.navSearch.enable && settingsStore.mode === 'mobile'"
        class="item"
        @click="eventBus.emit('global-search-toggle')"
      >
        <IconamoonSearch text="14px" />
      </span>
      <HDropdown
        v-if="settingsStore.settings.toolbar.enableNotification"
        class="item"
      >
        <HBadge
          :value="notificationStore.total"
        >
          <FluentAlert12Regular text="15px" />
        </HBadge>
        <template #dropdown>
          <Notification />
        </template>
      </HDropdown>
      <I18nSelector class="item">
        <RiTranslate text="15px" />
      </I18nSelector>
      <span
        v-if="settingsStore.mode === 'pc' && settingsStore.settings.toolbar.enableFullscreen"
        class="item"
        @click="toggle"
      >
        <FluentFullScreenMinimize16Filled v-if="isFullscreen" text="16px" />
        <FluentFullScreenMaximize16Filled v-else text="16px" />
      </span>
      <span
        v-if="settingsStore.settings.toolbar.enablePageReload"
        class="item"
        @click="mainPage.reload()"
      >
        <FluentArrowSync16Filled text="15px" />
      </span>
      <DayNightSwitch @click="toggleColorScheme" />
      <ScreenScale class="item" />
    </div>
    <div flex-center cursor-pointer gap-1>
      <img
        v-if="userStore.avatar && !avatarError"
        :src="userStore.avatar"
        :onerror="() => (avatarError = true)"
        class="h-[24px] w-[24px] rounded-full"
      >
      <CarbonUserAvatarFilledAlt v-else text="20px" mr-2px />
      <div flex-center cursor-pointer>
        {{ userStore.userOrgName }}
      </div>
      <PhLineVerticalThin />
      <HDropdownMenu :items="userMenu">
        <div flex-center cursor-pointer gap-1>
          {{ userStore.account }}
          <MaterialSymbolsExpandMoreRounded ml="5px" mr="10px" />
        </div>
      </HDropdownMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  --at-apply: flex px-2 py-1 cursor-pointer;
}
</style>

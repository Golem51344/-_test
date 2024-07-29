<script setup lang="ts">
import Logo from '../Logo/index.vue';
import Menu from '../Menu/index.vue';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';

defineOptions({
  name: 'MainSidebar',
});

const route = useRoute();

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

const { switchTo } = useMenu();

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

function iconName(isActive: boolean, icon?: string, activeIcon?: string) {
  let name;
  if ((!isActive && icon) || (isActive && !activeIcon)) {
    name = icon;
  }
  else if (isActive && activeIcon) {
    name = activeIcon;
  }
  return name;
}
</script>

<template>
  <Transition name="main-sidebar">
    <div v-if="['side', 'only-side'].includes(settingsStore.settings.menu.menuMode) || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div
        v-if="settingsStore.settings.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')"
        class="menu flex flex-col of-hidden transition-all"
        :class="{
          [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
        }"
      >
        <template v-for="(item, index) in menuStore.allMenus" :key="index">
          <div
            class="menu-item relative transition-all"
            :class="{
              'active': index === menuStore.actived,
              'px-2 py-1': settingsStore.settings.menu.isRounded,
            }"
          >
            <div
              v-if="(item.children && item.children.length !== 0) || item?.meta?.isDev"
              class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 py-4 text-[var(--g-main-sidebar-menu-color)] transition-all hover:(bg-[var(--g-main-sidebar-menu-hover-bg)] text-[var(--g-main-sidebar-menu-hover-color)]) px-2!"
              :class="{
                'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === menuStore.actived,
                'rounded-2': settingsStore.settings.menu.isRounded,
              }"
              :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)"
              @click="switchTo(index, item)"
            >
              <div class="w-full inline-flex flex-1 flex-col items-center justify-center gap-[2px]">
                <PubSvgIcon
                  v-if="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)"
                  :name="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)!"
                  :size="20"
                  class="menu-item-container-icon transition-transform group-hover:scale-120"
                />
                <!-- 不需要title? -->
                <!-- <span class="w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width">
                  {{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}
                </span> -->
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 侧边栏精简模式 -->
      <Menu
        v-else-if="settingsStore.settings.menu.menuMode === 'only-side'"
        :menu="menuStore.allMenus"
        :value="route.meta.activeMenu || route.path"
        show-collapse-name
        collapse
        :rounded="settingsStore.settings.menu.isRounded"
        class="menu"
        :class="{
          [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
        }"
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  box-shadow: 1px 0 0 0 var(--g-border-color);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
  }

  :deep(.menu-item-container-layout) {
    display: flex;
    flex-direction: row;
    width: auto;

    .title {
      display: none;
    }
  }

  .menu-active {
    &-arrow {
      .item-container::before,
      :deep(.menu-item::before) {
        right: -5px;
        width: 0;
        height: 0;
        content: "";
        border-top: 5px solid transparent;
        border-right: 5px solid var(--g-main-sidebar-bg);
        border-bottom: 5px solid transparent;
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        right: 8px;
        opacity: 1;
      }
    }

    &-line {
      .item-container::before,
      :deep(.menu-item::before) {
        left: 6px;
        width: 4px;
        height: 0;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 2px;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        height: 20px;
        opacity: 1;
      }
    }

    &-dot {
      .item-container::before,
      :deep(.menu-item::before) {
        left: 0;
        width: 10px;
        height: 10px;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        left: 4px;
        opacity: 1;
      }
    }
  }

  .menu {
    flex: 1;
    width: initial;
    overflow: hidden auto;
    overscroll-behavior: contain;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    :deep(.menu-item) {
      .menu-item-container {
        height: 50px;
        padding: 0 5px;
        color: var(--g-main-sidebar-menu-color);
        background-color: var(--g-main-sidebar-menu-bg);

        .menu-item-container-icon {
          font-size: 24px !important;
          transform: scale(1);
        }
      }

      &:hover .menu-item-container {
        color: var(--g-main-sidebar-menu-hover-color);
        background-color: var(--g-main-sidebar-menu-hover-bg);
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important;
      }
    }
  }
}

// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>

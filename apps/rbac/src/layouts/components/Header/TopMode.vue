<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import useMenuStore from '@/store/modules/menu';
import useSettingsStore from '@/store/modules/settings';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';
import MoreApply from '@/layouts/components/MoreApply/index.vue';
import NotCursor from '@/layouts/components/NotCursor/index.vue';
import type { Menu } from '#/menu';
import SolarWidget5BoldDuotone from '~icons/solar/widget-5-bold-duotone';

defineOptions({
  name: 'TopMode',
});

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

const menuRef = ref<HTMLElement | null>();

const { width } = useElementSize(menuRef);
const menuHideIndex = ref(0);

watchMenuItem();

const moreApple = computed(() => {
  return menuHideIndex.value === menuStore.allMenus.length - 1;
});

function moreApplyClick(index: number, item: Menu.recordMainRaw) {
  const menuIndex = index + menuHideIndex.value + 1;
  switchTo(menuIndex, item);
}

function watchMenuItem() {
  onMounted(() => {
    watch(
      width,
      () => {
        menuHideIndex.value = fitMenus();
      },
      {
        immediate: true,
      });
  });
}

// 计算顶部菜单宽度
function fitMenus() {
  const containerRoot = menuRef.value!;
  const menuContainer = Array.from(containerRoot.children).at(0)!;
  const menuContainerWidth = menuContainer.clientWidth;
  const menu = Array.from(menuContainer.children);
  const menuTotalWidth = menu.reduce((total, item) => total + (item as HTMLElement).clientWidth, 0);
  let restrictedWidth = 0;
  let restrictedIndex = 0;

  if (menuTotalWidth <= menuContainerWidth) {
    restrictedIndex = menu.length - 1;
  }
  else {
    for (const [index, item] of menu.entries()) {
      restrictedWidth += (item as HTMLElement).clientWidth;
      if (restrictedWidth >= menuContainerWidth) {
        restrictedIndex = index - 1;
        break;
      }
    }
  }

  menu.forEach((item, index) => {
    if (index > restrictedIndex) {
      (item as HTMLElement).style.visibility = 'hidden';
    }
    else {
      (item as HTMLElement).style.visibility = 'visible';
    }
  });

  return restrictedIndex;
}
</script>

<template>
  <div ref="menuRef" class="menu-container nothin">
    <div
      class="menu flex of-hidden transition-all"
      :class="{
        [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
      }"
    >
      <template v-for="(item, index) in menuStore.allMenus" :key="index">
        <div
          class="menu-item relative transition-all"
          invisible
          :class="{
            'active': index === menuStore.actived,
            'px-1 py-2': settingsStore.settings.menu.isRounded,
            'is-dev': item.meta?.isDev,
          }"
        >
          <NotCursor :is-cursor="item.meta?.isDev">
            <div
              v-if="(item.children && item.children.length !== 0) || item?.meta?.isDev"
              class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 px-5 py-4 text-[var(--g-header-menu-color)] transition-all hover:(bg-[var(--g-header-menu-hover-bg)] text-[var(--g-header-menu-hover-color)])"
              :class="{
                'text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!': index === menuStore.actived,
                'rounded-2': settingsStore.settings.menu.isRounded,
              }"
              :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)"
              @click="switchTo(index, item)"
            >
              <div class="flex flex-row flex-1 items-center justify-center p-x-8px">
                <PubSvgIcon
                  v-if="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)"
                  :name="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)!"
                  :size="18"
                  class="menu-item-container-icon transition-transform group-hover:scale-120 mr-5px"
                />
                <span class="w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width">
                  {{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}
                </span>
              </div>
            </div>
          </NotCursor>
        </div>
      </template>
    </div>
    <MoreApply
      v-if="!moreApple"
      :items="menuStore.allMenus.slice(menuHideIndex + 1)"
      :active-index="menuStore.actived - menuHideIndex - 1"
      @on-menu-click="moreApplyClick"
    >
      <div relative h-full w-85px flex="~ none justify-center items-center" text-sm cursor-pointer>
        更多应用
        <SolarWidget5BoldDuotone ml="5px" mr="5px" />
      </div>
    </MoreApply>
  </div>
</template>

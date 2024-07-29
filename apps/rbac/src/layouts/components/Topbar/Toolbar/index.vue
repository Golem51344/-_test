<script setup lang="ts">
import { compile } from 'path-to-regexp';
import Breadcrumb from '../../Breadcrumb/index.vue';
import BreadcrumbItem from '../../Breadcrumb/item.vue';
import Tools from '../../Tools/index.vue';
import Favorites from './Favorites/index.vue';
import Star from './Star/index.vue';
import useSettingsStore from '@/store/modules/settings';
import useMenuStore from '@/store/modules/menu';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';

defineOptions({
  name: 'Toolbar',
});

const route = useRoute();

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

/**
 * 计算属性：是否启用子菜单折叠按钮
 *
 * @return {boolean}
 */
const enableSubMenuCollapseButton = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
    && settingsStore.settings.menu.enableSubMenuCollapseButton
    && !(
      settingsStore.settings.menu.subMenuOnlyOneHide
      && menuStore.sidebarMenus.length === 1
      && (
        !menuStore.sidebarMenus[0].children
        || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
      )
    )
  );
});

/**
 * 顶部工具栏组件
 *
 * @returns {boolean}
 */
const breadcrumbIsShow = computed(() =>
  settingsStore.mode === 'pc'
  && settingsStore.settings.breadcrumb.enable
  && settingsStore.settings.app.routeBaseOn !== 'filesystem',
);

function createHomeBreadcrumb() {
  return {
    path: '/',
    title: generateI18nTitle('route.home', settingsStore.settings.home.title),
  };
}

const breadcrumbList = computed(() => {
  const breadcrumbList: Array<{ title: string, path: string }> = [];
  if (settingsStore.settings.home.enable) {
    breadcrumbList.push(createHomeBreadcrumb());
  }

  if (route.name !== 'home'
    && settingsStore.settings.breadcrumb.enableMainMenu
    && !['single'].includes(settingsStore.settings.menu.menuMode)
  ) {
    const index = menuStore.allMenus.findIndex((item) => {
      return item.children.some((r) => {
        return route.fullPath.indexOf(`${r.path}/`) === 0 || route.fullPath === r.path;
      });
    });

    menuStore.allMenus[index]?.meta && breadcrumbList.push({
      path: '',
      title: generateI18nTitle(menuStore.allMenus[index].meta?.i18n, menuStore.allMenus[index].meta?.title),
    });
  }

  if (route.meta.breadcrumbNeste) {
    route.meta.breadcrumbNeste.forEach((item) => {
      if (item.hide === false) {
        breadcrumbList.push({
          path: item.path,
          title: generateI18nTitle(item.i18n, item.title),
        });
      }
    });
    const findItem = settingsStore.customTitleList.find(item => item.fullPath === route.fullPath);
    const lastBreadcrumb = breadcrumbList.at(-1);
    if (findItem && lastBreadcrumb) {
      lastBreadcrumb.title = findItem.title;
    }
  }
  return breadcrumbList;
});

function pathCompile(path: string) {
  const toPath = compile(path);
  return toPath(route.params);
}
</script>

<template>
  <div class="toolbar-container">
    <div class="left-box">
      <div
        v-if="enableSubMenuCollapseButton"
        class="flex-center cursor-pointer px-2 py-1 transition-transform"
        :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }"
        @click="settingsStore.toggleSidebarCollapse()"
      >
        <PubSvgIcon name="toolbar-collapse" class="icon" />
      </div>
      <HDropdown
        v-if="settingsStore.mode === 'pc' && settingsStore.settings.favorites.enable"
        placement="bottom-start"
        class="flex-center cursor-pointer px-2 py-1 "
      >
        <Star />
        <template #dropdown>
          <Favorites />
        </template>
      </HDropdown>
      <Breadcrumb
        v-if="breadcrumbIsShow"
        class="breadcrumb"
        :class="{
          [`breadcrumb-${settingsStore.settings.breadcrumb.style}`]: settingsStore.settings.breadcrumb.style !== '',
        }"
      >
        <TransitionGroup name="breadcrumb">
          <BreadcrumbItem
            v-for="(item, index) in breadcrumbList"
            :key="`${index}_${item.path}_${item.title}`"
            :to="index < breadcrumbList.length - 1 && item.path !== '' ? pathCompile(item.path) : ''"
          >
            {{ item.title }}
          </BreadcrumbItem>
        </TransitionGroup>
      </Breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-toolbar-height);
  background-color: var(--g-container-bg);
  transition: background-color 0.3s;

  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    padding-left: 10px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .breadcrumb {
      padding-left: 10px;
      white-space: nowrap;

      &.breadcrumb-modern {
        :deep(.breadcrumb-item) {
          .text {
            --at-apply: bg-stone-2/80 dark:bg-stone-8/80;

            padding: 6px 16px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);

            &.is-link:hover {
              --at-apply: bg-stone-2 dark:bg-stone-8;
            }
          }

          &:first-child .text {
            padding-left: 12px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
            border-radius: 6px 0 0 6px;
          }

          &:last-child:not(:first-child) .text {
            --at-apply: bg-stone-2 dark:bg-stone-8;

            padding-right: 12px;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
            border-radius: 0 6px 6px 0;
          }

          .separator {
            display: none;
          }
        }
      }
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>

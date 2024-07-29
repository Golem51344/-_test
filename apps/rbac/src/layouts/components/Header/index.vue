<script setup lang="ts">
import Logo from '../Logo/index.vue';
import Tools from '../Tools/index.vue';

import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'LayoutHeader',
});

const TopMode = defineAsyncComponent(() => import('./TopMode.vue'));
const TopThinMode = defineAsyncComponent(() => import('./TopThinMode.vue'));

const settingsStore = useSettingsStore();
</script>

<template>
  <Transition name="header">
    <header v-if="settingsStore.mode === 'pc' && ['head', 'only-head'].includes(settingsStore.settings.menu.menuMode)">
      <div class="header-container">
        <div class="main">
          <Logo class="title" />
          <!-- 顶部模式 -->
          <TopMode v-if="settingsStore.settings.menu.menuMode === 'head'" />
          <!-- 顶部精简模式 -->
          <TopThinMode v-else-if="settingsStore.settings.menu.menuMode === 'only-head'" />
        </div>
        <Tools />
      </div>
    </header>
  </Transition>
</template>

<style lang="scss" scoped>
[data-app-width-mode="center"],
[data-app-width-mode="center-max-width"] {
  header {
    width: var(--g-app-width);
    max-width: 100%;
  }
}

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--g-header-height);
  padding: 0 20px;
  margin: 0 auto;
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  // box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color), 0 1px 0 0 var(--g-border-color);
  transition: background-color 0.3s;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--g-header-width);
    height: 100%;
    margin: 0 auto;

    :deep(.main) {
      display: flex;
      flex: auto;
      flex-wrap: nowrap;
      align-items: center;
      width: 0;
      height: 100%;

      .menu-active {
        &-arrow {
          .item-container::before,
          .menu-item::before {
            bottom: 0;
            width: 0;
            height: 0;
            content: "";
            border-right: 5px solid transparent;
            border-bottom: 5px solid var(--g-header-bg);
            border-left: 5px solid transparent;
            opacity: 0;
            transition: all 0.3s;

            @include position-center(x);
          }

          .item-container.active::before,
          .menu-item.active::before {
            bottom: 8px;
            opacity: 1;
          }
        }

        &-line {
          .item-container::before,
          .menu-item::before {
            bottom: 6px;
            width: 0;
            height: 4px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 2px;
            box-shadow: 0 0 0 1px var(--g-header-bg);
            opacity: 0;
            transition: all 0.3s;

            @include position-center(x);
          }

          .item-container.active::before,
          .menu-item.active::before {
            width: 20px;
            opacity: 1;
          }
        }

        &-dot {
          .item-container::before,
          .menu-item::before {
            bottom: 0;
            width: 10px;
            height: 10px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 50%;
            box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
            opacity: 0;
            transition: all 0.3s;

            @include position-center(x);
          }

          .item-container.active::before,
          .menu-item.active::before {
            bottom: 4px;
            opacity: 1;
          }
        }
      }
    }
  }

  @media screen and (max-width: $g-header-width) {
    .header-container {
      width: 100%;
    }
  }

  :deep(a.title) {
    position: relative;
    width: max-content;
    height: inherit;
    padding: inherit;
    background-color: inherit;

    .logo {
      width: 50px;
      height: 50px;
    }

    span {
      font-size: 24px;
      color: var(--g-header-color);
      letter-spacing: 1px;
    }
  }

  :deep(.menu-container) {
    flex: 1;
    height: 100%;
    padding: 0 20px;
    margin: 0 30px;
    overflow-x: auto;
    mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    &.nothin {
      display: flex;
    }

    .menu-item-container-layout {
      display: flex;
      flex-direction: row;
      width: auto;
    }
  }

  :deep(.menu) {
    display: inline-flex;
    height: 100%;
    background-color: var(--g-header-bg);

    .menu-item {
      .v-popper--theme-not-cursor {
        height: 100%;
      }
      .menu-item-container {
        padding: 0 6px;
        color: var(--g-header-menu-color);
        background-color: var(--g-header-menu-bg);

        &:hover {
          color: var(--g-header-menu-hover-color);
          background-color: var(--g-header-menu-hover-bg);
        }

        .menu-item-container-icon {
          transform: scale(1);
        }

        svg {
          color: transparent;
        }
      }
      &.is-dev {
        .menu-item-container {
          cursor: not-allowed;
          i {
            filter: grayscale(100%);
          }
          span {
            opacity: 0.8;
          }
        }
      }
      &.active .menu-item-container {
        color: var(--g-header-menu-active-color);
        background-color: var(--g-header-menu-active-bg);
      }
    }
  }

  :deep(.tools) {
    padding: 0;

    .buttons .item .icon {
      color: var(--g-header-color);
    }

    .user-container {
      font-size: 16px;
      color: var(--g-header-color);
    }
  }
}

// 头部动画
.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>

<script setup lang="ts">
import { themes } from '@pubinfo/themes';
import type { colorScheme, cssVarKey } from '@pubinfo/themes/utils';
import useSettingsStore from '@/store/modules/settings';
import { useTheme } from '@/composables/theme';
import DayNightToggle from '@/layouts/components/DayNightSwitch/DayNightToggle.vue';
import JamBookmarkF from '~icons/jam/bookmark-f';
import PajamasCheckCircleFilled from '~icons/pajamas/check-circle-filled';

interface ThemeListCard {
  label: string
  value: colorScheme
  colors: string[]
  name?: string
}

defineOptions({
  name: 'SettingThemes',
});
const { isDark } = useTheme();
const settingsStore = useSettingsStore();
const app = toRef(settingsStore.settings, 'app');

const benchmark: cssVarKey[] = [
  '--ui-primary',
  '--ui-text',
  '--g-bg',
  '--g-header-bg',
  '--g-main-sidebar-bg',
  '--g-sub-sidebar-bg',
];

const themeList = computed<ThemeListCard[]>(() =>
  Object.keys(themes).map((key) => {
    const value = themes[key];
    const colors = benchmark.map((cssVar) => {
      const cssValue = value[cssVar].startsWith('#')
        ? value[cssVar]
        : `rgb(${value[cssVar]})`;
      return cssValue;
    });
    const name = themes[key].label;
    return {
      label: key,
      value,
      colors,
      name,
    };
  }).filter(cssVarScheme =>
    cssVarScheme.value['color-scheme'] === app.value.colorScheme,
  ),
);

function clickHandle(item: ThemeListCard) {
  const label = item.label;
  if (isDark.value) {
    app.value.darkTheme = label;
  }
  else {
    app.value.lightTheme = label;
  }
}
</script>

<template>
  <Hdivider title="颜色主题风格">
    <div>
      <DayNightToggle v-model="isDark" />
    </div>
    <div class="themes">
      <div
        v-for="item in themeList"
        :key="item.label"
        class="theme"
        :class="{ active: isDark ? app.darkTheme === item.label : app.lightTheme === item.label }"
        @click="clickHandle(item)"
      >
        <div
          class="theme-type"
          flex
          items-center
        >
          <span :style="{ color: item.colors.at(0) }" mr-5px>
            <JamBookmarkF />
          </span>
          <span :style="{ color: item.colors.at(0) }" text-sm>
            {{ item.name || item.label }}
          </span>
        </div>
        <div class="theme-point">
          <template v-for="color in item.colors" :key="color">
            <div class="point" :style="{ backgroundColor: color }" />
          </template>
        </div>
        <div class="explosion">
          <PajamasCheckCircleFilled />
        </div>
      </div>
    </div>
  </Hdivider>
</template>

<style lang="scss" scoped>
.divider {
  --at-apply:
    flex
    items-center
    justify-between
    gap-4
    my-4
    whitespace-nowrap
    text-sm
    font-500;

  &::before,
  &::after {
    --at-apply:
      content-empty
      w-full
      h-1px
      bg-stone-2
      dark:bg-stone-6;
  }
}

.themes {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 125px);
  grid-gap: 15px;
  width: 100%;

  .theme {
    position: relative;
    box-sizing: border-box;
    height: 78px;
    padding: 15px;
    margin-bottom: 15px;
    color: #fff;
    cursor: pointer;
    background-color: #f7f8f9;
    border-radius: 12px;
    transition: all 0.2s ease-in-out;

    --at-apply: shadow dark:bg-dark-2;

    &:hover {
      transform: scale(1.05);
    }

    .explosion {
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: rgb(var(--ui-primary));
      border-radius: 50%;
      transition: all 0.3s;
      transform: scale(0);
      transform-origin: center;
    }

    &.active {
      box-shadow: 0 0 0 4px rgb(var(--ui-primary));

      .explosion {
        transform: scale(1);
      }
    }

    .theme-type {
      width: 100%;
      height: 16px;
      margin-top: 5px;
      margin-bottom: 10px;
    }

    .theme-point {
      display: grid;
      grid-template-columns: repeat(6, 15px);
      width: 100%;
      height: 20px;

      .point {
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border: 2px solid #fff;
        border-radius: 50%;

        --at-apply: shadow shadow-stone-4 dark:shadow-stone-8;
      }
    }
  }
}
</style>

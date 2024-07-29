<script setup lang="ts">
import { message } from 'ant-design-vue';
import { themes } from '@pubinfo/themes';
import type { colorScheme, cssVarKey } from '@pubinfo/themes/utils';
import useSettingsStore from '@/store/modules/settings';
import { useTheme } from '@/composables/theme';

interface ThemeListCard {
  label: string
  value: colorScheme
  colors: string[]
  name?: string
}

defineOptions({
  name: 'SettingGlobalThemes',
});
const { isDark } = useTheme();

const settingsStore = useSettingsStore();

const modeLabel = computed(() =>
  settingsStore.globalSettings.app.colorScheme === 'light' ? '亮色模式颜色' : '暗色模式颜色',
);

const isLight = computed(() => {
  return settingsStore.globalSettings.app.colorScheme === 'light';
});

const benchmark: cssVarKey[] = [
  '--ui-primary',
  '--ui-text',
  '--g-bg',
  '--g-header-bg',
  '--g-main-sidebar-bg',
  '--g-sub-sidebar-bg',
];

const themeList = computed<ThemeListCard[]>(() => {
  const list = Object.keys(themes)
    .map((key) => {
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
    })
    .filter(
      cssVarScheme =>
        cssVarScheme.value['color-scheme'] === settingsStore.globalSettings.app.colorScheme,
    );
  return list;
});

function changeTheme(theme: ThemeListCard) {
  const label = theme.label;
  const o = {} as any;
  if (!isLight.value) {
    settingsStore.globalSettings.app.darkTheme = label;
    o.darkTheme = label;
  }
  else {
    settingsStore.globalSettings.app.lightTheme = label;
    o.lightTheme = label;
  }
  updateConfig({
    app: o,
  });
}

async function changeMode(checked: boolean | string | number) {
  const value = !checked ? 'dark' : 'light';
  settingsStore.globalSettings.app.colorScheme = value;
  await updateConfig({
    app: {
      colorScheme: value,
    },
  });
}

async function updateConfig(options: object) {
  const jsonStr = JSON.stringify(options);
  await postSysconfigAddOrEidtSysThemeStyleConfig({ content: jsonStr })
    .then((res: API.ResponseDataBoolean) => {
      if (res.success) {
        message.success('设置成功');
      }
    });
}
</script>

<template>
  <div
    w-full
    h-full
    p-10px
    pb-0
  >
    <div
      class="w-full h-full bg-white overflow-y-auto p-10px pb-0 flex flex-col box-border dark:bg-[#141414]"
    >
      <div
        class="bg-[#F0F4FF] h-[38px] pl-[16px] flex flex-row items-center b-rd-4px dark:bg-[#32353B]"
      >
        <PubSvgIcon name="theme-title" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">颜色主题风格</span>
      </div>
      <div class="mt-20px flex flex-row items-center">
        <div
          class="flex-none w-[136px] text-right font-400 text-[#4e5969] text-[14px] dark:text-[#C9CDD4]"
        >
          亮色/暗色切换
        </div>
        <a-switch
          :checked="isLight"
          ml-16px
          checked-children="亮"
          un-checked-children="暗"
          @change="changeMode"
        />
      </div>
      <div class="mt-20px pb-24px flex flex-row">
        <div
          class="flex-none w-[136px] text-right font-400 text-[#4e5969] text-[14px] dark:text-[#C9CDD4]"
        >
          {{ modeLabel }}
        </div>
        <div
          class="grid grid-cols-3 gap-x-[32px] gap-y-[16px] ml-16px mr-27px w-full max-w-1400px"
        >
          <div
            v-for="(theme, index) in themeList"
            :key="index"
            class="theme-item"
            :class="{
              active: !isLight
                ? settingsStore.globalSettings.app.darkTheme === theme.label
                : settingsStore.globalSettings.app.lightTheme === theme.label,
              dark: isDark,
            }"
            aspect="[4/3]"
            @click="changeTheme(theme)"
          >
            <p class="item-title">
              <span
                class="text-[#4e5969] text-[14px] dark:text-[#C9CDD4]"
              >
                {{
                  theme.name
                }}
              </span>
              <PubSvgIcon
                v-if="!isLight
                  ? settingsStore.globalSettings.app.darkTheme === theme.label
                  : settingsStore.globalSettings.app.lightTheme === theme.label"
                name="theme-check-mark"
                class="text-base ml-[6px] text-#fff position-relative top--1px"
                :size="20"
              />
            </p>
            <div class="item-content">
              <div
                flex
                items-center
                justify-center
                class="spots-wrap"
              >
                <!-- colors 颜色会有重复使用的地方，key多段拼接 -->
                <template
                  v-for="(color, _index) in theme.colors"
                  :key="theme.name + color + _index"
                >
                  <div class="color-spot" :style="{ backgroundColor: color }" />
                </template>
              </div>
              <div class="skeleton">
                <header :style="{ backgroundColor: theme.colors[0] }">
                  <div class="dot" />
                  <div class="bar" />
                </header>
                <main class="skeleton-body">
                  <div class="aside">
                    <div class="side-line" :style="{ backgroundColor: theme.colors[0] }" />
                    <div v-for="i in 4" :key="i" class="side-line" />
                  </div>
                  <div class="main">
                    <div class="left">
                      <div v-for="i in 3" :key="i" class="left-item">
                        <div class="dot" />
                        <div class="lines-wrap">
                          <div class="line1" />
                          <div class="line2" />
                        </div>
                      </div>
                    </div>
                    <div class="right">
                      <div class="right-item" />
                      <div class="right-item" />
                      <div class="right-item" :style="{ backgroundColor: theme.colors[0], opacity: 0.3 }" />
                      <div class="right-item" />
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-item {
  display: flex;
  flex-direction: column;
  padding: 12px 24px 0;
  cursor: pointer;
  background: linear-gradient(180deg, #f4f7ff -22.05%, #fff 85.58%);
  border: 1px solid var(--border-2, #e5e6eb);
  border-radius: 8px;

  .item-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }

  .item-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(12 / 320 * 100%) calc(20 / 320 * 100%);
    margin-top: calc(12 / 320 * 100%);
    background: linear-gradient(180deg, #fff 0%, #ffffff00 100%);
    border-radius: calc(8 / 320 * 100%);

    .spots-wrap {
      margin-left: calc(32 / 270 / 2 * 100%);
    }

    .color-spot {
      flex-shrink: 0;
      width: calc(30 / 270 * 100%);
      max-width: 30px;
      aspect-ratio: 1;
      background: #fff;
      border: 2px solid #fff;
      border-radius: 30px;
      box-shadow: 0 0 4px 0 #00000026;

      &:nth-child(1) {
        transform: translateX(0);
      }
      &:nth-child(2) {
        transform: translateX(calc(-6 / 30 * 100%));
      }
      &:nth-child(3) {
        transform: translateX(calc(-12 / 30 * 100%));
      }
      &:nth-child(4) {
        transform: translateX(calc(-18 / 30 * 100%));
      }
      &:nth-child(5) {
        transform: translateX(calc(-24 / 30 * 100%));
      }
      &:nth-child(6) {
        transform: translateX(calc(-30 / 30 * 100%));
      }
    }

    .skeleton {
      display: flex;
      flex: auto;
      flex-direction: column;
      height: 0;
      margin-top: 22px;
      background: #f5f8fe;
      border-radius: 4px;

      header {
        display: flex;
        align-items: center;
        aspect-ratio: 10.45;
        padding-left: 10px;
        border-radius: 4px 4px 0 0;

        .dot {
          width: calc(8.5 / 230 * 100%);
          aspect-ratio: 1;
          margin-right: calc(5 / 230 * 100%);
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }
        .bar {
          width: calc(68 / 230 * 100%);
          aspect-ratio: calc(68 / 7);
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
        }
      }

      .skeleton-body {
        display: flex;
        flex: 1;
        height: 0;
        padding: calc(7 / 230 * 100%);
      }

      .aside {
        width: calc(36 / 230 * 100%);
        height: 100%;
        padding-top: calc(12 / 230 * 100%);
        margin-right: calc(7 / 230 * 100%);
        background: #fff;
        border-radius: 4px;

        .side-line {
          width: calc(24.1 / 36.6 * 100%);
          aspect-ratio: calc(24.1 / 6.5);
          margin: 0 auto calc(4 / 36.6 * 100%);
          background: #eaeff7;
          border-radius: 2px;
        }
      }

      .main {
        display: flex;
        flex: auto;
        justify-content: space-between;
        height: 100%;
        padding: 5.2% 5.6% 3%;
        background: #fff;
        border-radius: 2px;

        .left {
          flex: 1;
        }
        .right {
          width: 30%;
        }

        .left-item {
          display: flex;
          margin-bottom: 6.5;

          .dot {
            width: calc(15 / 108) * 100%;
            aspect-ratio: 1;
            margin-right: calc(7.4 / 108) * 100%;
            margin-bottom: calc(6.7 / 108) * 100%;
            background: #eaeff7;
            border-radius: 50%;
          }
          .lines-wrap {
            flex: 1;
            padding-top: calc(2 / 108) * 100%;
          }
          .line1 {
            width: calc(53.4 / 82) * 100%;
            aspect-ratio: calc(53.4 / 3.4);
            background: #eaeff7;
            border-radius: 1px;
          }
          .line2 {
            width: calc(25.4 / 82) * 100%;
            aspect-ratio: calc(25.4 / 3.4);
            margin-top: 5px;
            background: #eaeff7;
            border-radius: 1px;
          }
        }
        .right-item {
          width: 100%;
          aspect-ratio: calc(44 / 8.8);
          margin-bottom: calc(10.14 / 44 * 100%);
          background: #eaeff7;
          border-radius: calc(1.1 / 44 * 100%);
        }
      }
    }
  }

  &.active {
    background: linear-gradient(180deg, #f4f7ff -22.05%, #fff 85.58%);
    border: 2.6px solid rgb(var(--ui-primary));
    box-shadow: 0 2.6px 13px 0 #59626940;
  }

  // 暗色模式
  &.dark {
    background: linear-gradient(0deg, #3a3e43 0%, #3a3e43 100%), linear-gradient(180deg, #f4f7ff -22.05%, #fff 85.58%);
    border-color: transparent;

    &.active {
      border-color: rgb(var(--ui-primary));
    }

    .item-content {
      background: linear-gradient(180deg, #ffffff1a 0%, #ffffff00 100%);

      .skeleton {
        background: #111213;

        header {
          background: #26272a !important;

          .dot,
          .bar {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .skeleton-body {
          .aside {
            background: #25282d;

            .side-line {
              background: #32353b;
            }
          }
          .main {
            background: #25282d;

            .dot,
            .line1,
            .line2,
            .right-item {
              background: #32353b;
            }
          }
        }
      }
    }
  }
}
</style>
32

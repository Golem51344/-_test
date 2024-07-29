<script setup lang="ts">
import { message } from 'ant-design-vue';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'LayoutSetting',
});

const settingsStore = useSettingsStore();
const menu = ref(settingsStore.globalSettings.menu.menuMode);

const modeSide = reactive<
  {
    describe: string
    placement: string
    active: Settings.menu['menuMode']
  }[]
>([
  {
    describe: '顶部模式',
    placement: 'bottom',
    active: 'head',
  },
  {
    describe: '侧边栏模式 (含主导航)',
    placement: 'bottom',
    active: 'side',
  },
  {
    describe: '侧边栏模式 (不含主导航)',
    placement: 'bottom',
    active: 'single',
  },
  {
    describe: '侧边栏精简模式',
    placement: 'bottom',
    active: 'only-side',
  },
  {
    describe: '顶部精简模式',
    placement: 'bottom',
    active: 'only-head',
  },
]);

function clickHandle(item: Settings.menu['menuMode']) {
  if (item) {
    menu.value = item;
    settingsStore.globalSettings.menu.menuMode = item;
    const jsonStr = JSON.stringify({
      menu: {
        menuMode: item,
      },
    });
    postSysconfigAddOrEidtSysThemeStyleConfig({ content: jsonStr }).then((res: API.ResponseDataBoolean) => {
      if (res.success) {
        message.success('设置成功');
      }
    });
  }
}
</script>

<template>
  <div
    w-full
    h-full
    p-10px
  >
    <div class="w-full h-full bg-white overflow-y-auto p-10px flex flex-col box-border dark:bg-[#141414]">
      <div class="bg-[#F0F4FF] h-[38px] pl-[16px] flex flex-row items-center dark:bg-[#32353B]">
        <PubSvgIcon name="icon_layout" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">布局模式</span>
      </div>
      <div class="mt-[15px] flex-1 flex flex-row">
        <div class="flex-none w-[110px] text-right font-400 text-[#4e5969] text-[14px] pt-10px dark:text-[#C9CDD4]">
          模式选择
        </div>
        <div class="flex-auto grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2]">
          <div
            v-for="mode in modeSide"
            :key="mode.active"
            class="item"
            :class="[menu === mode.active ? 'active' : '', `item-${mode.active}`]"
            aspect="[9/6]"
            @click="clickHandle(mode.active)"
          >
            <div class="text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">
              {{ mode.describe }}
            </div>
            <div class="my-[6px] mode" :class="`mode-${mode.active}`">
              <div class="mode-container" />
            </div>
            <div class="flex-1 w-[75%] rounded-[8px] jb py-[10px] flex justify-center">
              <div class="layout-demo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 26px;
  cursor: pointer;
  background: linear-gradient(180deg, var(--g-bg) 0%, var(--g-bg) 100%);
  border: 1px solid var(--g-tabbar-tab-hover-bg);
  border-radius: 8px;
  .mode {
    --at-apply: relative w-16 h-12 transition;

    &::before,
    &::after,
    .mode-container {
      --at-apply: absolute pointer-events-none;
      border-width: 0.15rem;
    }

    &::before {
      --at-apply: content-empty bg-ui-primary;
    }

    &::after {
      --at-apply: content-empty bg-ui-primary/60;
    }

    .mode-container {
      --at-apply: bg-ui-primary/20 border-dashed border-ui-primary;

      &::before {
        --at-apply: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --at-apply: top-2 bottom-2 left-2 w-2 rounded-tl-1 rounded-bl-1;
      }

      &::after {
        --at-apply: top-2 bottom-2 left-4.5 w-3;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-r-2 inset-b-2 inset-l-8 rounded-tr-1 rounded-br-1;
      }
    }

    &-head {
      &::before {
        --at-apply: top-2 left-2 right-2 h-2 rounded-tl-1 rounded-tr-1;
      }

      &::after {
        --at-apply: top-4.5 left-2 bottom-2 w-3 rounded-bl-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-r-2 inset-b-2 inset-l-5.5 rounded-br-1;
      }
    }

    &-single {
      &::after {
        --at-apply: top-2 left-2 bottom-2 w-3 rounded-tl-1 rounded-bl-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-r-2 inset-b-2 inset-l-5.5 rounded-tr-1 rounded-br-1;
      }
    }

    &-only-side {
      &::before {
        --at-apply: top-2 bottom-2 left-2 w-2 rounded-tl-1 rounded-bl-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-r-2 inset-b-2 inset-l-4.5 rounded-tr-1 rounded-br-1;
      }
    }

    &-only-head {
      &::before {
        --at-apply: top-2 left-2 right-2 h-2 rounded-tl-1 rounded-tr-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-r-2 inset-b-2 inset-l-2 rounded-bl-1 rounded-br-1;
      }
    }
  }
  .jb {
    background: linear-gradient(180deg, var(--g-container-bg) 0%, #ffffff00 100%);
    .layout-demo {
      width: 70%;
    }
  }
  &-side {
    .layout-demo {
      background: url("@/assets/images/layout/item2.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-head {
    .layout-demo {
      background: url("@/assets/images/layout/item1.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-single {
    .layout-demo {
      background: url("@/assets/images/layout/item3.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-only-side {
    .layout-demo {
      background: url("@/assets/images/layout/item4.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-only-head {
    .layout-demo {
      background: url("@/assets/images/layout/item5.webp") no-repeat;
      background-size: 100%;
    }
  }
  &.active {
    border: 2.6px solid rgb(var(--ui-primary));
    border-radius: 8px;
    box-shadow: 0 2.6px 13px 0 #59626940;
  }
}
[data-theme="dark"],
[data-theme="dracula"],
[data-theme="luxury"],
[data-theme="stone"],
[data-theme="night"],
[data-theme="synthwave"] {
  .item {
    background: #3a3e43;
    border: 1px solid transparent;
    // .jb {
    //   background: linear-gradient(180deg, #ffffff1a 0%, #ffffff00 100%);
    // }
    &-side {
      .layout-demo {
        background: url("@/assets/images/layout/item2_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-head {
      .layout-demo {
        background: url("@/assets/images/layout/item1_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-single {
      .layout-demo {
        background: url("@/assets/images/layout/item3_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-only-side {
      .layout-demo {
        background: url("@/assets/images/layout/item4_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-only-head {
      .layout-demo {
        background: url("@/assets/images/layout/item5_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &.active {
      border: 2.6px solid rgb(var(--ui-primary));
      border-radius: 8px;
      box-shadow: 0 2.6px 13px 0 #59626940;
    }
  }
}
</style>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'PageWSetting',
});

const settingsStore = useSettingsStore();

const widthMode = ref(settingsStore.globalSettings.layout.widthMode);

const widthModeList = reactive<
  {
    describe: string
    active: Settings.layout['widthMode']
    class: string
  }[]
>([
  {
    describe: '自适应',
    active: 'adaption',
    class: 'mode-adaption',
  },
  {
    describe: '自适应 (有最小宽度)',
    active: 'adaption-min-width',
    class: 'mode-adaption-min-width',
  },
  {
    describe: '定宽居中',
    active: 'center',
    class: 'mode-center',
  },
  {
    describe: '定宽居中 (有最大宽度)',
    active: 'center-max-width',
    class: 'mode-center-max-width',
  },
]);

function clickHandle(item: Settings.layout['widthMode']) {
  if (item) {
    widthMode.value = item;
    settingsStore.globalSettings.layout.widthMode = item;
    const jsonStr = JSON.stringify({
      layout: {
        widthMode: item,
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
        <PubSvgIcon name="icon_page_size" class="text-base mr-[6px]" :size="22" />
        <span class="text-[16px] text-[#1d2129] dark:text-[#C9CDD4]">页宽模式</span>
      </div>
      <div class="mt-[15px] flex-1 flex flex-row">
        <div class="flex-none w-[110px] text-right font-400 text-[#4e5969] text-[14px] pt-10px dark:text-[#C9CDD4]">
          模式选择
        </div>
        <div class="flex-auto grid grid-cols-3 gap-[20px] px-30px w-full h-0 max-w-1500px" aspect="[3/2]">
          <div
            v-for="mode in widthModeList"
            :key="mode.active"
            class="item dark:bg-[#3A3E43]"
            :class="[widthMode === mode.active ? 'active' : '', `item-${mode.active}`]"
            aspect="[9/6]"
            @click="clickHandle(mode.active)"
          >
            <div class="text-[#4E5969] text-[14px] dark:text-[#C9CDD4]">
              {{ mode.describe }}
            </div>
            <div class="my-12px w-48px h-32px mode" />
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
  .jb {
    background: linear-gradient(180deg, var(--g-container-bg) 0%, #ffffff00 100%);
    .layout-demo {
      width: 70%;
    }
  }
  &-adaption {
    .mode {
      background: url("@/assets/images/page-width/icon_auto.webp") no-repeat;
      background-size: 100% 100%;
    }
    .layout-demo {
      background: url("@/assets/images/page-width/auto.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-adaption-min-width {
    .mode {
      background: url("@/assets/images/page-width/icon_auto_min_w.webp") no-repeat;
      background-size: 100% 100%;
    }
    .layout-demo {
      background: url("@/assets/images/page-width/auto_min_w.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-center {
    .mode {
      background: url("@/assets/images/page-width/icon_middle.webp") no-repeat;
      background-size: 100% 100%;
    }
    .layout-demo {
      background: url("@/assets/images/page-width/middle.webp") no-repeat;
      background-size: 100%;
    }
  }
  &-center-max-width {
    .mode {

      background: url("@/assets/images/page-width/icon_middle_max_w.webp") no-repeat;
      background-size: 100% 100%;
    }
    .layout-demo {
      background: url("@/assets/images/page-width/middle_max_w.webp") no-repeat;
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
    &-adaption {
      .mode {
        background: url("@/assets/images/page-width/icon_auto_dark.webp") no-repeat;
        background-size: 100% 100%;
      }
      .layout-demo {
        background: url("@/assets/images/page-width/auto_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-adaption-min-width {
      .mode {
        background: url("@/assets/images/page-width/icon_auto_min_w_dark.webp") no-repeat;
        background-size: 100% 100%;
      }
      .layout-demo {
        background: url("@/assets/images/page-width/auto_min_w_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-center {
      .mode {
        background: url("@/assets/images/page-width/icon_middle_dark.webp") no-repeat;
        background-size: 100% 100%;
      }
      .layout-demo {
        background: url("@/assets/images/page-width/middle_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &-center-max-width {
      .mode {
        background: url("@/assets/images/page-width/icon_middle_max_w_dark.webp") no-repeat;
        background-size: 100% 100%;
      }
      .layout-demo {
        background: url("@/assets/images/page-width/middle_max_w_dark.webp") no-repeat;
        background-size: 100%;
      }
    }
    &.active {
      border: 2.6px solid rgb(var(--ui-primary));
    }
  }
}
</style>

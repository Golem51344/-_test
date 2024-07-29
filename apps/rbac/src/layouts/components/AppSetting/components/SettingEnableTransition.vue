<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'SettingEnableTransition',
});
const settingsStore = useSettingsStore();

const { enableTransition, transitionMode } = toRefs(settingsStore.settings.mainPage);

function clickHandle(item: Settings.mainPage['transitionMode']) {
  if (item) {
    transitionMode.value = item;
  }
}
const transitionModeList = reactive<
  {
    describe: string
    active: Settings.mainPage['transitionMode']
    class: string
  }[]
>([
  {
    describe: '淡入淡出',
    active: 'fade',
    class: 'mode-fade',
  },
  {
    describe: '向左滑动',
    active: 'slide-left',
    class: 'mode-slide-left',
  },
  {
    describe: '向右滑动',
    active: 'slide-right',
    class: 'mode-slide-right',
  },
  {
    describe: '向上滑动',
    active: 'slide-top',
    class: 'mode-slide-top',
  },
  {
    describe: '向下滑动',
    active: 'slide-bottom',
    class: 'mode-slide-bottom',
  },
]);
</script>

<template>
  <Hdivider title="页面切换动画">
    <div class="flex items-center justify-center pb-4">
      <HToggle v-model="enableTransition" />
    </div>
    <div v-if="enableTransition" class="transition-mode">
      <HTooltip
        v-for="(transition, index) in transitionModeList"
        :key="index"
        :text="transition.describe"
        placement="bottom"
        :delay="500"
      >
        <div
          class="mode"
          :class="[transitionMode === transition.active ? 'active' : '', transition.class]"
          @click="clickHandle(transition.active)"
        />
      </HTooltip>
    </div>
  </Hdivider>
</template>

<style lang="scss" scoped>
.transition-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative flex items-center justify-center w-14 h-10 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::after {
      --at-apply: content-empty absolute w-3/5 h-3/5 top-1/5 left-1/5 rounded-2 bg-stone-2 dark:bg-stone-9 transition;
    }

    &.mode-fade {
      &::after {
        animation: transition-mode-fade-after 1.5s infinite;
      }

      @keyframes transition-mode-fade-after {
        0% {
          opacity: 1;
        }

        30%,
        35% {
          opacity: 0;
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-left {
      &::after {
        animation: transition-mode-slide-left 1.5s infinite;
      }

      @keyframes transition-mode-slide-left {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-right {
      &::after {
        animation: transition-mode-slide-right 1.5s infinite;
      }

      @keyframes transition-mode-slide-right {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-top {
      &::after {
        animation: transition-mode-slide-top 1.5s infinite;
      }

      @keyframes transition-mode-slide-top {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-bottom {
      &::after {
        animation: transition-mode-slide-bottom 1.5s infinite;
      }

      @keyframes transition-mode-slide-bottom {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
}
</style>

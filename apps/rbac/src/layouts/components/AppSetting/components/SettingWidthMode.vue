<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import EpBack from '~icons/ep/back';
import EpRight from '~icons/ep/right';

defineOptions({
  name: 'SettingWidthMode',
});
const settingsStore = useSettingsStore();

const widthMode = toRef(settingsStore.settings.layout, 'widthMode');

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
  }
}
</script>

<template>
  <Hdivider title="页宽模式">
    <div class="app-width-mode">
      <template v-for="mode in widthModeList" :key="mode.active">
        <HTooltip
          :text="mode.describe"
          placement="bottom"
          :delay="500"
        >
          <div
            class="mode"
            :class="[mode.class, widthMode === mode.active ? 'active' : '']"
            @click="clickHandle(mode.active)"
          >
            <template v-if="mode.active !== 'center'">
              <EpBack class="left" />
              <EpRight class="right" />
            </template>
          </div>
        </HTooltip>
      </template>
    </div>
  </Hdivider>
</template>

<style lang="scss" scoped>
.app-width-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition of-hidden;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &-adaption {
      &::before {
        --at-apply: content-empty absolute w-full h-full bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-1;
      }

      .right {
        --at-apply: right-1;
      }
    }

    &-adaption-min-width {
      &::before {
        --at-apply: content-empty absolute w-1/2 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-0.5;
      }

      .right {
        --at-apply: right-0.5;
      }
    }

    &-center {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }
    }

    &-center-max-width {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark:bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-2.5;
      }

      .right {
        --at-apply: right-2.5;
      }
    }
  }
}
</style>

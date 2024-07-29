<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'SettingMode',
});
const settingsStore = useSettingsStore();
const menu = toRef(settingsStore.settings.menu, 'menuMode');

const modeSide = reactive<
  {
    describe: string
    placement: string
    active: Settings.menu['menuMode']
  }[]
>([
  {
    describe: '侧边栏模式 (含主导航)',
    placement: 'bottom',
    active: 'side',
  },
  {
    describe: '顶部模式',
    placement: 'bottom',
    active: 'head',
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
  }
}
</script>

<template>
  <Hdivider title="导航栏模式">
    <div class="menu-mode">
      <template v-for="mode in modeSide" :key="mode.active">
        <HTooltip
          :text="mode.describe"
          :placement="mode.placement"
          :delay="500"
        >
          <div
            class="mode"
            :class="[menu === mode.active ? 'active' : '', `mode-${mode.active}`]"
            @click="clickHandle(mode.active)"
          >
            <div class="mode-container" />
          </div>
        </HTooltip>
      </template>
    </div>
  </Hdivider>
</template>

<style scoped lang="scss">
.menu-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --at-apply: absolute pointer-events-none;
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
}
</style>

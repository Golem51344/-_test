<script setup lang="ts">
import type { Menu } from '#/menu';
import NotCursor from '@/layouts/components/NotCursor/index.vue';

defineProps<{
  items: Menu.recordMainRaw[]
  activeIndex: number
}>();

const emit = defineEmits<{
  onMenuClick: [index: number, item: Menu.recordMainRaw]
}>();

function menuClick(index: number, item: Menu.recordMainRaw) {
  emit('onMenuClick', index, item);
}
</script>

<template>
  <VMenu
    :triggers="['hover']"
    :popper-triggers="['hover']"
    v-bind="$attrs"
    :delay="0"
    :auto-hide="false"
    theme="more-appley"
    :distance="-6"
  >
    <slot />
    <template #popper>
      <div class="menu-more-container" box-border>
        <template v-for="(item, index) in items" :key="index">
          <NotCursor :is-cursor="item.meta?.isDev" :skidding="150">
            <div
              cursor-pointer flex="~  items-center" box-border p-15px w-full h-40px rounded-8px text-sm mb-10px
              :class="{
                'bg-[#fff] dark:bg-[var(--g-header-menu-active-bg)]!': index === activeIndex,
                'is-dev': item.meta?.isDev,
              }"
              @click="menuClick(index, item)"
            >
              <PubSvgIcon v-if="item.meta?.icon" :name="item.meta.icon" size="18px" mr-6px />
              <span>{{ item.meta?.title }}</span>
            </div>
          </NotCursor>
        </template>
      </div>
    </template>
  </VMenu>
</template>

<style lang="scss" scoped>
.menu-more-container {
  min-width: 180px;
  padding: 10px;
  padding-bottom: 0px;
  .is-dev {
    cursor: not-allowed;
    i {
      filter: grayscale(100%);
    }
    span {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss">
.v-popper--theme-more-appley {
  z-index: 1000;
  .v-popper__inner {
    background-image: linear-gradient(-43deg, #ffffff 0%, #eaf3ff 87%);
    border: 1px solid #ffffff;
    border-radius: 8px;
    box-shadow: 8px 16px 28px -8px #8195b74f;
  }
  .v-popper__arrow-container {
    display: none;
  }
}
.dark {
  .v-popper--theme-more-appley {
    .v-popper__inner {
      background-image: linear-gradient(-43deg, #141414  0%, #141414 87%);
      border: 1px solid #4b4f53;
      border-radius: 8px;
      box-shadow: none;
    }
  }
}
</style>

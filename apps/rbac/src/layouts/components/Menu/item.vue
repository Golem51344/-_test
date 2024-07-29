<script setup lang="ts">
import type { SubMenuItemProps } from './types';
import { rootMenuInjectionKey } from './types';
import { i18nTitleInjectionKey } from '@/utils/injectionKeys';

const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
    expand: false,
  },
);

const rootMenu = inject(rootMenuInjectionKey)!;
const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true);

const itemRef = ref<HTMLElement>();

const isActived = computed(() => {
  return props.subMenu
    ? rootMenu.subMenus[props.uniqueKey[props.uniqueKey.length - 1]]?.active
    : rootMenu.activeIndex === props.uniqueKey[props.uniqueKey.length - 1];
});

const isItemActive = computed(() => {
  return isActived.value && (!props.subMenu || rootMenu.isMenuPopup);
});

const icon = computed(() => {
  let icon;
  if (props.item.meta?.icon) {
    icon = props.item.meta.icon;
  }
  if (isActived.value) {
    if (props.item.meta?.activeIcon === 'system-point') {
      icon = 'system-point';
    }
    else if (props.item.meta?.activeIcon) {
      icon = props.item.meta.activeIcon;
    }
  }
  return icon;
});

// 缩进样式
const indentStyle = computed(() => {
  return !rootMenu.isMenuPopup
    ? `padding-left: ${32 * (props.level ?? 0)}px`
    : '';
});

defineExpose({
  ref: itemRef,
});
</script>

<template>
  <div
    ref="itemRef"
    class="menu-item relative transition-all"
    :class="{
      'active': isItemActive,
      'px-2 py-1': rootMenu.props.rounded,
      'px-1! py-2!': rootMenu.props.rounded && rootMenu.isMenuPopup && level === 0 && rootMenu.props.mode === 'horizontal',
    }"
  >
    <div
      class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 px-5 py-14px text-[var(--g-sub-sidebar-menu-color)] transition-all hover:(bg-[var(--g-sub-sidebar-menu-hover-bg)] text-[var(--g-sub-sidebar-menu-hover-color)])"
      :class="{
        'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': isItemActive,
        'rounded-2': rootMenu.props.rounded,
        'px-2!': rootMenu.isMenuPopup && level === 0,
        'py-3!': rootMenu.props.rounded && rootMenu.isMenuPopup && level !== 0,
      }"
      :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)"
    >
      <div
        class="menu-item-container-layout inline-flex flex-1 items-center justify-center gap-[12px]"
        :class="{
          'flex-col gap-none': rootMenu.isMenuPopup && level === 0,
          'flex-col gap-[2px]!': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
          'w-full': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
          'w-[50px]': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'horizontal',
        }"
        :style="indentStyle"
      >
        <!-- 特殊化处理，有些时候想要的是一个点 -->
        <PubSvgIcon
          v-if="icon && icon !== 'system-point'"
          :name="icon"
          :size="20"
          class="menu-item-container-icon transition-transform group-hover:scale-115"
        />
        <span
          v-if="!(rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName)"
          class="title w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width"
          :class="{
            'opacity-0 w-0 h-0': rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName,
            'w-full text-center': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
            'system-point': icon === 'system-point' && isItemActive,
          }"
        >
          {{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}
        </span>
        <HBadge
          v-if="item.meta?.badge"
          :value="typeof item.meta.badge === 'function' ? item.meta.badge() : item.meta.badge"
          class="badge"
          :class="{
            'opacity-0': rootMenu.isMenuPopup && level === 0,
          }"
        />
      </div>
      <i
        v-if="subMenu && !(rootMenu.isMenuPopup && level === 0)"
        class="sharp-corner"
        :class="[
          expand
            ? 'before:-rotate-45 before:-translate-x-[2px] after:rotate-45 after:translate-x-[2px]'
            : 'before:rotate-45 before:-translate-x-[2px] after:-rotate-45 after:translate-x-[2px] ',
          rootMenu.isMenuPopup && level === 0 && 'opacity-0',
          rootMenu.isMenuPopup && level !== 0 && '-rotate-90 -top-[1.5px]',
        ]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  :deep(> span) {
    right: 0;
    left: initial !important;
  }
}

.sharp-corner {
  --at-apply: relative ml-1 w-[10px];

  &::before {
    --at-apply: absolute h-1.5px w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px];
  }

  &::after {
    --at-apply: absolute h-1.5px w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px];
  }
}
.sub-sidebar-container {
  .menu-item-container-layout:has(.system-point) {
    position: relative;
    &::before {
      position: absolute;
      left: 12px;
      width: 6px;
      height: 6px;
      content: "";
      background: var(--g-sub-sidebar-menu-active-color);
      border-radius: 50%;
    }
  }
}
</style>

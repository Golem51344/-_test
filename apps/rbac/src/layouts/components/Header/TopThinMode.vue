<script setup lang="ts">
import Menu from '../Menu/index.vue';
import useMenuStore from '@/store/modules/menu';
import useSettingsStore from '@/store/modules/settings';
/* =============================================
=               Vue SFC Options 配置           =
============================================= */
defineOptions({
  name: 'TopThinMode',
});
/* =============================================
=                   逻辑代码                   =
============================================= */
const route = useRoute();

const settingsStore = useSettingsStore();
const menuStore = useMenuStore();
const menuRef = ref<HTMLElement | null>();

// 顶部模式鼠标滚动
function handlerMouserScroll(event: WheelEvent) {
  menuRef.value!.scrollBy({
    left: (event.deltaY || event.detail) > 0 ? 50 : -50,
  });
}
</script>

<template>
  <div
    ref="menuRef"
    class="menu-container"
    @wheel.prevent="handlerMouserScroll"
  >
    <Menu
      :menu="menuStore.allMenus"
      :value="route.meta.activeMenu || route.path"
      mode="horizontal"
      show-collapse-name
      :rounded="settingsStore.settings.menu.isRounded"
      class="menu"
      :class="{
        [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
      }"
    />
  </div>
</template>

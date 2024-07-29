<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'SettingBreadcrumb',
});
const settingsStore = useSettingsStore();
const { breadcrumb, menu } = toRefs(settingsStore.settings);
</script>

<template>
  <Hdivider title="面包屑导航">
    <div class="setting-item">
      <div class="label">
        是否启用
      </div>
      <HToggle v-model="breadcrumb.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        风格
      </div>
      <HCheckList
        v-model="breadcrumb.style"
        :options="[
          { label: '默认', value: '' },
          { label: '现代', value: 'modern' },
        ]"
        :disabled="!breadcrumb.enable"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否显示主导航
      </div>
      <HToggle
        v-model="breadcrumb.enableMainMenu"
        :disabled="!breadcrumb.enable || ['single'].includes(menu.menuMode)"
      />
    </div>
  </Hdivider>
</template>

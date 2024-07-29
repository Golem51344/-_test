<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'SettingPage',
});
const settingsStore = useSettingsStore();
const mainPage = toRef(settingsStore.settings, 'mainPage');
</script>

<template>
  <Hdivider title="页面">
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="mainPage.enableHotkeys" />
    </div>
  </Hdivider>
</template>

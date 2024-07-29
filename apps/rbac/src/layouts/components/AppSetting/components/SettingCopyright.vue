<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';

defineOptions({
  name: 'SettingCopyright',
});
const settingsStore = useSettingsStore();
const copyright = toRef(settingsStore.settings, 'copyright');
</script>

<template>
  <Hdivider title="底部版权">
    <div class="setting-item">
      <div class="label">
        是否启用
      </div>
      <HToggle v-model="copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        日期
      </div>
      <HInput v-model="copyright.dates" :disabled="!copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        公司
      </div>
      <HInput v-model="copyright.company" :disabled="!copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        网址
      </div>
      <HInput v-model="copyright.website" :disabled="!copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        备案
      </div>
      <HInput v-model="copyright.beian" :disabled="!copyright.enable" />
    </div>
  </Hdivider>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingNavSearch',
});
const settingsStore = useSettingsStore();
const navSearch = toRef(settingsStore.settings, 'navSearch');
</script>

<template>
  <Hdivider title="导航搜索">
    <div class="setting-item">
      <div class="label">
        是否启用
        <HTooltip text="对导航进行快捷搜索">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="navSearch.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="navSearch.enableHotkeys" :disabled="!navSearch.enable" />
    </div>
  </Hdivider>
</template>

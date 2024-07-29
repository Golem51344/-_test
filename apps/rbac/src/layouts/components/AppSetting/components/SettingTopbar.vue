<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingTopbar',
});
const settingsStore = useSettingsStore();
const { topbar, tabbar } = toRefs(settingsStore.settings);
</script>

<template>
  <Hdivider title="顶栏">
    <div class="setting-item">
      <div class="label">
        模式
      </div>
      <HCheckList
        v-model="topbar.mode"
        :options="[
          { label: '静止', value: 'static' },
          { label: '固定', value: 'fixed' },
          { label: '粘性', value: 'sticky' },
        ]"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        展示切换
        <HTooltip text="切换标签栏和工具栏的展示顺序">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="topbar.switchTabbarAndToolbar" :disabled="!tabbar.enable" />
    </div>
  </Hdivider>
</template>

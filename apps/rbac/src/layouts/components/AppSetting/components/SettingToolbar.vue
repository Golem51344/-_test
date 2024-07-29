<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingToolbar',
});
const settingsStore = useSettingsStore();
const toolbar = toRef(settingsStore.settings, 'toolbar');
</script>

<template>
  <Hdivider title="工具栏">
    <div class="setting-item">
      <div class="label">
        通知中心
        <HTooltip text="该功能具体业务功能需自行开发，框架仅提供示例模版">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="toolbar.enableNotification" />
    </div>
    <div class="setting-item">
      <div class="label">
        国际化
      </div>
      <HToggle v-model="toolbar.enableI18n" />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        全屏
      </div>
      <HToggle v-model="toolbar.enableFullscreen" />
    </div>
    <div class="setting-item">
      <div class="label">
        页面刷新
        <HTooltip text="使用框架内提供的刷新功能进行页面刷新">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="toolbar.enablePageReload" />
    </div>
    <div class="setting-item">
      <div class="label">
        颜色主题
        <HTooltip text="开启后可在明亮/暗黑模式中切换">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="toolbar.enableColorScheme" />
    </div>
  </Hdivider>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingHome',
});
const settingsStore = useSettingsStore();
const { home, toolbar } = toRefs(settingsStore.settings);
</script>

<template>
  <Hdivider title="主页">
    <div class="setting-item">
      <div class="label">
        是否启用
        <HTooltip text="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="home.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        主页名称
        <HTooltip text="开启国际化时，该设置无效">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HInput v-model="home.title" :disabled="toolbar.enableI18n" />
    </div>
  </Hdivider>
</template>

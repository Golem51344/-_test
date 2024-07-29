<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingOther',
});
const settingsStore = useSettingsStore();
const {
  enablePermission,
  enableProgress,
  enableDynamicTitle,
  storagePrefix,
  enableWatermark,
} = toRefs(settingsStore.settings.app);
</script>

<template>
  <Hdivider title="其它">
    <div class="setting-item">
      <div class="label">
        是否启用权限
      </div>
      <HToggle v-model="enablePermission" />
    </div>
    <div class="setting-item">
      <div class="label">
        载入进度条
        <HTooltip text="该功能开启时，跳转路由会看到页面顶部有进度条">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="enableProgress" />
    </div>
    <div class="setting-item">
      <div class="label">
        动态标题
        <HTooltip text="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="enableDynamicTitle" />
    </div>
    <div class="setting-item">
      <div class="label">
        Storage 前缀
        <HTooltip text="localStorage 和 sessionStorage 的字段前缀">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HInput v-model="storagePrefix" />
    </div>
    <div class="setting-item">
      <div class="label">
        页面水印
      </div>
      <HToggle v-model="enableWatermark" />
    </div>
  </Hdivider>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingTabbar',
});
const settingsStore = useSettingsStore();
const tabbar = toRef(settingsStore.settings, 'tabbar');
</script>

<template>
  <Hdivider title="标签栏">
    <div class="setting-item">
      <div class="label">
        是否启用
      </div>
      <HToggle v-model="tabbar.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        风格
      </div>
      <HCheckList
        v-model="tabbar.style"
        :options="[
          { label: '时尚', value: 'fashion' },
          { label: '卡片', value: 'card' },
          { label: '方块', value: 'square' },
        ]"
        :disabled="!tabbar.enable"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否显示图标
      </div>
      <HToggle v-model="tabbar.enableIcon" :disabled="!tabbar.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        标签页合并规则
      </div>
      <HSelect
        v-model="tabbar.mergeTabsBy"
        :options="[
          { label: '不合并', value: '' },
          { label: '根据 activeMenu 合并', value: 'activeMenu' },
          { label: '根据路由名称合并', value: 'routeName' },
        ]"
        :disabled="!tabbar.enable"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用记忆功能
        <HTooltip text="开启该功能后，非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失">
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle v-model="tabbar.enableMemory" :disabled="!tabbar.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="tabbar.enableHotkeys" :disabled="!tabbar.enable" />
    </div>
  </Hdivider>
</template>

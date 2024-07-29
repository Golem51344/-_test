<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import RiQuestionLine from '~icons/ri/question-line';

defineOptions({
  name: 'SettingMenu',
});
const settingsStore = useSettingsStore();
const menu = toRef(settingsStore.settings, 'menu');
</script>

<template>
  <Hdivider title="导航栏">
    <div class="setting-item">
      <div class="label">
        主导航切换跳转
        <HTooltip
          text="开启该功能后，切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航"
        >
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle
        v-model="menu.switchMainMenuAndPageJump"
        :disabled="['single', 'only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航自动隐藏
        <HTooltip
          text="开启该功能后，切换主导航时，如果次导航里只有一个导航时，则自动隐藏"
        >
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle
        v-model="menu.subMenuOnlyOneHide"
        :disabled="['single', 'only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航保持展开一个
        <HTooltip
          text="开启该功能后，次导航只保持单个菜单的展开"
        >
          <RiQuestionLine />
        </HTooltip>
      </div>
      <HToggle
        v-model="menu.subMenuUniqueOpened"
        :disabled="['only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航是否折叠
      </div>
      <HToggle
        v-model="menu.subMenuCollapse"
        :disabled="['only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
    <div
      v-if="settingsStore.mode === 'pc'"
      class="setting-item"
    >
      <div class="label">
        显示次导航折叠按钮
      </div>
      <HToggle
        v-model="menu.enableSubMenuCollapseButton"
        :disabled="['only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否圆角
      </div>
      <HToggle v-model="menu.isRounded" />
    </div>
    <div class="setting-item">
      <div class="label">
        激活风格
      </div>
      <HCheckList
        v-model="menu.menuActiveStyle"
        :options="[
          { icon: 'i-jam-stop-sign', value: '' },
          { icon: ['head', 'only-head'].includes(menu.menuMode) ? 'i-ep-caret-top' : 'i-ep-caret-left', value: 'arrow' },
          { icon: ['side', 'only-side'].includes(menu.menuMode) ? 'i-tabler-minus-vertical' : 'i-tabler-minus', value: 'line' },
          { icon: 'i-icon-park-outline-dot', value: 'dot' },
        ]"
        :disabled="menu.menuMode === 'single'"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle
        v-model="menu.enableHotkeys"
        :disabled="['single', 'only-side', 'only-head'].includes(menu.menuMode)"
      />
    </div>
  </Hdivider>
</template>

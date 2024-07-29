<script setup lang="ts">
import { useLoginTabs } from '@/views/system/login/composables';

defineOptions({
  name: 'LoginFrom',
});

const { tabs, initialTab, changeActiveTab } = useLoginTabs();
</script>

<template>
  <div class="login-warp">
    <div class="login-tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.title"
        class="login-tab"
        :class="{ active: initialTab === index }"
        @click="changeActiveTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="login-form">
      <component :is="tabs[initialTab].component" :key="tabs[initialTab].title" :name="tabs[initialTab].title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-warp {
  display: flex;
  flex-direction: column;
  width: 456px;
  background: transparent;

  .login-tabs {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    border: 1px solid #e7e8e9;
    border-radius: 4px;

    .login-tab {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 116px;
      height: 40px;
      font-size: 16px;
      color: #8a8e92;
      cursor: pointer;
      border-radius: 4px;
    }

    .active {
      color: #2f6bff;
      background: #ecf1fd;
    }
  }

  .login-form {
    position: relative;
    min-height: 350px;
  }
}
</style>

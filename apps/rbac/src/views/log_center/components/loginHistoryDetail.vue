<script setup lang="ts">
import BrowserType from './browserType.vue';

defineProps({
  visible: Boolean,
  data: Object,
});
const emit = defineEmits(['close']);

function notifyClose() {
  emit('close');
}
</script>

<template>
  <a-drawer
    :open="visible"
    title="登录日志"
    placement="right"
    :width="900"
    :footer-style="{ textAlign: 'right' }"
    @close="notifyClose"
  >
    <div class="detail-info">
      <a-descriptions :column="2">
        <a-descriptions-item label="用户id">
          {{ data?.userId }}
        </a-descriptions-item>
        <a-descriptions-item label="账号名">
          {{ data?.loginName }}
        </a-descriptions-item>
        <a-descriptions-item label="用户姓名">
          {{ data?.realName }}
        </a-descriptions-item>
        <a-descriptions-item label="登录组织名称">
          {{ data?.orgName }}
        </a-descriptions-item>
        <a-descriptions-item label="登录IP">
          {{ data?.loginIp }}
        </a-descriptions-item>
        <a-descriptions-item label="登录时间">
          {{ data?.loginTime }}
        </a-descriptions-item>
        <a-descriptions-item label="登录类型">
          {{ data?.loginType }}
        </a-descriptions-item>
        <a-descriptions-item label="操作设备/操作系统类型">
          {{ data?.deviceType }}
        </a-descriptions-item>
        <a-descriptions-item label="登录浏览器">
          <BrowserType :browser-name="data?.browserName" />
        </a-descriptions-item>
        <a-descriptions-item label="登录是否成功">
          {{ data?.success ? '是' : '否' }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.detail-info {
  :deep(.ant-descriptions-item-label) {
    color: rgba($color: #000000, $alpha: 0.6);
  }
  :deep(.ant-descriptions-item-content) {
    color: rgba($color: #000000, $alpha: 1);
  }
}
</style>

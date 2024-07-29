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
    title="操作日志"
    placement="right"
    :width="900"
    :footer-style="{ textAlign: 'right' }"
    @close="notifyClose"
  >
    <div class="detail-info">
      <a-descriptions :column="2">
        <a-descriptions-item label="操作说明">
          {{ data?.title }}
        </a-descriptions-item>
        <a-descriptions-item label="操作类型">
          {{ data?.operateType }}
        </a-descriptions-item>
        <a-descriptions-item label="操作时间">
          {{ data?.operateTime }}
        </a-descriptions-item>
        <a-descriptions-item label="操作模块">
          {{ data?.moduleName }}
        </a-descriptions-item>
        <a-descriptions-item label="请求参数">
          {{ data?.requestParams }}
        </a-descriptions-item>
        <a-descriptions-item label="请求方法">
          {{ data?.requestMethod }}
        </a-descriptions-item>
        <a-descriptions-item label="请求地址">
          {{ data?.requestUri }}
        </a-descriptions-item>
        <a-descriptions-item label="操作人IP">
          {{ data?.remoteAddr }}
        </a-descriptions-item>
        <a-descriptions-item label="服务端IP">
          {{ data?.serverAddr }}
        </a-descriptions-item>
        <a-descriptions-item label="是否异常">
          {{ data?.success ? '否' : '是' }}
        </a-descriptions-item>
        <a-descriptions-item label="执行时间">
          {{ data?.executeTime }}ms
        </a-descriptions-item>
        <a-descriptions-item label="操作设备/操作系统类型">
          {{ data?.deviceType }}
        </a-descriptions-item>
        <a-descriptions-item label="浏览器名称">
          <BrowserType :browser-name="data?.browserName" />
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

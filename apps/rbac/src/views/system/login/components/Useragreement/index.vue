<script setup lang="ts">
defineOptions({
  name: 'Useragreement',
});

const checked = defineModel(
  'checked',
  {
    type: Boolean, default: true,
  });

function jumpUseragreementPage() {
  useWarn('暂未实现用户协议、隐私政策');
}
</script>

<template>
  <a-checkbox v-model:checked="checked">
    我已阅读并同意<span
      hover:underline
      decoration-2
      text="#1578FF"
      @click.prevent="jumpUseragreementPage"
    >用户协议、隐私政策</span>
  </a-checkbox>
</template>

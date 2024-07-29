<script setup lang="ts">
import eventBus from '@/utils/eventBus';

defineOptions({
  name: 'Preferences',
});
const PreferencesContent = defineAsyncComponent(() => import('./PreferencesContent.vue'));
const isShow = ref(false);

onMounted(() => {
  eventBus.on('global-preferences-toggle', () => {
    isShow.value = !isShow.value;
  });
});
</script>

<template>
  <HSlideover v-model="isShow" title="个人偏好设置">
    <PreferencesContent />
  </HSlideover>
</template>

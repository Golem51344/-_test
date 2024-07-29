<script setup lang="ts">
defineProps({
  browserName: {
    type: String,
    required: true,
  },
});

function getBrowserType(browser: string) {
  if (browser.includes('Chrome')) {
    return 'chrome';
  }

  if (browser.includes('Edge')) {
    return 'edge';
  }

  if (browser.includes('Safari')) {
    return 'safari';
  }

  if (browser.includes('Internet Explorer')) {
    return 'ie';
  }

  return 'other';
}
</script>

<template>
  <div flex items-center>
    <PubSvgIcon :name="`browser-${getBrowserType(browserName)}`" class="text-20px mr-5px" />
    <span>{{ browserName }}</span>
  </div>
</template>

<script setup lang="ts">
/* =============================================
=               Vue SFC Options 配置           =
============================================= */
defineOptions({
  name: 'OtherPage',
});
/* =============================================
=                   逻辑代码                   =
============================================= */
const router = useRouter();
function jump() {
  router.push({
    name: 'OtherPageDetail',
  });
}
</script>

<template>
  <PubPageMain>
    列表页
    <a-button type="primary" @click="jump">
      点击跳转入详情页
    </a-button>
  </PubPageMain>
</template>

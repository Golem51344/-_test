<script setup lang="ts">
/* =============================================
=               Vue SFC Options 配置           =
============================================= */
defineOptions({
  name: 'NotCursor',
});

withDefaults(defineProps<{
  isCursor?: boolean
  skidding?: number
}>(), {
  isCursor: false,
  skidding: 0,
});
/* =============================================
=                   逻辑代码                   =
============================================= */
</script>

<template>
  <slot v-if="!isCursor" />
  <VMenu
    v-else
    :triggers="['hover']"
    :skidding="skidding"
    :delay="0"
    :auto-hide="false"
    theme="not-cursor"
  >
    <slot />
    <template #popper>
      <div class="not-cursor-container" box-border flex="~ col justify-center items-center">
        <img src="@/assets/images/not-cursor.png" w-60px alt="">
        <div text="#B8BBBD 14px" mt-10px>
          该功能暂未上线，敬请期待！
        </div>
      </div>
    </template>
  </VMenu>
</template>

<style lang="scss" scoped>
.not-cursor-container {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.v-popper--theme-not-cursor {
  z-index: 1000;
  .v-popper__inner {
    width: 228px;
    height: 123px;
    background-image: linear-gradient(-55deg, #ffffff 0%, #eaf3ff 87%);
    border: 1px solid #ffffff;
    border-radius: 6px;
    box-shadow: 4px 8px 14px -4px #8195b74f;
    >div {
      width: 100%;
      height: 100%;
    }
  }
  .v-popper__arrow-container {
    display: none;
  }
}
.dark {
  .v-popper--theme-not-cursor {
    .v-popper__inner {
      background-image: linear-gradient(-43deg, #141414  0%, #141414 87%);
      border: 1px solid #4b4f53;
      border-radius: 8px;
      box-shadow: none;
    }
  }
}
</style>

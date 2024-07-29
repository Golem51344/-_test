<script setup lang="ts">
import QRCode from 'qrcode';
/* =============================================
=               Vue SFC Options 配置           =
============================================= */
defineOptions({
  name: 'LoginWithQRCode',
});

const props = withDefaults(defineProps<{
  name: string
}>(), {
  name: '浙政钉登录',
});
/* =============================================
=                   逻辑代码                   =
============================================= */
const canvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(300);
initQRCode();

function initQRCode() {
  onMounted(() => {
    QRCode.toCanvas(canvas.value!, props.name, {
      width: canvasWidth.value,
      color: {
        // QRCode 颜色值必须采用十六进制格式
        // 用一个red取得默认报错，就变相得到透明色
        light: 'red',
      },
    });
  });
}
</script>

<template>
  <div class="login-qc">
    <div class="qrcode-warp" mt-49px p-20px>
      <canvas ref="canvas" :width="canvasWidth" />
    </div>
    <div
      text="#8A8E92 16px"
      mt-30px
      flex
      items-center
    >
      <i bg-gradient-to-l from="#8A8E92" />
      请使用{{ props.name }}登录
      <i bg-gradient-to-r from="#8A8E92" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-qc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .qrcode-warp {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-content: border-box;
    width: 274px;
    height: 281px;
    background-image: linear-gradient(180deg, #eef3ff 0%, #fff0 100%);

    &::before {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      content: "";
      background: linear-gradient(180deg, #1578ff, transparent) border-box;
      border: 3px solid transparent;
      border-radius: 10px;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      mask-composite: exclude;
    }
  }

  i {
    display: block;
    width: 45px;
    height: 1px;
    margin: 0 8px;
    border-radius: 50%;
  }
}
</style>

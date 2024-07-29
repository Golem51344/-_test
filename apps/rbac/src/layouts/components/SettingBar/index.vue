<script lang="ts" setup>
import eventBus from '@/utils/eventBus';
import AntDesignSettingTwotone from '~icons/ant-design/setting-twotone';
import LetsIconsBookOpenDuotoneLine from '~icons/lets-icons/book-open-duotone-line';

defineOptions({
  name: 'SettingBar',
});

function openDocs() {
  window.open('http://124.223.184.245:10000/docs/');
}
</script>

<template>
  <div class="app-setting-warp">
    <div class="app-setting">
      <div class="app-setting-item" @click="eventBus.emit('global-app-setting-toggle')">
        <AntDesignSettingTwotone class="icon" text="18px" />
      </div>
      <div class="divider" />
      <div class="app-setting-item">
        <LetsIconsBookOpenDuotoneLine text="18px" @click="openDocs" />
      </div>
    </div>
    <div class="vue-devtools__anchor--glowing" />
  </div>
</template>

<style lang="scss" scoped>
.app-setting-warp {
  position: relative;
  position: fixed;
  top: calc(50%);
  right: 10px;
  z-index: 10;

  .vue-devtools__anchor--glowing {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 160px;
    height: 160px;
    pointer-events: none;
    background-image: linear-gradient(45deg, #00dc82, #36e4da, #0047e1);
    filter: blur(60px);
    border-radius: 9999px;
    opacity: 0;
    transition: all 1s ease;
    transform: translate(-25%, -25%);
  }

  &:hover {
    .vue-devtools__anchor--glowing {
      opacity: 0.7;
    }
  }
}

.app-setting {
  --at-apply: text-white dark:text-dark bg-ui-primary;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30px;
  height: 76px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 30px;

  .app-setting-item {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0;
  }

  .divider {
    width: 10px;
    height: 1px;
    background-color: darken($color: #fff, $amount: 30%);
  }

  .icon {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>

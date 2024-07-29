<script setup lang="ts">
import LoginFrom from './components/LoginForm/LoginForm.vue';
import Copyright from '@/layouts/components/Copyright/index.vue';

defineOptions({
  name: 'Login',
});

const title = ref(import.meta.env.VITE_APP_TITLE);

const designDescription = [
  {
    title: '快速',
    description: '快速搭建技术中台系统',
  },
  {
    title: '灵活',
    description: '灵活配置系统功能',
  },
  {
    title: '便捷',
    description: '高效提升系统开发效率',
  },
];
</script>

<template>
  <div class="warp">
    <div class="warp-blank">
      <div
        relative
        top="7vh"
        left="5vw"
        scale="100 sm:100 smd:100 md:100  xl:110 2xl:120"
        transform-origin="top-left"
        transition-all
        hidden
        smd:block
      >
        <div class="logo-group">
          <PubSvgIcon
            name="logo"
            color="transparent"
            mr="10px"
            :size="32"
          />
          <span text="black dark:[#C9D6EF]">{{ title }}</span>
        </div>
        <div class="title-group">
          <span text="black dark:[#C9D6EF]">一体化技术架构 一站式技术支撑</span>
          <div flex="~ row" mt="30px">
            <div
              v-for="(item, index) in designDescription"
              :key="index"
              w-84px
              h-36px
              bg="#2F6BFF"
              rounded-20px
              text="20px #F7F7F7 dark:[#fff]"
              font-normal
              flex="~ center"
              mr="15px"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      h-full
      bg="[rgba(255,255,255,0.1)] smd:[rgba(255,255,255,1)] dark:[#0F1E3B]"
      backdrop-blur-sm
      w="full smd:1/2 xl:800px 2xl:900px"
      transition-all
      flex="~ col"
      justify-between
      pb="40px"
      relative
    >
      <div
        block
        smd:hidden
        flex="~ row center"
        w-full
        h-200px
        absolute
        disable="none"
      >
        <PubSvgIcon
          name="logo"
          color="transparent"
          :size="42"
          mr-15px
        />
        <span text="33px" font="bold">{{ title }}</span>
      </div>
      <div
        w-full
        flex="~"
        justify-center
        pt="20vh"
      >
        <LoginFrom />
      </div>
      <Copyright />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warp {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("@/assets/images/login-bg.webp") no-repeat;
  background-size: cover;
  .warp-blank {
    flex: auto;
    flex-basis: 0;
    overflow: hidden;
  }

  .logo-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 33px;
    margin-bottom: 35px;
    font-size: 24px;
    font-weight: 400;
    color: #151e26;
  }

  .title-group {
    height: 52px;
    font-size: 38px;
    font-weight: 800;
    color: #072347;
    letter-spacing: 1.5px;
  }
}

@media (width < 1024px) {
  .warp {
    background: url("@/assets/images/login-small.png") no-repeat left;
    background-size: cover;
  }
}

[data-theme="dark"] {
  .warp {
    background: url("@/assets/images/login-bg_dark.webp") no-repeat;
    background-size: cover;
  }
  @media (width < 1024px) {
    .warp {
      background: url("@/assets/images/login-small_dark.webp") no-repeat left;
      background-size: cover;
    }
  }
}
</style>

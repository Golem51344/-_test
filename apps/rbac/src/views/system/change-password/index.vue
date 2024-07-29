<script setup lang="ts">
import ChangePasswordForm from '@/views/system/change-password/components/ChangePasswordForm/index.vue';

defineOptions({
  name: 'ChangePassword',
});

const title = ref(import.meta.env.VITE_APP_TITLE);
const ChangePassWordForm = ref<InstanceType<typeof ChangePasswordForm>>();

const newPassWord = computed({
  get() {
    return ChangePassWordForm.value?.formState.newPassword;
  },
  set() {},
});

const route = useRoute();
const token = route.params.changePassWordToken;
const isValidate = ref(false);
</script>

<template>
  <div class="password-bg">
    <header
      flex="~ none"
      items-center
      w-full
      h-30px
    >
      <PubSvgIcon
        name="logo"
        color="transparent"
        mr="10px"
        :size="28"
      />
      <span text="22px" font="bold">
        {{ title }}
      </span>
    </header>
    <main
      flex="~ auto center"
      w-full
      h-0
    >
      <div
        h-full
        flex="~"
        justify-between
        items-center
      >
        <div w-650px mr-20px>
          <PassStrengthValidator v-model="newPassWord" v-model:validate="isValidate" />
        </div>
        <div class="change-password-form">
          <div flex="~ col center" mb-40px>
            <div
              w-88px
              h-88px
              flex="~ center"
              rounded="50%"
              mb-15px
            >
              <PubSvgIcon
                name="mima"
                color="transparent"
                :size="88"
              />
            </div>
            <span text="18px" font="bold">
              更改密码
            </span>
          </div>
          <ChangePasswordForm ref="ChangePassWordForm" v-model:validate="isValidate" :token="token" />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.password-bg {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  background: url("@/assets/images/login-small.png") no-repeat 50%;
  background-size: cover;
  .change-password-form {
    display: flex;
    flex-direction: column;
    width: 560px;
    min-height: 680px;
    padding: 64px 80px 34px;
    overflow: hidden;
    background: linear-gradient(180deg, hsl(0deg 0% 100% / 90%), hsl(0deg 0% 100% / 75%));
    backdrop-filter: blur(7.5px);
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 0 20px 50px rgb(29 42 165 / 5%);
  }
}
[data-theme="dark"] {
  .password-bg {
    background: url("@/assets/images/login-small_dark.webp") no-repeat 50%;
    background-size: cover;
  }
  .change-password-form {
    background: #0f1e3b;
    border-color: #0f1e3b;
  }
}
</style>

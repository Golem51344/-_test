<script setup lang="ts">
import ChangePasswordForm from '@/views/system/change-password/components/ChangePasswordForm/index.vue';

defineOptions({
  name: 'ChangePasswordPageView',
});

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
  <div
    flex="~"
    w-full
    h-full
  >
    <main
      flex="~ auto center"
      w-full
      h-full
      pt-10px
    >
      <div
        w-full
        h-full
        flex="~"
        justify-between
        bg="#fff"
        px-32px
        py-20px
      >
        <div w-420px ml-60px mt-70px>
          <div flex="~ col center" mb-40px>
            <div
              w-88px
              h-88px
              flex="~ center"
              bg="#D8E5FF"
              rounded="50%"
              mb-15px
            >
              <PubSvgIcon
                name="logo"
                color="transparent"
                mr="10px"
                :size="28"
              />
            </div>
            <span text="18px" font="bold">
              更改密码
            </span>
          </div>
          <ChangePasswordForm ref="ChangePassWordForm" v-model:validate="isValidate" :token="token" />
        </div>
        <div w-644px py-15px bg="red">
          <PassStrengthValidator v-model="newPassWord" v-model:validate="isValidate" />
        </div>
      </div>
    </main>
  </div>
</template>

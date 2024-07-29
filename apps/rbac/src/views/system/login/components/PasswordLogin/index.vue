<script setup lang="tsx">
import type { UnwrapRef } from 'vue';
import { onKeyStroke } from '@vueuse/core';

import type { FormInstance, Rule } from 'ant-design-vue/es/form';
import { Modal, message } from 'ant-design-vue';
import { sleep } from 'radash';
import { useCaptchas, useFocusElement } from '@/views/system/login/composables';
import useUserStore from '@/store/modules/user';
import { isHttpError } from '@/utils/httpError';
import { RESPONSE_CODE } from '@/api/enum/code';
import Useragreement from '@/views/system/login/components/Useragreement/index.vue';

interface FormState {
  account: string
  password: string
  captchas: string
  captchaHash: string
  checked: boolean
}
defineOptions({
  name: 'PasswordLogin',
});

const userStore = useUserStore();
const { send, captcha, captchaHash } = useCaptchas();
const router = useRouter();
const route = useRoute();
const redirect = ref(route.query.redirect?.toString() ?? '/');
const { focusElementDataId } = useFocusElement();

const loginForm = ref<FormInstance | null>(null);
const formState: UnwrapRef<FormState> = reactive({
  account: '',
  password: '',
  captchas: '',
  checked: true,
  captchaHash,
});

const rules: Record<string, Rule[]> = {
  account: [{ required: true, whitespace: true, message: '请输入账号' }],
  password: [{ required: true, whitespace: true, message: '请输入密码' }],
  captchas: [{ required: true, whitespace: true, message: '请输入验证码' }],
};
const subLoading = ref(false);

onKeyStroke('Enter', (e) => {
  e.preventDefault();
  if (subLoading.value) {
    return;
  }
  onSubmit();
});

async function onSubmit() {
  if (subLoading.value) {
    return;
  }
  subLoading.value = true;
  try {
    await loginForm.value?.validate();
    await userStore.login(formState);
    message.success('登录成功');
    await sleep(800);
    router.push(redirect.value);
  }
  catch (error) {
    if (isHttpError(error)) {
      const code = error.code;
      switch (code) {
        case RESPONSE_CODE.LOGINNAME_PASSWORD_WRONG:
        case RESPONSE_CODE.CODE_OVERTIME:
        case RESPONSE_CODE.CODE_WRONG:
          send();
          break;
        case RESPONSE_CODE.CHANGE_INIT_PASSWORD:
        case RESPONSE_CODE.PASSWORD_EXPIRED:
          createChangePasswordModal(error.msg, error?.data?.accessToken);
          break;
        default:
          break;
      }
    }
  }
  finally {
    subLoading.value = false;
  }
}

function createChangePasswordModal(msg: string, token: string) {
  Modal.confirm({
    title: '提示',
    content() {
      return (
        <div>
          {msg}
        </div>
      );
    },
    okText: '修改密码',
    cancelText: '暂不登录',
    onOk() {
      router.push({
        name: 'changePassword',
        params: {
          changePassWordToken: token,
        },
      });
    },
  });
}
</script>

<template>
  <div class="login-form">
    <AForm ref="loginForm" :model="formState" :rules="rules">
      <a-form-item name="account">
        <a-input
          v-model:value="formState.account"
          allow-clear
          size="large"
          placeholder="请输入登录账号"
          data-id="account"
        >
          <template #prefix>
            <PubSvgIcon v-if="focusElementDataId === 'account'" name="i-solar-user-bold" color="#1578FF" />
            <PubSvgIcon v-else name="i-solar-user-broken" color="#AFB0B2" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          allow-clear
          size="large"
          placeholder="请输入登录密码"
          visibility-toggle
          data-id="password"
        >
          <template #prefix>
            <PubSvgIcon v-if="focusElementDataId === 'password'" name="i-solar-lock-password-unlocked-bold" color="#1578FF" />
            <PubSvgIcon v-else name="i-solar-lock-password-unlocked-broken" color="#AFB0B2" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="captchas">
        <a-input
          v-model:value="formState.captchas"
          size="large"
          allow-clear
          placeholder="请输入验证码"
          data-id="captchas"
        >
          <template #prefix>
            <PubSvgIcon v-if="focusElementDataId === 'captchas'" name="i-solar-shield-check-bold" color="#1578FF" />
            <PubSvgIcon v-else name="i-solar-shield-check-broken" color="#AFB0B2" />
          </template>
          <template #addonAfter>
            <div
              w-100px
              h-38px
              cursor-pointer
              @click="send"
            >
              <img :src="captcha">
            </div>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <Useragreement v-model:checked="formState.checked" />
      </a-form-item>
      <!-- 登录 -->
      <a-form-item>
        <div w-full h-48px>
          <a-button
            type="primary"
            block
            h-48px
            :disabled="!formState.checked"
            :loading="subLoading"
            @click="onSubmit"
          >
            登录
          </a-button>
        </div>
      </a-form-item>
    </AForm>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  margin-top: 40px;

  :deep(.ant-input-group-addon) {
    padding: 0 !important;
    overflow: hidden;
  }
}
</style>

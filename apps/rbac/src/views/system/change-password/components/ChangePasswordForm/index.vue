<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form';
import type { RouteParamValue } from 'vue-router';
import { message } from 'ant-design-vue';
import { sleep } from 'radash';
import useUserStore from '@/store/modules/user';

defineOptions({
  name: 'ChangePasswordForm',
});

const props = defineProps<{
  token?: RouteParamValue | RouteParamValue[]
}>();

const isValidate = defineModel('validate', { type: Boolean, default: false });

interface FormState {
  password: string
  newPassword: string
  repeatNewPassword: string
}
const formState = reactive<FormState>({
  password: '',
  newPassword: '',
  repeatNewPassword: '',
});

const router = useRouter();
const changePasswordForm = ref<FormInstance>();
const userStore = useUserStore();

async function checkRepeatNewPassword(_rule: Rule, value: string) {
  if (!value) {
    return Promise.reject(new Error('请再次输入新密码'));
  }
  if (value !== formState.newPassword) {
    return Promise.reject(new Error('两次输入的密码不匹配，请确保新密码在两个输入框中完全相同'));
  }
}

async function checkNewPassWord(_rule: Rule, value: string) {
  await nextTick();
  if (!value) {
    return Promise.reject(new Error('请再次输入新密码'));
  }
  if (!isValidate.value) {
    return Promise.reject(new Error('密码安全校验不通过'));
  }
}

const rules: Record<string, Rule[]> = {
  password: [{
    required: true,
    whitespace: true,
    message: '请输入密码',
  }],
  newPassword: [{ validator: checkNewPassWord }],
  repeatNewPassword: [{ validator: checkRepeatNewPassword }],
};

async function submit() {
  try {
    await changePasswordForm.value?.validate();
    await userStore.changeUserPassword({
      oldPassword: formState.password,
      newPassword: formState.newPassword,
      token: props.token,
    });
    message.success('密码修改成功');
    await sleep(800);
    returnPage();
  }
  catch (error) {
  }
}

function returnPage() {
  router.go(-1);
}

defineExpose({
  formState,
});
</script>

<template>
  <div>
    <a-form
      ref="changePasswordForm"
      :model="formState"
      :rules="rules"
    >
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          allow-clear
          size="large"
          placeholder="请输入旧密码"
          visibility-toggle
        />
      </a-form-item>
      <a-form-item name="newPassword">
        <a-input-password
          v-model:value="formState.newPassword"
          allow-clear
          size="large"
          placeholder="请输入新密码"
          visibility-toggle
        />
      </a-form-item>

      <a-form-item name="repeatNewPassword">
        <a-input-password
          v-model:value="formState.repeatNewPassword"
          allow-clear
          size="large"
          placeholder="请再次输入新密码"
          visibility-toggle
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          block
          h-48px
          mb-10px
          @click="submit"
        >
          修改密码
        </a-button>
        <a-button
          block
          h-48px
          @click="returnPage"
        >
          返回
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

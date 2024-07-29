<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';
import type { FormInstance, Rule } from 'ant-design-vue/es/form';
import { useToggle } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { useCountdown } from '.';
import Useragreement from '@/views/system/login/components/Useragreement/index.vue';

defineOptions({
  name: 'LoginWithPhone',
});

interface FormState {
  phone: string
  verify: string
  checked: true
}
const [verifyDisabled, setVerifyDisabled] = useToggle(true);
const phoneForm = ref<FormInstance>();
const { count, start, isStart } = useCountdown();
const regionCode = ref<number>(0);

const formState = reactive<FormState>({
  phone: '',
  verify: '',
  checked: true,
});

const rules: Record<string, Rule[]> = {
  phone: [
    {
      validator: checkPhoneIsCorrect,
      whitespace: true,
      trigger: 'change',
    },
  ],
  verify: [
    {
      required: true,
      whitespace: true,
      message: '请输入验证码',
    },
  ],
};

const regionCodeOptins: SelectProps['options'] = [
  {
    value: 0,
    label: '+86 (中国大陆)',
  },
  {
    value: 1,
    label: '+852 (香港行政区)',
  },
  {
    value: 2,
    label: '+853 (澳门行政区)',
  },
  {
    value: 3,
    label: '+886 (台湾省)',
  },
];

async function checkPhoneIsCorrect(_rule: Rule, value: string) {
  function reject(area: string) {
    setVerifyDisabled(true);
    return Promise.reject(new Error(`请输入正确的${area}手机号`));
  }
  if (!value) {
    setVerifyDisabled(true);
    return Promise.reject(new Error(`请输入手机号`));
  }
  switch (regionCode.value) {
    // 中国大陆
    case 0:
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return reject('中国大陆');
      }
      break;
    // 香港特别行政区
    case 1:
      if (!/^(5|6|9)\d{7}$/.test(value)) {
        return reject('香港特别行政区');
      }
      break;
    // 澳门特别行政区
    case 2:
      if (!/^6\d{7}$/.test(value)) {
        return reject('澳门特别行政区');
      }
      break;
    // 台湾省
    case 3:
      if (!/^9\d{8}$/.test(value)) {
        return reject('台湾省');
      }
      break;
    default:
      break;
  }
  setVerifyDisabled(false);
}

async function areaChange() {
  if (!formState.phone) {
    return;
  }
  phoneForm.value?.validateFields('phone');
}

async function sendVerifyCode() {
  message.success('验证码已发送,请注意查收');
  start();
}

async function submit() {
  try {
    await phoneForm.value?.validate();
  }
  catch (error) {
  }
}
</script>

<template>
  <div class="phone-form" mt-40px>
    <a-form
      ref="phoneForm"
      :model="formState"
      autocomplete="off"
      :rules="rules"
    >
      <a-form-item name="phone">
        <a-input-group compact>
          <a-form-item-rest>
            <a-select
              v-model:value="regionCode"
              size="large"
              style="width: 35%;"
              :options="regionCodeOptins"
              @change="areaChange"
            />
          </a-form-item-rest>
          <a-input
            v-model:value="formState.phone"
            allow-clear
            size="large"
            placeholder="请输入手机号"
            style="width: 65%;"
          />
        </a-input-group>
      </a-form-item>

      <a-form-item name="verify">
        <a-input
          v-model:value="formState.verify"
          allow-clear
          size="large"
          placeholder="请输入验证码"
        >
          <template #suffix>
            <a-button
              size="small"
              type="link"
              :disabled="verifyDisabled"
            >
              <span v-if="!isStart" @click="sendVerifyCode">获取短信验证码</span>
              <span v-else text="#8A8E92">{{ count }}秒后重新获取</span>
            </a-button>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <Useragreement v-model:checked="formState.checked" />
      </a-form-item>
      <a-form-item>
        <a-button
          block
          h-48px
          type="primary"
          :disabled="!formState.checked"
          @click="submit"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

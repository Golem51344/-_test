<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { reactive, ref } from 'vue';
import Message from 'vue-m-message';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  blackWhiteListMode: string
  // 是否开启密码错误后锁定账号: true开 false关
  // 选择开的时候出现allowFailCount 和 lockMinutes 2个选项
  lockEnable: boolean
  allowFailCounts: number
  lockMinutes: number
  defaultPassword: string
  expireDays: number
  // 是否开启强制修改初始化密码: true开 false关
  forceChangeInitPwd: boolean
}

const rules: Record<string, Rule[]> = {
  blackWhiteListMode: [
    { required: true, message: '请选择黑白名单模式', trigger: 'change' },
  ],
  lockEnable: [
    { required: true, message: '请选择密码错误后是否锁定账号', trigger: 'change' },
  ],
  lockMinutes: [{ required: true, validator: validateLockMinutes, trigger: 'change' }],
  allowFailCounts: [{ required: true, validator: validateAllowFailCount, trigger: 'change' }],
  defaultPassword: [{ required: true, validator: validatePassword, trigger: 'change' }],
  expireDays: [{ required: true, validator: validateExpireDays, trigger: 'change' }],
  forceChangeInitPwd: [
    { required: true, message: '请选择是否开启强制修改初始化密码', trigger: 'change' },
  ],
};

const formRef = ref();
const labelCol = { style: { width: '240px' } };
const wrapperCol = { span: 9 };
const modeOptions = [
  {
    label: '无模式',
    value: '0',
  },
  {
    label: '黑名单模式',
    value: '1',
  },
  {
    label: '白名单模式',
    value: '2',
  },
];

const formState: UnwrapRef<FormState> = reactive({
  // 黑白名单模式:'0'.无模式, '1':黑名单模式, '2':白名单模式
  blackWhiteListMode: '0',
  // 密码错误后是否锁定账号, true开 false关
  lockEnable: true,
  // 允许密码连续错误的次数
  allowFailCounts: 5,
  // 锁定多少分钟
  lockMinutes: 10,
  // 默认密码
  defaultPassword: '',
  // 密码过期天数
  expireDays: 30,
  // 是否强制初始化密码,即登录后必须修改默认密码. 1开 0关,
  forceChangeInitPwd: true,
});

const isDefaultPasswordValid = ref(false);

onMounted(getSystemSafeConfig);

async function validateLockMinutes(_rule: Rule, value: string) {
  if (formState.lockEnable && !value) {
    return Promise.reject(new Error('请输入锁定分钟数'));
  }
  if (Number.isNaN(+value) || +value < 1 || +value > 360) {
    return Promise.reject(new Error('锁定分钟数应为[1~360]之间的正整数'));
  }
  return Promise.resolve();
};

async function validateAllowFailCount(_rule: Rule, value: string) {
  if (formState.lockEnable && !value) {
    return Promise.reject(new Error('请输入允许密码连续错误次数'));
  }
  if (Number.isNaN(+value) || +value < 1 || +value > 20) {
    return Promise.reject(new Error('允许密码连续错误次数应为[1~20]之间的正整数'));
  }
  return Promise.resolve();
};

async function validateExpireDays(_rule: Rule, value: string) {
  if (formState.lockEnable && !value) {
    return Promise.reject(new Error('请输入密码过期天数'));
  }
  if (Number.isNaN(+value) || +value < 30 || +value > 360) {
    return Promise.reject(new Error('密码过期天数应为[30~360]之间的正整数'));
  }
  return Promise.resolve();
};

async function validatePassword(_rule: Rule, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入默认密码'));
  }
  if (!isDefaultPasswordValid.value) {
    return Promise.reject(new Error('密码规则校验不通过'));
  }
  return Promise.resolve();
};

function getSystemSafeConfig() {
  getSysconfigGetSysSecurityConfig().then((res) => {
    if (res && res.data && res.data.content && res.success) {
      Object.assign(formState, JSON.parse(res.data.content));
    }
  });
}

const [loading, setLoading] = useToggle(false);
async function onSubmit() {
  if (loading.value) {
    return;
  }
  setLoading(true);
  try {
    await formRef.value?.validate();
    const {
      blackWhiteListMode,
      lockEnable,
      allowFailCounts,
      lockMinutes,
      defaultPassword,
      expireDays,
      forceChangeInitPwd,
    } = formState;

    const params = {
      blackWhiteListMode,
      lockEnable,
      defaultPassword,
      expireDays,
      forceChangeInitPwd,
    };

    if (lockEnable) {
      Object.assign(params, {
        allowFailCounts,
        lockMinutes,
      });
    }

    await postSysconfigEditSysSecurityConfig({ content: JSON.stringify(params) });
    setLoading(false);
    Message.success('配置更改成功');
  }
  catch (error) {
    setLoading(false);
  }
}
</script>

<template>
  <div
    w-full
    h-full
    pt-10px
    px-10px
    overflow-auto
  >
    <div h-full min-w-1130px>
      <div
        class="pt-20px flex flex-col box-border bg-white dark:bg-[#141414] text-[#4e5969] dark:text-[#C9CDD4]"
      >
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          class="safe-rule-form"
        >
          <a-form-item label="黑白名单模式" name="blackWhiteListMode">
            <a-select v-model:value="formState.blackWhiteListMode" placeholder="请选择" :options="modeOptions" />
          </a-form-item>
          <a-form-item label="是否开启密码错误后锁定账号" name="lockEnable">
            <a-switch v-model:checked="formState.lockEnable" />
          </a-form-item>
          <!-- 应该用formState.lockEnable 但会导致formRef.value.validate不存在 -->
          <template v-if="formState.lockEnable">
            <!-- v-if="formState.lockEnable" key="allowFailCounts" 或 v-show -->
            <a-form-item label="允许密码连续错误次数" name="allowFailCounts">
              <a-input v-model:value="formState.allowFailCounts" mr-12px />次
            </a-form-item>
            <!-- v-if="formState.lockEnable" key="lockMinutes" 或 v-show -->
            <a-form-item label="锁定多少分钟" name="lockMinutes">
              <span><a-input v-model:value="formState.lockMinutes" mr-12px />分钟</span>
            </a-form-item>
          </template>
          <a-form-item label="默认密码设置" name="defaultPassword">
            <a-input v-model:value="formState.defaultPassword" />
          </a-form-item>
          <a-form-item label="密码过期天数" name="expireDays">
            <a-input v-model:value="formState.expireDays" mr-12px />天
          </a-form-item>
          <a-form-item label="是否开启强制修改初始化密码" name="forceChangeInitPwd">
            <a-switch v-model:checked="formState.forceChangeInitPwd" />
          </a-form-item>
          <div v-auth="'change_safe_setting'" class="p-16px text-right b-t-1 b-t-style-solid b-t-color-[#e5e6eb] dark:b-t-color-[#424242]">
            <a-button type="primary" @click="onSubmit">
              更改配置
            </a-button>
          </div>
        </a-form>
      </div>

      <div class="mt-10px bg-white dark:bg-[#141414] text-[#4e5969] dark:text-[#C9CDD4]">
        <PassStrengthValidator v-model="formState.defaultPassword" v-model:validate="isDefaultPasswordValid" vertical />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.safe-rule-form {
  .ant-input,
  .ant-select {
    width: 90%;
  }
}
</style>

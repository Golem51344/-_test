<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { cloneDeep, isEmpty } from 'lodash-es';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';
import { ACTION } from '../enum';
import type { AddForm, CurrentOrg, Data, EditForm, Form } from '../interface';
import OrgAndPosition from './OrgAndPosition.vue';

defineOptions({
  name: 'UserEdit',
});

const props = defineProps<{ currentOrg?: CurrentOrg }>();
const emit = defineEmits(['submit']);

const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<Form>>({});
const state = reactive<{
  title: string
  record: Data
  initData: Partial<Form>
}>({
  title: '',
  record: {},
  initData: {
    sex: '0',
    enable: true,
    userOrgList: [{ main: true, positionList: [] }],
  },
});

function loginNameValidator(_: unknown, value: string) {
  const reg = /^[A-Z!@#$%^&*0-9]+$/i;
  if (!value || reg.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('只能包含字母、数字和特殊字符!@#$%^&*'));
}

function phoneValidator(_: unknown, value: string) {
  const reg = /^1(3\d|4[014-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  if (reg.test(value) || isEmpty(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入正确的手机号'));
}

function emailValidator(_: unknown, value: string) {
  const reg = /^([a-z0-9])(\w|-)+@[a-z0-9]+\.([a-z]{2,4})$/i;
  if (reg.test(value) || isEmpty(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入正确的邮箱地址'));
}

function idCardValidator(_: unknown, value: string) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i;
  if (reg.test(value) || isEmpty(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入正确的身份证号码'));
}

const rules: Record<string, Rule[]> = {
  loginName: [
    { required: true, message: '请输入登录账号', trigger: ['blur', 'change'] },
    { min: 4, max: 64, message: '登录账号需要在4位到64位之间', trigger: 'change' },
    { validator: loginNameValidator, trigger: 'change' },
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 128, message: '真实姓名需要在2位到128位之间', trigger: 'change' },
  ],
  userOrgList: [
    { type: 'array', required: true, message: '请选择所属组织' },
  ],
  mobile: [
    { validator: phoneValidator, trigger: 'change' },
  ],
  email: [
    { validator: emailValidator, trigger: 'change' },
    { max: 32, message: '邮箱不能超过32位', trigger: 'change' },
  ],
  idCard: [
    { validator: idCardValidator, trigger: 'change' },
  ],
};

async function onOpen(key: ACTION, record?: Form) {
  state.title = key;
  form.value = cloneDeep(state.initData);
  form.value.userOrgList![0].orgId = props.currentOrg?.orgId;
  form.value.userOrgList![0].orgName = props.currentOrg?.orgName;
  setOpen(true);

  if (key === ACTION.EDIT) {
    const res = await getRbacUserInfo({ id: record?.id as string });
    if (res.success) {
      const { userOrgList = [], ...rest } = res?.data ?? {};
      form.value = {
        ...rest,
        userOrgList: userOrgList?.map((item) => {
          return {
            ...item,
            roleList: item.roles?.map(role => ({ value: role.roleId!, label: role.roleName! })) ?? [],
            positionList: item.posts?.map(post => ({ value: post.postId!, label: post.postName! })) ?? [],
          };
        }),
      };
    }
  }
}

const sexOptions = [
  { label: '未知', value: '0' },
  { label: '男', value: '1' },
  { label: '女', value: '2' },
];

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  formRef.value?.validate().then(() => {
    const { userOrgList = [], ...rest } = form.value;
    const params = {
      ...rest,
      orgRoles: userOrgList.map((item) => {
        const { orgId, main } = item;
        return {
          orgId,
          main,
        };
      }),
      posts: userOrgList.map((item) => {
        const { orgId, positionList = [] } = item;
        return {
          orgId,
          postIds: positionList.map(post => post.value),
        };
      }),
    };
    const promise = state.title === ACTION.ADD
      ? postRbacUserPubUserAdd(params as AddForm)
      : postRbacUserUserUpdateV2(params as EditForm);
    setLoading(true);
    promise
      .then((res) => {
        if (res?.success) {
          message.success(`${state.title}成功！`);
          setOpen(false);
          emit('submit');
        }
      }).finally(() => setLoading(false));
  });
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="state.title"
    placement="right"
    :width="520"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
    >
      <a-form-item label="登录账号" name="loginName">
        <div v-if="state.title === ACTION.EDIT">
          {{ form.loginName }}
        </div>
        <a-input
          v-else
          v-model:value="form.loginName"
          :maxlength="64"
          placeholder="请输入登录账号"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="真实姓名" name="realName">
        <a-input
          v-model:value="form.realName"
          :maxlength="128"
          placeholder="请输入真实姓名"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <a-input
          v-model:value="form.mobile"
          :maxlength="14"
          placeholder="请输入手机号"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-radio-group v-model:value="form.sex" :options="sexOptions" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input
          v-model:value="form.email"
          :maxlength="32"
          placeholder="请输入邮箱"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="身份证" name="idCard">
        <a-input
          v-model:value="form.idCard"
          :maxlength="18"
          placeholder="请输入身份证"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="是否启用" name="enable">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>
      <a-form-item label="地址" name="address">
        <a-textarea
          v-model:value="form.address"
          :maxlength="200"
          :auto-size="{ minRows: 2 }"
          placeholder="请输入地址"
          allow-clear
          show-count
        />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :maxlength="255"
          :auto-size="{ minRows: 2 }"
          placeholder="请输入描述"
          allow-clear
          show-count
        />
      </a-form-item>
      <a-form-item label="所属组织" name="userOrgList">
        <OrgAndPosition v-model="form.userOrgList" />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-space>
        <a-button @click="setOpen(false)">
          取消
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit()">
          提交
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

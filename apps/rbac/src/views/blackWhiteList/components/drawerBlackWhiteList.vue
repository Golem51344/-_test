<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

defineOptions({
  name: 'DrawerBlackWhiteList',
});

const props = defineProps<{
  type: number
}>();

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  ip: [{ required: true, validator: checkIP, trigger: ['blur', 'change'] }],
  enable: [{ required: true, message: '请选择是否开启', trigger: ['blur', 'change'] }],
};
const dialogTitle = ref('');
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const defaultFormData = {
  enable: true,
};
const form = ref<Partial<API.PubBlackWhiteList>>({});
const isEdit = ref(false);

function checkIP(rule: any, value: any, callback: any) {
  const ipReg = /^(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})$/;
  if (!value) {
    callback(new Error('请输入ip地址'));
  }
  else if (!ipReg.test(value)) {
    callback(new Error('ip地址格式不正确'));
  }
  else {
    callback();
  }
}

async function onOpen(title: string, edit: boolean, record?: API.PubBlackWhiteList) {
  dialogTitle.value = title;

  setOpen(true);

  if (edit) {
    isEdit.value = true;
    form.value = { ...record ?? {} };
  }
  else {
    isEdit.value = false;
    form.value = { ...defaultFormData };
  }
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);
    const submitFn = isEdit.value ? postBlackWhiteListUpdateBlackWhiteList : postBlackWhiteListAddBlackWhiteList;
    const params: any = {
      ...form.value,
      type: props.type,
    };

    submitFn(params)
      .then((res: API.ResponseDataBoolean) => {
        if (res.success) {
          message.success(`${dialogTitle.value}成功！`);
          setOpen(false);
          emit('submit');
        }
      }).finally(() => setLoading(false));
  });
}

function close() {
  setOpen(false);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${dialogTitle}信息`"
    placement="right"
    :width="600"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
    @close="close"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
    >
      <a-form-item label="来源ip地址" name="ip">
        <a-input v-model:value="form.ip" :maxlength="20" />
      </a-form-item>
      <a-form-item label="状态" name="enable">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :rows="3"
          show-count
          :maxlength="200"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button @click="close">
          取消
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit()">
          提交
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

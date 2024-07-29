<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION } from '../enum';

defineOptions({
  name: 'DrawerDictionary',
});

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入类型编码', trigger: 'blur' }],
};
const state = reactive({
  title: '',
});
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<API.DictTypeSaveDto>>({});

async function onOpen(key: ACTION, record?: API.DictTypeVo) {
  setOpen(true);
  state.title = key;
  if (key === ACTION.EDIT) {
    form.value = { ...record ?? {} };
  }
  else {
    form.value = {};
  }
}
const [loading, setLoading] = useToggle(false);

function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: any = { ...form.value };
    postDictTypeSave(params)
      .then((res: API.ResponseDataString) => {
        if (res.success) {
          message.success(`${state.title}成功！`);
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
    :title="`${state.title}类型`"
    placement="right"
    :width="520"
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
      <a-form-item label="类型名称" name="name">
        <a-input v-model:value="form.name" :maxlength="30" />
      </a-form-item>
      <a-form-item label="类型编码" name="code">
        <a-input v-model:value="form.code" :maxlength="30" :disabled="state.title === ACTION.EDIT" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :rows="3"
          show-count
          :maxlength="200"
        />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number v-model:value="form.sort" />
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

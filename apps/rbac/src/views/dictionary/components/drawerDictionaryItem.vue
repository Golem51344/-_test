<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION } from './../enum';

defineOptions({
  name: 'DrawerDictionaryItem',
});

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  dictLabel: [{ required: true, message: '请输入字典项名称', trigger: 'blur' }],
  dictValue: [{ required: true, message: '请输入字典项值', trigger: 'blur' }],
};
const state = reactive({
  title: '',
  code: '',
});
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<API.DictItemSaveDto>>({});

async function onOpen(key: ACTION, code: string, record?: API.DictItemVo) {
  setOpen(true);
  state.title = key;
  state.code = code;
  if (key === ACTION.EDIT) {
    form.value = record ?? {};
  }
  else {
    form.value = {};
    form.value.enable = true;
    form.value.code = code;
  }
}
const [loading, setLoading] = useToggle(false);

function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: any = { ...form.value };
    postDictItemSave(params)
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
    :title="`${state.title}字典数据`"
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
      :label-col="{ span: 5 }"
    >
      <a-form-item label="字典项名称" name="dictLabel">
        <a-input v-model:value="form.dictLabel" :maxlength="100" />
      </a-form-item>
      <a-form-item label="字典项值" name="dictValue">
        <a-input v-model:value="form.dictValue" :maxlength="100" />
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
      <a-form-item label="是否启动" name="enable">
        <a-switch v-model:checked="form.enable" />
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

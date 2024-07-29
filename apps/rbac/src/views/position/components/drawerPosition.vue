<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION } from '../enum';

defineOptions({
  name: 'DrawerPosition',
});

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入岗位名称', trigger: 'blur' },
    { max: 64, message: '长度不能超过64位', trigger: 'change' }],
  code: [{ required: true, message: '请输入岗位编码', trigger: 'blur' },
    { max: 32, message: '长度不能超过32位', trigger: 'change' }],
  type: [{ required: true, message: '请选择岗位类别', trigger: ['blur', 'change'] }],
};
const state = reactive({
  title: '',
  type: '',
});
const [open, setOpen] = useToggle(false);
const typeOptions: Ref<{ label?: string, value?: string }[] | undefined> = ref([]);

getDictItemList({ dictCode: 'positionType' }).then((res: API.ResponseDataListDictItemVo) => {
  typeOptions.value = res.data?.map((e) => {
    return {
      label: e.dictLabel,
      value: e.dictValue,
    };
  });
});

const formRef = ref<FormExpose>();
const form = ref<API.PubPostDto>({ enable: true });
async function onOpen(key: ACTION, record?: API.PubPost) {
  setOpen(true);
  state.title = key;
  if (key === ACTION.EDIT) {
    const res = await getRbacPostDetailById({ id: record?.id as string });
    if (res.success) {
      form.value = res.data ?? {};
    }
  }
  else {
    form.value = { enable: true };
  }
}

const [loading, setLoading] = useToggle(false);

function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: API.PubPostDto = { ...form.value };
    postRbacPostSave(params)
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
  form.value = { enable: true };
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${state.title}岗位`"
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
      :label-wrap="true"
    >
      <a-form-item label="岗位名称" name="name">
        <a-input v-model:value="form.name" :maxlength="64" />
      </a-form-item>
      <a-form-item label="岗位编码" name="code">
        <a-input v-model:value="form.code" :disabled="state.title === ACTION.EDIT" :maxlength="32" />
      </a-form-item>
      <a-form-item label="岗位类别" name="type">
        <a-select v-model:value="form.type" :options="typeOptions" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :rows="3"
          show-count
          :maxlength="120"
        />
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

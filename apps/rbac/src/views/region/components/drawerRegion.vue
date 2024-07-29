<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION } from '../enum';

defineOptions({
  name: 'DrawerRegion',
});

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入区域名称', trigger: 'blur' },
    { max: 128, message: '长度不能超过128位', trigger: 'change' }],
  type: [{ required: true, message: '请选择区域范围', trigger: 'blur' }],
  regionCode: [{ required: true, message: '请输入区域编码', trigger: 'blur' },
    { max: 16, message: '长度不能超过16位', trigger: 'change' }],
  code: [{ required: true, message: '请输入行政区划编码', trigger: 'blur' },
    { max: 16, message: '长度不能超过16位', trigger: 'change' }],
};

const state = reactive({
  title: '',
  type: '',
});
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();

const form = ref<Partial<API.PubRegionAddDto & { parentName: string }>>({ parentId: '' });

const rangeOptions: Ref<{ label?: string, value?: string }[] | undefined> = ref([]);
getDictItemList({ dictCode: 'regionType' }).then((res: API.ResponseDataListDictItemVo) => {
  rangeOptions.value = res.data?.map((e) => {
    return {
      label: e.dictLabel,
      value: e.dictValue,
    };
  });
});

async function onOpen(key: ACTION, record?: API.PubRegion) {
  setOpen(true);
  state.title = key;
  if (key === ACTION.EDIT) {
    const res = await getRegionGetRegionDetailByCode({ code: record?.code as string });
    if (res.success) {
      form.value = res.data ?? {};
    }
  }
  else if (key === ACTION.ADDNEXT) {
    form.value = {
      parentName: record?.name,
      parentId: record?.id,
    };
  }
  else {
    form.value = {
      parentId: '',
    };
  }
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  const request = state.title === ACTION.EDIT ? postRegionUpdateRegion : postRegionAddRegion;
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: any = { ...form.value };
    request(params)
      .then((res: API.ResponseDataBoolean) => {
        if (res.success) {
          message.success(`${state.title}成功！`);
          setOpen(false);
          emit('submit');
        }
      }).finally(() => setLoading(false));
  });
}
function close() {
  form.value = {
    parentId: '',
  };
  setOpen(false);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${state.title}区域`"
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
      :label-col="{ span: 5 }"
      :label-wrap="true"
    >
      <a-form-item v-if="form.parentId !== '' && form.parentId !== '0'" label="上级区域">
        {{ form.parentName }}
      </a-form-item>
      <a-form-item label="区域名称" name="name">
        <a-input v-model:value="form.name" :maxlength="128" />
      </a-form-item>
      <a-form-item label="区域范围" name="type">
        <a-select v-model:value="form.type" :options="rangeOptions" />
      </a-form-item>
      <a-form-item label="区域编码" name="regionCode">
        <a-input v-model:value="form.regionCode" :maxlength="16" />
      </a-form-item>
      <a-form-item label="行政区划编码" name="code">
        <a-input v-model:value="form.code" :disabled="state.title === ACTION.EDIT" :maxlength="16" />
      </a-form-item>
      <a-form-item label="排序">
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

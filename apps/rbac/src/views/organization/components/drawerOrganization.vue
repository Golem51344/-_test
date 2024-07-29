<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION } from '../enum';

defineOptions({
  name: 'OrganizationEdit',
});

const emit = defineEmits(['submit']);

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入组织名称', trigger: 'blur' },
    { max: 128, message: '长度不能超过128位', trigger: 'change' }],
  code: [{ required: true, message: '请输入组织编码', trigger: 'blur' },
    { max: 50, message: '长度不能超过50位', trigger: 'change' }],
  type: [{ required: true, message: '请输入组织类型', trigger: 'blur' }],
  areaCode: [{ max: 16, message: '长度不能超过16位', trigger: 'change' }],
  creditCode: [{ max: 50, message: '长度不能超过50位', trigger: 'change' }],
  contactPerson: [{ max: 50, message: '长度不能超过50位', trigger: 'change' }],
  contactMobile: [{ max: 20, message: '长度不能超过20位', trigger: 'change' }],
};
const state = reactive({
  title: '',
  type: '',
});
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const typeOptions: Ref<{ label?: string, value?: string }[] | undefined> = ref([]);

getDictItemList({ dictCode: 'orgType' }).then((res: API.ResponseDataListDictItemVo) => {
  typeOptions.value = res.data?.map((e) => {
    return {
      label: e.dictLabel,
      value: e.dictValue,
    };
  });
});
const form = ref<Partial<API.PubOrg & { parentName: string } >>({ parentId: '', enable: true });
async function onOpen(key: ACTION, record?: API.PubOrg) {
  setOpen(true);
  state.title = key;
  if (key === ACTION.EDIT) {
    const res = await getRbacOrgInfo({ id: record?.id as string });
    if (res.success) {
      form.value = res.data ?? {};
    }
  }
  else if (key === ACTION.ADDNEXT) {
    form.value = {
      parentName: record?.name,
      parentId: record?.id,
      enable: true,
      district: false,
    };
  }
  else {
    form.value = {
      parentId: '',
      enable: true,
      district: false,
    };
  }
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  const request = state.title === ACTION.EDIT ? postRbacOrgUpdateOrg : postRbacOrgAddOrg;
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: any = { ...form.value };
    request(params)
      .then((res: API.ResponseDataPubOrg) => {
        if (res.success) {
          message.success(`${state.title}成功！`);
          setOpen(false);
          emit('submit', { ...form.value });
        }
      }).finally(() => setLoading(false));
  });
}
function close() {
  form.value = {
    enable: false,
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
    :title="`${state.title}组织`"
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
      :label-col="{ span: 6 }"
      :label-wrap="true"
    >
      <a-form-item v-if="form.parentId !== '' && form.parentId !== '0'" label="所属上级">
        {{ form.parentName }}
      </a-form-item>
      <a-form-item label="组织名称" name="name">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="组织编码" name="code">
        <a-input v-model:value="form.code" />
      </a-form-item>
      <a-form-item label="组织类型" name="type">
        <a-select v-model:value="form.type" :options="typeOptions" />
      </a-form-item>
      <a-form-item label="是否行政区划">
        <a-switch v-model:checked="form.district" />
      </a-form-item>
      <a-form-item v-if="form.district" label="行政区划编码" name="areaCode">
        <a-input v-model:value="form.areaCode" />
      </a-form-item>
      <a-form-item label="是否启用">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number v-model:value="form.sort" />
      </a-form-item>
      <a-form-item label="统一社会信用代码" name="creditCode">
        <a-input v-model:value="form.creditCode" />
      </a-form-item>
      <a-form-item label="联系人" name="contactPerson">
        <a-input v-model:value="form.contactPerson" />
      </a-form-item>
      <a-form-item label="联系方式" name="contactMobile">
        <a-input v-model:value="form.contactMobile" />
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

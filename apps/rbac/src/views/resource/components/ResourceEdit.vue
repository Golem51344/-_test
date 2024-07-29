<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';
import { ACTION, RESOURCE_TYPE, resourceOptions } from '../enum';
import type { AddForm, EditForm, Form, TreeNode } from '../interface';
import { DATA_PERMISSION_TYPE, dataPermissionOptions } from '@/views/data-permission/enum';

defineOptions({
  name: 'ResourceEdit',
});

const props = defineProps<{ dataSource: TreeNode[] }>();
const emit = defineEmits(['submit']);

const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<Form>>({});
const state = reactive<{
  title: string
  record: TreeNode
  initData: Partial<Form>
}>({
  title: '',
  record: {},
  initData: {
    type: RESOURCE_TYPE.APP,
    sort: 0,
    enable: true,
    enableDataPermission: false,
    dataPermissionType: DATA_PERMISSION_TYPE.ALL,
  },
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
  code: [{ required: true, message: '请输入资源编码', trigger: 'blur' }],
  sort: [{ type: 'number', required: true, message: '请输入排序', trigger: 'blur' }],
  enable: [{ type: 'boolean', required: true, message: '请选择是否启用', trigger: 'change' }],
};

const parentNode = computed(() => {
  return recursiveTreeFind(props.dataSource, node => node.id === form.value.parentId);
});
function recursiveTreeFind<T extends { children?: T[] }>(tree: T[], fn: (node: T) => boolean) {
  const list = [...tree];
  for (const node of list) {
    if (fn(node)) {
      return node;
    }
    node.children && list.push(...node.children);
  }
  return null;
}

const resourceComputedOptions = computed(() => {
  switch (parentNode.value?.type) {
    case RESOURCE_TYPE.APP:
    case RESOURCE_TYPE.INDEX:
      return resourceOptions.filter(node => node.value !== RESOURCE_TYPE.APP);

    case RESOURCE_TYPE.MENU:
    case RESOURCE_TYPE.NON_MENU:
      return resourceOptions.filter(node => (node.value === RESOURCE_TYPE.BUTTON || node.value === RESOURCE_TYPE.NON_MENU));

    case RESOURCE_TYPE.BUTTON:
      return [];

    default:
      return resourceOptions.filter(node => node.value === RESOURCE_TYPE.APP);
  }
});

const dataPermissionVisible = computed(() => {
  return form.value.type === RESOURCE_TYPE.BUTTON || form.value.type === RESOURCE_TYPE.MENU || form.value.type === RESOURCE_TYPE.NON_MENU;
});

async function onOpen(key: ACTION, record?: Form) {
  state.title = key;
  form.value = cloneDeep(state.initData);
  setOpen(true);

  if (key === ACTION.ADD_CHILD) {
    form.value.parentId = record?.id as string;
    form.value.type = resourceComputedOptions.value[0].value;
  }

  if (key === ACTION.EDIT) {
    const res = await getRbacResourceInfo({ id: record?.id as string });
    if (res.success) {
      form.value = res.data ?? {};
    }
  }
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  formRef.value?.validate().then(() => {
    const params = {
      ...form.value,
    };

    // app, 目录等不参与数据权限筛选
    if (!dataPermissionVisible.value) {
      params.enableDataPermission = false;
    }

    const promise
      = state.title === ACTION.EDIT
        ? postRbacResourceResourceUpdate(params as EditForm)
        : postRbacResourceAddResource({ parentId: '', ...params } as AddForm);
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
      :label-col="{ span: 6 }"
    >
      <a-form-item v-if="parentNode?.name" name="parentId">
        <template #label>
          <DatabaseOutlined class="mr-1" />
          父资源
        </template>
        {{ parentNode?.name }}
      </a-form-item>
      <a-form-item label="资源名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入资源名称" :maxlength="128" />
      </a-form-item>
      <a-form-item label="资源类型" name="type">
        <a-radio-group
          v-model:value="form.type"
          :options="resourceComputedOptions"
          option-type="button"
          button-style="solid"
        />
      </a-form-item>
      <a-form-item label="资源编码" name="code">
        <a-input v-model:value="form.code" placeholder="请输入资源编码" :maxlength="50" />
      </a-form-item>
      <a-form-item label="显示顺序" name="sort">
        <a-input-number v-model:value="form.sort" :max="999" />
      </a-form-item>
      <a-form-item label="是否启用" name="enable">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>
      <a-form-item label="权限标识" name="permissionCode">
        <a-input v-model:value="form.permissionCode" placeholder="请输入权限标识" :maxlength="128" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          placeholder="请输入描述"
          :maxlength="255"
          :auto-size="{ minRows: 2 }"
          show-count
        />
      </a-form-item>
      <a-form-item v-if="dataPermissionVisible" label="启用数据权限" name="enableDataPermission">
        <a-switch v-model:checked="form.enableDataPermission" />
      </a-form-item>
      <a-form-item v-if="dataPermissionVisible && form.enableDataPermission" label="数据权限规则" name="dataPermissionType">
        <a-select v-model:value="form.dataPermissionType" :options="dataPermissionOptions" />
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

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION, kjOptions } from '../enum';
import useAppAndResource from '@/components/ResourceSelector/hooks/useAppAndResource';
import type { SelectedResourceInfo } from '@/components/ResourceSelector/hooks/useAppAndResource';
import ResourceSelector from '@/components/ResourceSelector/index.vue';

defineOptions({
  name: 'DrawerRole',
});

const emit = defineEmits(['submit']);

const {
  appList,
  resourceModelRef,
  selectedResources,
  getAppList,
  updateTreeDataAndResourceMap,
  setSelectedResources,
  updateSelectedResources,
  clearSelectedResources,
  openResourceModel,
} = useAppAndResource();

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 32, message: '角色名称长度不能少于2位，不能超过32位', trigger: 'change' }],
  code: [{ required: true, message: '请输入编号', trigger: 'blur' },
    { min: 2, max: 32, message: '角色编码长度不能超过32位', trigger: 'change' }],
  viewScope: [{ required: true, message: '请选择可见范围', trigger: 'change' }],
  appId: [{ required: true, message: '请选择所属应用', trigger: ['blur', 'change'] }],
  resourceIds: [{ required: true, validator: resourceValidate, trigger: ['blur', 'change'] }],
};

function resourceValidate(_: unknown, value: string[]) {
  if (value && value.length > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请选择所属资源'));
}

const state = reactive<{ title: string, type: string }>({
  title: '',
  type: '',
});
const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<API.PubRoleAddDto>>({ enable: true });

async function onOpen(key: ACTION, record?: API.PubRoleResourceBo) {
  state.title = key;
  if (key === ACTION.EDIT) {
    const res = await getRbacRoleInfo({ id: record?.id as string });
    if (res.success) {
      form.value = res.data ?? {};

      await updateTreeDataAndResourceMap(form.value.appId as string);
      form.value.resourceIds && updateSelectedResources(form.value.resourceIds);
    }
  }
  else {
    form.value = {
      enable: true,
    };
    clearSelectedResources();
  }
  setOpen(true);
}

// 获取应用列表
getAppList();

const [loading, setLoading] = useToggle(false);

function onSubmit() {
  const request = state.title === ACTION.EDIT ? postRbacRoleRoleUpdate : postRbacRoleAddRole;
  formRef.value?.validate().then(() => {
    setLoading(true);
    const params: any = { ...form.value };
    request(params)
      .then((res) => {
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
    enable: true,
  };
  setOpen(false);
}

function changeApp(value: any) {
  form.value.resourceIds = [];
  selectedResources.value = [];

  if (value) {
    updateTreeDataAndResourceMap(value);
  }
}

function chooseResource() {
  formRef.value?.validateFields(['appId']).then(() => {
    if (form.value.appId && form.value.resourceIds) {
      openResourceModel(form.value.resourceIds);
    }
  }).catch(() => {});
}

function onResourceSelected(data: SelectedResourceInfo[]) {
  form.value.resourceIds = data.map(item => item.id);
  setSelectedResources(data);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${state.title}角色`"
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
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="form.name" :maxlength="32" />
      </a-form-item>

      <a-form-item label="角色编号" name="code">
        <a-input v-model:value="form.code" :disabled="state.title === ACTION.EDIT" :maxlength="32" />
      </a-form-item>
      <a-form-item label="可见范围" name="viewScope">
        <a-select v-model:value="form.viewScope" :options="kjOptions" />
      </a-form-item>

      <a-form-item label="是否启用">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>

      <a-form-item label="角色描述">
        <a-textarea
          v-model:value="form.description"
          :maxlength="250"
          show-count
        />
      </a-form-item>
      <a-form-item label="所属应用" name="appId">
        <a-select
          v-model:value="form.appId"
          :disabled="state.title === ACTION.EDIT"
          :options="appList"
          @change="changeApp"
        />
      </a-form-item>
      <a-form-item label="所属资源" name="resourceIds">
        <a-button type="primary" @click="chooseResource">
          编辑资源
        </a-button>
        <div class="pt-10px">
          <template v-for="item in selectedResources" :key="item">
            <a-tooltip v-if="item.name.length > 20" :title="item.name">
              <span class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
                {{ `${item.name.slice(0, 20)}...` }}
              </span>
            </a-tooltip>
            <span v-else class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
              {{ item.name }}
            </span>
          </template>
        </div>
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
    <ResourceSelector ref="resourceModelRef" @select="onResourceSelected" />
  </a-drawer>
</template>

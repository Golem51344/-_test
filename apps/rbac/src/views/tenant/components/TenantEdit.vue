<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { cloneDeep } from 'lodash-es';
import type { AddForm, EditForm, Form, RecordData } from '../interface';

defineOptions({
  name: 'TenantEdit',
});

const emit = defineEmits(['submit']);

enum ACTION {
  ADD = '新增',
  /** 编辑 */
  EDIT = '修改',
  /** 删除 */
  REMOVE = '删除',
}

const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 32, message: '租户名称长度不能少于2位，不能超过32位', trigger: 'change' },
  ],
  tenantCode: [
    { required: true, message: '请输入编码', trigger: 'blur' },
    { min: 2, max: 64, message: '租户编码长度不能少于2位，不能超过64位', trigger: 'change' },
  ],
  pubUserAdmin: [
    { required: true, message: '请输入租户管理员', trigger: 'blur' },
    { min: 2, max: 32, message: '租户管理员长度不能少于2位，不能超过32位', trigger: 'change' },
  ],
  resourceIds: [
    { type: 'array', required: true, message: '请选择所属资源', trigger: 'change' },
  ],
};

const state = reactive<{
  title: string
  record: RecordData
  initData: Partial<Form>
}>({
  title: '',
  record: {},
  initData: {
    enable: true,
  },
});

const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();
const form = ref<Partial<Form>>({ enable: true });

async function onOpen(key: ACTION, record?: RecordData) {
  state.title = key;
  form.value = cloneDeep(state.initData);

  if (key === ACTION.EDIT) {
    const res = await getRbacTenantPubTenantInfo({ id: record!.id! });
    if (res.success) {
      const { tenantStartTime, tenantEndTime, ...rest } = res?.data ?? {};
      form.value = {
        ...rest,
        tenantTime: [tenantStartTime, tenantEndTime],
      };
    }
  }

  setOpen(true);
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  const request = state.title === ACTION.EDIT ? postRbacTenantPubTenantUpdate : postRbacTenantPubTenantAdd;
  formRef.value?.validate().then(() => {
    const { tenantTime, resourceIds = [], ...rest } = form.value;
    const params: AddForm | EditForm = {
      ...rest,
      tenantStartTime: tenantTime?.[0],
      tenantEndTime: tenantTime?.[1],
      pubTenantResourcelist: resourceIds.map(resourceId => ({ resourceId })),
    };

    setLoading(true);
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

const resourceRef = ref();
const resourceTree = ref<API.PubResourceTreeBo[]>([]);
const selectedResources = computed(() => {
  return form.value.resourceIds?.map((id) => {
    const item = toList(resourceTree.value).find(item => item.id === id);
    return { name: item?.name ?? '' };
  }) ?? [];
});

function onOpenResource() {
  const selectedIds = form.value.resourceIds ?? [];
  const tree = resourceTree.value;
  const treeMap = toList(tree).reduce((map, item) => {
    map[item.id as string] = item.name;
    return map;
  }, {} as any);

  resourceRef.value.open(selectedIds, tree, treeMap);
}

function onSelectResource(selected: Array<{ id: string, name: string }> = []) {
  form.value.resourceIds = selected.map(item => item.id);
}

function getTenantResourceList() {
  getRbacResourceTenantAddResourceTree().then((res) => {
    if (res.success) {
      resourceTree.value = res.data ?? [];
    }
  });
}

function toList<T extends { children?: T[] }>(tree: T[]) {
  const list = cloneDeep(tree);
  for (let i = 0; i < list.length; i++) {
    if (!list[i].children) {
      continue;
    }
    list.splice(i + 1, 0, ...list[i].children as T[]);
    list[i].children = undefined;
  }
  return list;
}

onMounted(() => {
  getTenantResourceList();
});

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${state.title}租户`"
    placement="right"
    :width="600"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
    >
      <a-form-item label="租户名称" name="name">
        <a-input v-model:value="form.name" :maxlength="32" placeholder="请输入租户名称" />
      </a-form-item>

      <a-form-item label="租户编码" name="tenantCode">
        <a-input v-model:value="form.tenantCode" :disabled="state.title === ACTION.EDIT" :maxlength="64" placeholder="请输入租户编码" />
      </a-form-item>

      <a-form-item label="开始至到期时间" name="tenantTime">
        <a-range-picker v-model:value="form.tenantTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
      </a-form-item>

      <a-form-item label="二级域名" name="subDomain">
        <a-input v-model:value="form.subDomain" :maxlength="64" placeholder="请输入二级域名" />
      </a-form-item>

      <a-form-item label="租户管理员" name="pubUserAdmin">
        <a-input v-model:value="form.pubUserAdmin" :disabled="state.title === ACTION.EDIT" :maxlength="32" placeholder="请输入租户管理员" />
      </a-form-item>

      <a-form-item label="是否启用">
        <a-switch v-model:checked="form.enable" />
      </a-form-item>

      <a-form-item label="所属资源" name="resourceIds">
        <a-button type="primary" @click="onOpenResource()">
          选择资源
        </a-button>
        （已选{{ form.resourceIds?.length ?? 0 }}条数据）
        <ResourceSelector ref="resourceRef" @select="onSelectResource" />

        <div class="pt-10px">
          <template v-for="item in selectedResources" :key="item">
            <a-tooltip v-if="item.name?.length > 20" :title="item.name">
              <span class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
                {{ `${item.name?.slice(0, 20)}...` }}
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

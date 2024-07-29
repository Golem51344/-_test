<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { DATA_PERMISSION_TYPE, dataPermissionOptionsAll } from '../enum';
import type { ModelValue } from '@/components/OrgUserSelector/OrgSelector.vue';
import OrgSelector from '@/components/OrgUserSelector/OrgSelector.vue';
import GroupSelector from '@/components/GroupSelector/index.vue';
import ResourceSelector from '@/components/ResourceSelector/index.vue';
import type { SelectedResourceInfo } from '@/components/ResourceSelector/hooks/useAppAndResource';
import useAppAndResource from '@/components/ResourceSelector/hooks/useAppAndResource';
import { RESOURCE_MODE } from '@/components/ResourceSelector/enum';

defineOptions({
  name: 'CreateAndEditDataPermission',
});

const emit = defineEmits(['submit']);

const resourceMode = RESOURCE_MODE.DATA_PERMISSION;
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
} = useAppAndResource(resourceMode);

const dialogTitle = ref('');
const defaultFormData = {
  name: '',
  type: '',
  appId: '',
  orgIds: [],
  resourceIds: [],
};
const formRef = ref<FormExpose>();
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: '请输入数据权限名称',
      trigger: ['blur', 'change'],
    },
  ],
  type: [
    {
      required: true,
      message: '请选择数据权限规则',
      trigger: ['blur', 'change'],
    },
  ],
  appId: [{ required: true, message: '请选择所属应用', trigger: ['blur', 'change'] }],
  resourceIds: [{ type: 'array', required: true, message: '请选择资源', trigger: ['blur', 'change'] }],
  orgIds: [{ type: 'array', required: true, message: '请选择部门', trigger: ['blur', 'change'] }],
  groupIds: [{ type: 'array', required: true, message: '请选择群组', trigger: ['blur', 'change'] }],
};
const form = ref<API.shujuquanxianxinzenghuogengxinduixiang>({
  ...defaultFormData,
});
const needOrg = computed(() => form.value.type === DATA_PERMISSION_TYPE.CUSTOM_DEPT_AND_SUB || form.value.type === DATA_PERMISSION_TYPE.CUSTOM_DEPT_ONLY);
const needGroup = computed(() => form.value.type === DATA_PERMISSION_TYPE.CUSTOM_GROUP);

const isEdit = ref(false);
const [open, setOpen] = useToggle(false);

// 部门相关
const orgRef = ref();
const selectedOrgs = ref<ModelValue[]>([]);

// 群组相关
const groupRef = ref();
const selectedGroups = ref<API.PubGroup[]>([]);

// 获取应用列表
getAppList();

async function onOpen(
  title: string,
  record?: API.shujuquanxianxinzenghuogengxinduixiang,
) {
  dialogTitle.value = title;
  isEdit.value = false;
  form.value = { ...defaultFormData };
  clearSelectedResources();
  clearSelectedOrgs();
  clearSelectedGroups();

  if (record) {
    isEdit.value = true;

    const res: API.ResponseDatashujuquanxianbianjiduixiang = await getRbacPubDataPermissionsGetById({ id: record?.id as string });
    if (res.success && res.data) {
      const { id, type, name, appId, orgs, resources, groups } = res.data;
      form.value = {
        id,
        type,
        appId,
        name: name || '',
        orgIds: orgs?.map((item: API.PubOrgBo) => item.id || ''),
        resourceIds: resources?.map((item: API.PubResourceTreeBo) => item.id || ''),
        groupIds: groups?.map((item: API.PubResourceTreeBo) => item.id || ''),
      };

      if (orgs && orgs.length) {
        selectedOrgs.value = orgs.map((org) => {
          return {
            orgId: org.id,
            orgName: org.name,
          };
        });
      }

      if (groups && groups.length) {
        selectedGroups.value = groups.map((org) => {
          return {
            id: org.id,
            name: org.name,
            value: org.id,
            label: org.name && org.name.length > 20 ? org.name.slice(0, 20) : org.name,
          };
        });
      }

      await updateTreeDataAndResourceMap(form.value.appId as string);
      form.value.resourceIds && updateSelectedResources(form.value.resourceIds);
    }
  }

  setOpen(true);
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
  setSelectedResources(data);
  if (data && data.length) {
    form.value.resourceIds = data.map(item => item.id);
    formRef.value?.clearValidate(['resourceIds']);
  }
  else {
    form.value.resourceIds = [];
  }
}

function showOrg() {
  orgRef.value && orgRef.value.open();
}

function showGroup() {
  groupRef.value && groupRef.value.open(selectedGroups.value);
}

function clearSelectedOrgs() {
  selectedOrgs.value = [];
}

function clearSelectedGroups() {
  selectedGroups.value = [];
}

function onOrgSelected(orgs: ModelValue[]) {
  selectedOrgs.value = orgs;
  if (orgs.length) {
    form.value.orgIds = orgs.map(org => org.orgId || '');
    formRef.value?.clearValidate(['orgIds']);
  }
  else {
    form.value.orgIds = [];
  }
}

function onGroupSelect(groups: API.PubGroup[]) {
  selectedGroups.value = groups;
  if (groups.length) {
    form.value.groupIds = groups.map(group => group.id || '');
    formRef.value?.clearValidate(['groupIds']);
  }
  else {
    form.value.groupIds = [];
  }
}

const [loading, setLoading] = useToggle(false);
function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);

    const submitFn = isEdit.value
      ? postRbacPubDataPermissionsUpdate
      : postRbacPubDataPermissionsSave;

    const params: API.shujuquanxianxinzenghuogengxinduixiang = {
      ...form.value,
    };

    if (!needOrg.value) {
      delete params.orgIds;
    }

    if (!needGroup.value) {
      delete params.groupIds;
    }

    submitFn(params)
      .then((res: API.ResponseDataVoid) => {
        if (res.success) {
          message.success(`${dialogTitle.value}成功！`);
          setOpen(false);
          emit('submit');
        }
      })
      .finally(() => setLoading(false));
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
    :title="`${dialogTitle}数据权限`"
    placement="right"
    :width="600"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
    @close="close"
  >
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 6 }">
      <a-form-item label="数据权限名称" name="name">
        <a-input v-model:value="form.name" :maxlength="20" />
      </a-form-item>
      <a-form-item label="数据权限规则" name="type">
        <a-select
          v-model:value="form.type"
          :options="dataPermissionOptionsAll"
          placeholder="请选择"
        />
      </a-form-item>
      <a-form-item label="所属应用" name="appId">
        <a-select
          v-model:value="form.appId"
          :disabled="isEdit"
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
      <a-form-item v-if="needOrg" label="所属部门" name="orgIds">
        <a-button type="primary" @click="showOrg">
          编辑部门
        </a-button>
        <div class="pt-10px">
          <template v-for="item in selectedOrgs" :key="item">
            <a-tooltip v-if="item.orgName && item.orgName.length > 20" :title="item.orgName">
              <span class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
                {{ `${item.orgName?.slice(0, 20)}...` }}
              </span>
            </a-tooltip>
            <span v-else class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
              {{ item.orgName }}
            </span>
          </template>
        </div>
      </a-form-item>
      <a-form-item v-if="needGroup" label="所属群组" name="groupIds">
        <a-button type="primary" @click="showGroup">
          编辑群组
        </a-button>
        <div class="pt-10px">
          <template v-for="item in selectedGroups" :key="item">
            <a-tooltip v-if="item.name && item.name.length > 20" :title="item.name">
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
        <a-button @click="close">
          取消
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit()">
          提交
        </a-button>
      </a-space>
    </template>

    <OrgSelector
      ref="orgRef"
      :model-value="selectedOrgs"
      multiple
      @submit="onOrgSelected"
    />
    <ResourceSelector ref="resourceModelRef" :mode="resourceMode" @select="onResourceSelected" />
    <GroupSelector ref="groupRef" @select="onGroupSelect" />
  </a-drawer>
</template>

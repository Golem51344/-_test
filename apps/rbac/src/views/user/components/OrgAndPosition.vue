<script setup lang="ts">
import { Form as AForm, Modal, theme } from 'ant-design-vue';
import type { Form } from '../interface';

defineOptions({
  name: 'OrgAndPosition',
});

const modelValue = defineModel<Form['userOrgList']>({ default: [] });

const { token } = theme.useToken();
const { onFieldChange } = AForm.useInjectFormItemContext();

watch(() => modelValue.value, () => {
  onFieldChange();
}, { deep: true });

const { data: positionOptions } = useRequest(
  params => getRbacPostList(params, {
    transformData(data) {
      return data.data ?? [];
    },
  }),
  { initialData: [] },
);

function uniqOrgValidator(_: unknown, value: string) {
  const number = modelValue.value?.filter(item => item.orgId === value)?.length ?? 0;
  if (number > 1) {
    return Promise.reject(new Error('请勿重复选择组织'));
  }
  return Promise.resolve();
}

function onUniqCurrent(index: number) {
  modelValue.value = modelValue.value?.map((e, i) => {
    return {
      ...e,
      main: index === i,
    };
  });
}

function onAdd() {
  modelValue.value?.push({
    orgId: null,
    positionList: [],
    main: false,
  } as any);
}

function onRemove(index: number) {
  Modal.confirm({
    title: '删除',
    content: '确定要删除吗？',
    zIndex: 4000,
    onOk() {
      modelValue.value?.splice(index, 1);
    },
  });
}
</script>

<template>
  <div class="space-y-2">
    <a-card
      v-for="(item, index) in modelValue"
      :key="index"
      size="small"
      :body-style="{ padding: '16px' }"
    >
      <template #title>
        <div class="flex items-center space-x-1">
          <PubSvgIcon v-if="item.main" name="org-main" class="text-2xl" />
          <PubSvgIcon v-else name="org-unmain" class="text-2xl" />
          <div :style="item.main ? { color: token.colorPrimary } : null" class="font-normal">
            {{ `组织${index + 1}` }}
          </div>
        </div>
      </template>
      <template #extra>
        <a-button
          v-if="!item.main && modelValue && modelValue?.length > 1"
          type="link"
          danger
          @click="onRemove(index)"
        >
          删除
        </a-button>
      </template>
      <a-form-item
        label="所属组织"
        :name="['userOrgList', index, 'orgId']"
        :label-col="{ span: 6 }"
        :rules="[
          { required: true, message: '所属组织不能为空' },
          { validator: uniqOrgValidator, trigger: 'change' },
        ]"
      >
        <OrgSelector
          :model-value="item.orgId ? [{ orgId: item.orgId, orgName: item.orgName }] : []"
          @submit="(orgs) => {
            const org = orgs?.[0];
            item.orgId = org?.orgId;
            item.orgName = org?.orgName;
          }"
        >
          <template #trigger>
            <div class="flex items-center overflow-hidden">
              <a-tooltip :title="item.orgName">
                <span v-if="item.orgName" class="mr-2 truncate">{{ item.orgName }}</span>
              </a-tooltip>
              <a-button type="primary" size="small">
                选择组织
              </a-button>
            </div>
          </template>
        </OrgSelector>
      </a-form-item>

      <a-form-item
        label="所属岗位"
        :name="['userOrgList', index, 'positionList']"
        :label-col="{ span: 6 }"
      >
        <a-select
          v-model:value="item.positionList"
          label-in-value
          :field-names="{ label: 'name', value: 'id' }"
          :options="positionOptions"
          allow-clear
          mode="multiple"
          placeholder="请选择所属岗位"
        />
      </a-form-item>

      <a-form-item
        label="主要组织"
        :name="['userOrgList', index, 'main']"
        :label-col="{ span: 6 }"
      >
        <a-switch
          v-model:checked="item.main"
          :disabled="item.main"
          @change="onUniqCurrent(index)"
        />
      </a-form-item>
    </a-card>

    <a-button type="primary" @click="onAdd">
      添加组织
    </a-button>
  </div>
</template>

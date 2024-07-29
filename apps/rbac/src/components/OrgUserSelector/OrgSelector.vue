<script setup lang="ts">
import { ContentSelector, OrgProvider } from '@pubinfo/headlessui';
import { Form, Modal } from 'ant-design-vue';
import { useToggle } from '@vueuse/core';
import { orgFieldNames, useOrgAPIs } from './provider';
import '@pubinfo/headlessui/style.css';

export interface ModelValue extends Record<string, any> {
  orgId?: string
  orgName?: string
}

export interface OrgSelectorProps {
  /** 标题 */
  title?: string
  /** 多选 */
  multiple?: boolean
  /** 数据权限 */
  auth?: string
  /** 替换接口 */
  apis?: ReturnType<typeof useOrgAPIs>
  /** Tab页 */
  tabs?: Array<{ value: string, label: string }>
  /** 禁用数据 */
  disabledData?: (node: any) => boolean
  /** 提交 */
  onSubmit?: (selected: ModelValue[]) => void
}

defineOptions({
  name: 'OrgSelector',
});

const props = withDefaults(
  defineProps<OrgSelectorProps>(),
  {
    title: '选择组织',
    multiple: false,
    apis: () => ({}),
    tabs: () => [
      { value: 'RecentlyUsed', label: '最近常用' },
      { value: 'Favorites', label: '收藏' },
      { value: 'OrgTree', label: '全部' },
      { value: 'Groups', label: '群组' },
    ],
    disabledData: () => false,
  },
);

const attrs = useAttrs();

const orgAPIs = { ...useOrgAPIs(props.auth), ...props.apis };

// 双向绑定
const open = defineModel<boolean>('open');
const modelValue = defineModel<ModelValue[]>({ default: [] });

const selectValue = ref<ModelValue[]>([]);
const setOpen = useToggle(open);
const { onFieldChange } = Form.useInjectFormItemContext();

function onOpen() {
  setOpen(true);
}
watch(open, async (_open) => {
  if (!_open) {
    return;
  }

  if (!modelValue.value.length) {
    selectValue.value = [];
    return;
  }

  try {
    // 回显选中项
    selectValue.value = await orgAPIs?.getSelectedData?.(modelValue.value) ?? modelValue.value;
  }
  catch (error) {
    selectValue.value = modelValue.value;
  }
}, { immediate: true });

function onSubmit() {
  modelValue.value = selectValue.value;
  props.onSubmit?.(selectValue.value);
  onFieldChange();
  setOpen(false);

  // 添加最近常用
  orgAPIs?.addRecentlyUsed?.(selectValue.value);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <div>
    <span v-if="$slots.trigger" @click="onOpen()">
      <slot name="trigger" />
    </span>

    <Modal
      v-bind="attrs"
      v-model:open="open"
      :title="title"
      :width="760"
      :z-index="1001"
      ok-text="确认"
      cancel-text="取消"
      @ok="onSubmit()"
    >
      <OrgProvider
        :apis="orgAPIs"
        :field-names="orgFieldNames"
      >
        <ContentSelector
          v-model="selectValue"
          default-tab="OrgTree"
          :tabs="tabs"
          :multiple="multiple"
          :disabled-data="disabledData"
        />
      </OrgProvider>
    </Modal>
  </div>
</template>

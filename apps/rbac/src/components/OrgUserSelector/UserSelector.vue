<script setup lang="ts">
import { ContentSelector, OrgProvider, UserProvider } from '@pubinfo/headlessui';
import { Form, Modal } from 'ant-design-vue';
import { useToggle } from '@vueuse/core';
import { omit, pick } from 'lodash-es';
import { orgFieldNames, resolveId, useOrgAPIs, useUserAPIs, userFieldNames } from './provider';
import '@pubinfo/headlessui/style.css';

export interface ModelValue extends Record<string, any> {
  orgId?: string
  userId?: string
  userName?: string
}

interface SelectValue extends Record<string, any> {
  /** userFieldNames.value */
  orgUserId?: string
  userName?: string
}

export interface UserSelectorProps {
  /** 标题 */
  title?: string
  /** 多选 */
  multiple?: boolean
  /** 数据权限 */
  auth?: string
  /** 替换接口 */
  apis?: ReturnType<typeof useUserAPIs> & Pick<ReturnType<typeof useOrgAPIs>, 'orgTree' | 'orgList'>
  /** Tab页 */
  tabs?: Array<{ value: string, label: string }>
  /** 禁用数据 */
  disabledData?: (node: any) => boolean
  /** 提交 */
  onSubmit?: (selected: ModelValue[]) => void
}

defineOptions({
  name: 'UserSelector',
});

const props = withDefaults(
  defineProps<UserSelectorProps>(),
  {
    title: '选择用户',
    multiple: false,
    apis: () => ({}),
    tabs: () => [
      { value: 'RecentlyUsed', label: '最近常用' },
      { value: 'Favorites', label: '收藏' },
      { value: 'TreeUserList', label: '全部' },
      { value: 'Groups', label: '群组' },
    ],
    disabledData: () => false,
  },
);

const attrs = useAttrs();

const orgAPIs = {
  ...useOrgAPIs(props.auth),
  ...pick(props.apis, ['orgTree', 'orgList']),
};
const userAPIs = {
  ...useUserAPIs(props.auth),
  ...omit(props.apis, ['orgTree', 'orgList']),
};

// 双向绑定
const open = defineModel<boolean>('open');
const modelValue = defineModel<ModelValue[]>({ default: [] });

const selectValue = ref<SelectValue[]>([]);
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
    selectValue.value = await userAPIs?.getSelectedData?.(modelValue.value) ?? modelValue.value;
  }
  catch (error) {
    selectValue.value = modelValue.value;
  }
}, { immediate: true });

function onSubmit() {
  const finalValue = selectValue.value?.map((item) => {
    const ids = resolveId(item[userFieldNames.value]);
    return {
      ...item,
      orgId: ids.orgId,
      userId: ids.userId,
    };
  });

  modelValue.value = finalValue;
  props.onSubmit?.(finalValue);
  onFieldChange();
  setOpen(false);

  // 添加最近常用
  userAPIs?.addRecentlyUsed?.(finalValue);
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
        <UserProvider
          :apis="userAPIs"
          :field-names="userFieldNames"
        >
          <ContentSelector
            v-model="selectValue"
            default-tab="TreeUserList"
            :tabs="tabs"
            :multiple="multiple"
            :disabled-data="disabledData"
          />
        </UserProvider>
      </OrgProvider>
    </Modal>
  </div>
</template>

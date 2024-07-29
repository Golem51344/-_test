<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { ColumnsType } from 'ant-design-vue/es/table';
import { theme } from 'ant-design-vue';
import type { TreeNode } from '../interface';

defineOptions({
  name: 'RoleRelation',
});

const { token } = theme.useToken();

const [open, setOpen] = useToggle(false);
const { loading, data: dataSource, send } = useRequest(
  params => getRbacResourceGetRoleListByResourceId(params, {
    transformData(data) {
      return data.data ?? [];
    },
  }),
  { immediate: false },
);

const columns: ColumnsType<API.PubRoleBo> = [
  {
    title: '角色名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
    width: 180,
    ellipsis: true,
  },
];

function onOpen(record: TreeNode) {
  setOpen(true);
  send({ id: record.id });
  computeTableHeight();
}

const tableHeight = computed(() => {
  return window.innerHeight
    - 57 // Drawer header
    - 48 // Drawer padding
    - 55 // Table header
    - 64; // Table pagination
});

function computeTableHeightHandler() {
  nextTick(() => {
    const tableBody = document.querySelector('.role-relation')?.querySelector<HTMLElement>('.ant-table-body');
    if (tableBody) {
      tableBody.style.height = `${tableHeight.value}px`;
    }
  });
}

function computeTableHeight() {
  nextTick(computeTableHeightHandler);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    title="分配查看"
    placement="right"
    :width="520"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-table
      row-key="id"
      :loading="loading"
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ y: `${tableHeight}px` }"
      :pagination="{ defaultPageSize: 20, showSizeChanger: true }"
      class="role-relation"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <div class="w-full truncate space-x-2">
            <a-avatar size="small" :style="{ backgroundColor: token.colorPrimary }">
              {{ text[0] }}
            </a-avatar>
            <span>{{ text }}</span>
          </div>
        </template>
      </template>
    </a-table>
  </a-drawer>
</template>

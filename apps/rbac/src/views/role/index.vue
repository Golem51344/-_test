<script setup lang="tsx">
import { Badge, Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION, kjOptions } from './enum';
import DrawerRole from './components/drawerRole.vue';

defineOptions({
  name: 'Role',
});

const { auth } = useAuth();
const tableRef = ref();
const drawerRoleRef = ref();

function getRoleData() {
  tableRef.value.fetch();
}

async function request(params: any) {
  const { current, pageSize, ...rest } = params;
  const res = await postRbacRoleRolePage({
    currentPage: current,
    pageSize,
    ...rest,
  });
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}
const columns: ProColumns<API.PubRole> = [
  {
    valueType: 'a-input',
    bind: 'value',
    minWidth: 200,
    title: '角色名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入角色名称',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '可见范围',
    dataIndex: 'viewScope',
    customRender: ({ text }: { text: string }) => {
      return kjOptions.find(item => item.value === text)?.label;
    },
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '创建人',
    dataIndex: 'createUserName',

  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '创建部门',
    dataIndex: 'createOrgName',
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '修改时间',
    dataIndex: 'updateTime',
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '角色状态',
    dataIndex: 'enable',
    customRender: ({ text }: { text: boolean }) => {
      return (
        text
          ? <Badge status="success" text="正常" />
          : <Badge status="error" text="关闭" />
      );
    },
  },
  {
    hideInSearch: true,
    width: 160,
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    hideInTable() {
      return !auth([
        'role_edit',
        'role_remove',
      ]);
    },
  },
];
function onAction(key: string, record?: API.PubRole): void {
  switch (key) {
    case ACTION.EDIT:
      drawerRoleRef.value.open(key, record);
      break;
    case ACTION.ADD:
      drawerRoleRef.value.open(key);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该角色吗？',
        onOk() {
          getRbacRoleRoleDelete({ id: record?.id as string }).then((res) => {
            if (res.success) {
              message.success('删除成功');
              getRoleData();
            }
          });
        },
      });
      break;
  }
}
</script>

<template>
  <div
    py-10px
    px-10px
    w-full
    h-full
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :request="request"
      :columns="columns"
      auto-height
      :scroll="{ x: 1100 }"
    >
      <template #toolbar>
        <a-button v-auth="'role_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a v-auth="'role_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <span v-auth="'role_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </span>
          </a-space>
        </template>
      </template>
    </ProTable>
    <DrawerRole ref="drawerRoleRef" @submit="getRoleData()" />
  </div>
</template>

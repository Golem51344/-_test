<script setup lang="tsx">
import { Badge, Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION } from './enum';
import DrawerPosition from './components/drawerPosition.vue';

defineOptions({
  name: 'PositionManage',
});
const { auth } = useAuth();

const tableRef = ref<typeof ProTable>();
const drawerPositionRef = ref<InstanceType<typeof DrawerPosition>>();

function getPositionData() {
  tableRef.value?.fetch();
}

async function request(params: any) {
  const { current, pageSize, ...rest } = params;
  const res = await postRbacPostFindPage({
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
const columns: ProColumns<API.PubPost> = [
  {
    valueType: 'a-input',
    bind: 'value',
    minWidth: 200,
    title: '岗位名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入岗位名称',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '岗位编码',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '岗位类别',
    dataIndex: 'type',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '是否启用',
    dataIndex: 'enable',
    customRender: ({ text }: { text: string }) => {
      return (
        text
          ? <Badge status="success" text="启用" />
          : <Badge status="error" text="禁用" />
      );
    },
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    width: 160,
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    hideInTable() {
      return !auth([
        'region_add_child',
        'region_edit',
        'region_remove',
      ]);
    },
  },
];

function onAction(key: string, record?: API.PubPost): void {
  switch (key) {
    case ACTION.EDIT:
      drawerPositionRef.value?.open(key, record);
      break;
    case ACTION.ADD:
      drawerPositionRef.value?.open(key);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该岗位吗？',
        onOk() {
          deleteRbacPostDeleteById({ id: record?.id as string }).then((res: API.ResponseDataVoid) => {
            if (res.success) {
              message.success('删除成功');
              getPositionData();
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
        <a-button v-auth="'position_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <div class="flex items-center">
            <PubSvgIcon name="icon_position_type" class="text-20px" />
            <span class="ml-4px">{{ record.type }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a v-auth="'position_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <span v-auth="'position_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </span>
          </a-space>
        </template>
      </template>
    </ProTable>
    <DrawerPosition ref="drawerPositionRef" @submit="getPositionData()" />
  </div>
</template>

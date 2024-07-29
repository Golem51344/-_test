<script setup lang="tsx">
import { Badge, Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import dayjs from 'dayjs';
import TenantEdit from './components/TenantEdit.vue';
import type { RecordData } from './interface';

defineOptions({
  name: 'Tenant',
});

enum ACTION {
  ADD = '新增',
  /** 编辑 */
  EDIT = '修改',
  /** 删除 */
  REMOVE = '删除',
}

const { auth } = useAuth();
const tableRef = ref();
const drawerRef = ref();

function getTableData() {
  tableRef.value.fetch();
}

function formatDate(date?: string) {
  return date ? dayjs(date).format('YYYY-MM-DD') : null;
}

async function request(params: any) {
  const { current, pageSize, tenantStartTime, tenantEndTime, ...rest } = params;
  const res = await postRbacTenantPubTenantPage({
    currentPage: current,
    pageSize,
    tenantStartTime: formatDate(tenantStartTime?.[0]),
    tenantStartTimeEnd: formatDate(tenantStartTime?.[1]),
    tenantEndTimeStart: formatDate(tenantEndTime?.[0]),
    tenantEndTimeEnd: formatDate(tenantEndTime?.[1]),
    ...rest,
  });
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}
const columns: ProColumns<RecordData> = [
  {
    valueType: 'a-input',
    minWidth: 200,
    title: '租户名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入租户名称',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    minWidth: 200,
    title: '租户编码',
    dataIndex: 'tenantCode',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入租户编码',
      allowClear: true,
    },
  },
  {
    valueType: 'a-range-picker',
    minWidth: 200,
    title: '开始时间',
    dataIndex: 'tenantStartTime',
    ellipsis: true,
    fieldProps: {
      allowClear: true,
    },
  },
  {
    valueType: 'a-range-picker',
    minWidth: 200,
    title: '到期时间',
    dataIndex: 'tenantEndTime',
    ellipsis: true,
    fieldProps: {
      allowClear: true,
    },
  },
  {
    minWidth: 200,
    title: '二级域名',
    dataIndex: 'subDomain',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '状态',
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
        'tenant_edit',
        'tenant_remove',
      ]);
    },
  },
];
function onAction(key: string, record?: RecordData) {
  switch (key) {
    case ACTION.EDIT:
      drawerRef.value.open(key, record);
      break;
    case ACTION.ADD:
      drawerRef.value.open(key);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该租户吗？',
        onOk() {
          getRbacTenantPubTenantDelete({ id: record?.id as string }).then((res) => {
            if (res.success) {
              message.success('删除成功');
              getTableData();
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
        <a-button v-auth="'tenant_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a v-auth="'tenant_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <span v-auth="'tenant_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </span>
          </a-space>
        </template>
      </template>
    </ProTable>
    <TenantEdit ref="drawerRef" @submit="getTableData()" />
  </div>
</template>

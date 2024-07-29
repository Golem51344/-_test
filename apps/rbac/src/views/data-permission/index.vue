<script setup lang="tsx">
import { useToggle } from '@vueuse/core';
import { Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import type { dataPermissionType } from './enum';
import { ACTION, dataPermissionOptionsAll, dataPermissionTypeLabel } from './enum';
import CreateAndEditDataPermission from './components/createAndEditDataPermission.vue';

defineOptions({
  name: 'DataPermission',
});

const tableRef = ref();
const drawerRef = ref();
const columns: ProColumns<API.shujuquanxianshituduixiang> = [
  {
    valueType: 'a-input',
    title: '数据权限名称',
    dataIndex: 'name',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-select',
    title: '数据权限规则',
    dataIndex: 'type',
    fieldProps: {
      placeholder: '请选择',
      allowClear: true,
      options: dataPermissionOptionsAll,
    },
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '更新时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
  },
];

async function request(params: any) {
  const { current, pageSize, type, name } = params;
  const ps: any = {
    pageSize,
    currentPage: current,
    doSearchTotal: true,
    type,
    name,
  };

  const res = await postRbacPubDataPermissionsPageQuery(ps);

  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}

function getListData() {
  tableRef.value.fetch();
}

const [loading, setLoading] = useToggle(false);
function onAction(key: string, record?: API.shujuquanxianshituduixiang): void {
  if (loading.value) {
    return;
  }
  switch (key) {
    case ACTION.ADD:
      drawerRef.value.open(key);
      break;
    case ACTION.EDIT:
      drawerRef.value.open(key, record);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该权限吗？',
        async onOk() {
          setLoading(true);
          deleteRbacPubDataPermissionsDelete({ id: record?.id as string })
            .then((res: API.ResponseDataVoid) => {
              if (res.success) {
                message.success('删除成功');
                getListData();
              }
            })
            .finally(() => setLoading(false));
        },
      });
      break;
  }
}
</script>

<template>
  <div
    w-full
    h-full
    py-10px
    px-10px
    flex
    flex-col
    class="page-data-permission"
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :request="request"
      :columns="columns"
      auto-height
      :scroll="{ x: 1000 }"
    >
      <template #toolbar>
        <a-button
          v-auth="'data_permission_create'"
          type="primary"
          @click="onAction(ACTION.ADD)"
        >
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <span>{{ dataPermissionTypeLabel[record.type as dataPermissionType] }}</span>
        </template>

        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a
              v-auth="'data_permission_edit'"
              class="flex items-center hover:opacity-80"
              @click="onAction(ACTION.EDIT, record)"
            >
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <a
              v-auth="'data_permission_delete'"
              flex
              items-center
              text-red-500
              hover:cursor-pointer
              hover:text-red-500
              hover:opacity-80
              @click="onAction(ACTION.REMOVE, record)"
            >
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </a>
          </a-space>
        </template>
      </template>
    </ProTable>
    <CreateAndEditDataPermission ref="drawerRef" @submit="getListData" />
  </div>
</template>

<style lang="scss">
.page-data-permission {
  .ant-card.pro-table {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .ant-form-item-label {
    width: 102px !important;
  }
}
</style>

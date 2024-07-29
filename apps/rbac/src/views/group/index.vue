<script setup lang="tsx">
import { Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION } from './enum';
import DrawerGroup from './components/drawerGroup.vue';

defineOptions({
  name: 'GroupManage',
});

const query = ref<{ type: string }>({ type: '1' });
const data = ref<API.PubGroup[]>([]);

const tableRef = ref<typeof ProTable>();
const drawerGroupRef = ref<InstanceType<typeof DrawerGroup>>();

function getGroupData() {
  tableRef.value?.fetch();
}

async function request(params: any) {
  const { current, pageSize, ...rest } = params;
  const res = await postGroupFindPage({
    currentPage: current,
    pageSize,
    ...rest,
    type: query.value.type,
  });

  return {
    success: true,
    data: res.data?.records ?? [],
    total: res.data?.total,
  };
}

const columns: ProColumns<API.PubGroup> = [
  {
    valueType: 'a-input',
    bind: 'value',
    minWidth: 200,
    title: '群组名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入群组名称',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '群组描述',
    dataIndex: 'remark',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '群组使用范围',
    dataIndex: 'viewScope',
    customRender: ({ text }) => {
      if (text === '1') {
        return '本部门';
      }
      else if (text === '2') {
        return '本部门及子部门';
      }
      else {
        return '全部';
      }
    },
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '最后一次编辑时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '编辑人',
    dataIndex: 'updatedUserName',
  },
  {
    hideInSearch: true,
    width: 160,
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
  },
];

function changeType() {
  tableRef.value?.reload();
}

function onAction(key: string, type: string, record?: API.PubGroup): void {
  switch (key) {
    case ACTION.EDIT:
      drawerGroupRef.value?.open(key, type, record);
      break;
    case ACTION.ADD:
      drawerGroupRef.value?.open(key, type);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该群组吗？',
        onOk() {
          deleteGroupDeleteById({ id: record?.id as string })
            .then(({ success }) => {
              if (success) {
                message.success('删除成功');
                getGroupData();
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
    <div
      h-full
      w-full
      bg-white
      rounded-8px
      class="dark:bg-[#141414]"
    >
      <a-tabs v-model:activeKey="query.type" class="tabs_custom" @change="changeType">
        <a-tab-pane key="1" tab="组织群组" />
        <a-tab-pane key="2" tab="人员群组" />
      </a-tabs>

      <div style="height: calc(100% - 48px);">
        <ProTable
          ref="tableRef"
          row-key="id"
          :request="request"
          :columns="columns"
          :data-source="data"
          auto-height
          :scroll="{ x: 1100 }"
        >
          <template #toolbar>
            <a-button type="primary" @click="onAction(ACTION.ADD, query.type)">
              <PlusCircleOutlined />
              {{ ACTION.ADD }}
            </a-button>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
              <a-space>
                <a class="flex items-center" @click="onAction(ACTION.EDIT, query.type, record)">
                  <PubSvgIcon name="edit" class="text-base" />
                  <span class="ml-4px">{{ ACTION.EDIT }}</span>
                </a>
                <span
                  class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80"
                  @click="onAction(ACTION.REMOVE, query.type, record)"
                >
                  <PubSvgIcon name="remove" class="text-base" />
                  <span class="ml-4px">{{ ACTION.REMOVE }}</span>
                </span>
              </a-space>
            </template>
          </template>
        </ProTable>
      </div>
    </div>
    <DrawerGroup ref="drawerGroupRef" @submit="getGroupData()" />
  </div>
</template>

<style lang="scss" scoped>
.box_sh {
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
.tabs_custom {
  height: 46px;
  :deep(.ant-tabs-nav) {
    margin: 0px;
    .ant-tabs-nav-list {
      padding-left: 16px;
    }
  }
}
</style>

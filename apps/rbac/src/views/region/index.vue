<script setup lang="tsx">
import { Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import type { Key } from 'ant-design-vue/es/vc-table/interface';
import { cloneDeep } from 'lodash-es';
import { ACTION } from './enum';
import DrawerRegion from './components/drawerRegion.vue';

defineOptions({
  name: 'RegionManage',
});
const { auth } = useAuth();

type TreeNode = API.PubRegion & {
  children?: TreeNode[]
};
const query = ref<API.getRegionGetListByParentIdParams>({ parentId: '' });

const data: Ref<TreeNode[]> = ref([]);
const chilData = ref<TreeNode>({});

const tableRef = ref<typeof ProTable>();
const drawerRegionRef = ref<InstanceType<typeof DrawerRegion>>();

// 刷新数据展开未重置的问题
const expandedRowKeys = ref<Key[]>([]);
function expandedRowsChange(expandedRows: Key[]): void {
  expandedRowKeys.value = expandedRows;
}

const columns: ProColumns<TreeNode> = [
  {
    minWidth: 240,
    title: '区域名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    minWidth: 100,
    title: '区域范围',
    dataIndex: 'type',
  },
  {
    minWidth: 140,
    title: '行政区划编码',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    minWidth: 100,
    title: '区域编码',
    dataIndex: 'regionCode',
  },
  {
    minWidth: 100,
    title: '显示顺序',
    dataIndex: 'sort',
  },
  {
    hideInSearch: true,
    title: '操作',
    dataIndex: 'action',
    width: 240,
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

function onAction(key: string, record?: TreeNode): void {
  switch (key) {
    case ACTION.ADDNEXT:
      query.value.parentId = record!.id;
      chilData.value = record!;
      drawerRegionRef.value?.open(key, record);
      break;
    case ACTION.ADD:
      query.value.parentId = '';
      chilData.value = {};
      drawerRegionRef.value?.open(key);
      break;
    case ACTION.EDIT:
      query.value.parentId = record!.parentId;
      chilData.value = getNodeById(data.value, query.value.parentId!);
      drawerRegionRef.value?.open(key, record);
      break;
    case ACTION.REMOVE:
      query.value.parentId = record!.parentId;
      chilData.value = getNodeById(data.value, query.value.parentId!);
      Modal.confirm({
        title: '删除',
        content: '确定要删除该区域吗？',
        onOk() {
          getRegionDeleteRegionByCode({ code: record!.code! })
            .then((res: API.ResponseDataBoolean) => {
              if (res.success) {
                message.success('删除成功');
                getRegionData();
              }
            });
        },
      });
      break;
  }
}

/* 获取表格数据 */
async function request() {
  const res = await getRegionGetListByParentId({
    ...query.value,
  });
  if (Object.keys(chilData.value).length > 0) {
    const length = res.data!.length;
    if (length > 0) {
      chilData.value.children = res.data?.map((e: API.PubRegion) => {
        return {
          ...e,
          children: e.isLeaf ?? [],
        };
      }) as TreeNode[];
    }
    else {
      chilData.value.children = undefined;
    }
  }
  else {
    expandedRowKeys.value = [];
    data.value = res.data?.map((e: API.PubRegion) => {
      return {
        ...e,
        children: e.isLeaf ?? [],
      };
    }) as TreeNode[];
  }
  return {
    success: true,
    data: data.value,
  };
}

/* 表格中父节点展开 */
function expand(flag: boolean, data: TreeNode) {
  const dataTemp = cloneDeep(data);
  if (flag) {
    if (dataTemp.children?.length === 0) {
      query.value.parentId = data.id;
      chilData.value = data;
      tableRef.value?.fetch();
    }
  }
}

/* 新建或者编辑后刷新列表 */
function getRegionData() {
  tableRef.value?.fetch();
}

/* 获取某节点的信息 */
function getNodeById(nodes: TreeNode[], id: string): any {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const foundNode = getNodeById(node.children, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return undefined;
}
</script>

<template>
  <div
    w-full
    h-full
    py-10px
    px-10px
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :search="false"
      :request="request"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      auto-height
      :expanded-row-keys="expandedRowKeys"
      :scroll="{ x: 1100 }"
      @expanded-rows-change="expandedRowsChange"
      @expand="expand"
    >
      <template #toolbar>
        <a-button v-auth="'region_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a
              v-auth="'region_add_child'"
              class="flex items-center"
              @click="onAction(ACTION.ADDNEXT, record)"
            >
              <PubSvgIcon name="add-child" class="text-base" />
              <span class="ml-4px">{{ ACTION.ADDNEXT }}</span>
            </a>
            <a
              v-auth="'region_edit'"
              class="flex items-center"
              @click="onAction(ACTION.EDIT, record)"
            >
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <span
              v-auth="'region_remove'"
              class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80"
              @click="onAction(ACTION.REMOVE, record)"
            >
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </span>
          </a-space>
        </template>
      </template>
    </ProTable>
    <DrawerRegion
      ref="drawerRegionRef"
      :tree-data="data"
      @submit="getRegionData()"
    />
  </div>
</template>

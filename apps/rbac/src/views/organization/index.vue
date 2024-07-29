<script setup lang="ts">
import { Badge, Modal, message } from 'ant-design-vue';
import { useToggle } from '@vueuse/core';
import type { VxeTableInstance, VxeTablePropTypes } from 'vxe-table';
import { cloneDeep } from 'lodash-es';
import { ACTION } from './enum';
import DrawerOrganization from './components/drawerOrganization.vue';

defineOptions({
  name: 'Organization',
});
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    return () => props.vnodes;
  },
});

type ChilData = API.PubOrg & { children?: API.PubOrg[], hasChild?: boolean };

const [loading, setLoading] = useToggle(false);
/** 下拉查询的相关数据 start */
const formState: Ref<API.OrgSearchQuery> = ref({ currentPage: 1, pageSize: 10, doSearchTotal: true });
const searchId: Ref<string> = ref('');
const searchText: Ref<string> = ref('');
const selectOptions = ref<any[]>([]);
const searchTotal: Ref<number> = ref(0);
// 保留searchResultData，为了在查询状态下，当展开下一级时，使用的是查询结果的数据
const searchResultData: Ref<ChilData[]> = ref([]);
// 查询后的数据是需要全部展开的，所以除了最后一级之外其余全部存储在expandedRowKeys
const expandedRowKeys = ref<string[]>([]);
/** 下拉查询的相关数据 end */

const query = ref<API.getRbacOrgOrgListByParentIdParams>({ parentId: '0' });

const tableData: Ref<ChilData[]> = ref([]);

const tableRef = ref<VxeTableInstance<ChilData>>();
const DrawerOrganizationRef = ref();

const isSearch = ref(false);
let timeout: any;

function handleZuZhiSearch(val: string) {
  // console.log('--val:', val);
  formState.value.currentPage = 1;
  if (val.length > 0) {
    searchText.value = val;
    debounce(() => {
      const params = { ...formState.value, keyWord: searchText.value };
      getSelectData(params);
    });
  }
  else {
    selectOptions.value = [];
    searchTotal.value = 0;
  }
}

function getSelectData(params: any) {
  postRbacOrgSearch(params).then((res: any) => {
    if (res?.success) {
      selectOptions.value = res.data.records.map((item: API.PubOrg) => {
        return {
          label: item.name,
          value: item.id,
          idPath: item.idPath,
        };
      });
      searchTotal.value = res.data.total;
    }
  });
}
function debounce(callback: () => void, delay = 300): void {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    callback();
  }, delay);
}

function handleChange(): void {
  const params = { ...formState.value, keyWord: searchText.value };
  getSelectData(params);
}

function handleSelectChange(value: any): void {
  // 当清空数据时，需要清空下拉数据
  if (value === undefined) {
    selectOptions.value = [];
    searchTotal.value = 0;
    formState.value.currentPage = 1;
    searchId.value = '';
  }
}

async function onSearch() {
  if (searchId.value === '') {
    isSearch.value = false;
    generateData();
  }
  else {
    const idPath = selectOptions.value.find(item => item.value === searchId.value).idPath;
    expandedRowKeys.value = idPath.split(',');
    // 删除当前最后一级节点，使其处于不展开的状态
    expandedRowKeys.value.pop();
    const res = await getRbacOrgSearchTreeById({ id: searchId.value });
    searchResultData.value = addPropertyToTreeNodes([res.data!]);
    tableData.value = cloneDeep(searchResultData.value);
    tableRef.value?.reloadData(tableData.value);
    if (expandedRowKeys.value.length > 0) {
      expandedRowKeys.value.forEach((key) => {
        setTimeout(() => {
          const row = getNodeById(tableData.value, key);
          tableRef.value?.reloadTreeExpand(row);
        }, 200);
      });
    }
  }
}

function addPropertyToTreeNodes(nodes: ChilData[]): ChilData[] {
  return nodes.map((node) => {
    // 为当前节点添加新属性
    const newNode: ChilData = {
      ...node,
      hasChild: !node.leaf,
    };

    // 如果当前节点有子节点，递归调用addPropertyToTreeNodes
    if (node.children && node.children.length > 0) {
      newNode.children = addPropertyToTreeNodes(node.children);
    }

    return newNode;
  });
}

function reset() {
  searchId.value = '';
  isSearch.value = false;
  generateData();
}

function generateData(): void {
  expandedRowKeys.value = [];
  setLoading(true);
  getRbacOrgOrgListByParentId({
    parentId: '0',
  }).then((res: any) => {
    if (res?.success) {
      tableData.value = res.data?.map((e: API.PubOrg) => {
        return {
          ...e,
          children: [],
          hasChild: !e.leaf,
        };
      });
      tableRef.value?.reloadData(tableData.value);
    }
    setLoading(false);
  });
}

generateData();

const operateRow = ref<ChilData>({});
const operateType = ref<string>('');

function updateData() {
  if (operateType.value === ACTION.ADD) {
    searchId.value = '';
    isSearch.value = false;
    generateData();
  }
  else if (operateType.value === ACTION.ADDNEXT) {
    if (operateRow.value.hasChild) {
      tableRef.value?.setTreeExpand(operateRow.value.children, false);
      tableRef.value?.reloadTreeExpand(operateRow.value);
    }
    // 没有子节点的新增下级需要刷新父节点，使其节点前面多一个加号
    else {
      const parentNode = getNodeById(tableData.value, operateRow.value.parentId!);
      if (parentNode) {
        tableRef.value?.setTreeExpand(parentNode.children, false);
        tableRef.value?.reloadTreeExpand(parentNode);
      }
      else {
        generateData();
      }
    }
  }
  // 编辑某一行数据后，把父节点关闭然后重新打开，页面数据才更新
  else if (operateType.value === ACTION.EDIT) {
    const parentNode = getNodeById(tableData.value, operateRow.value.parentId!);
    tableRef.value?.setTreeExpand(parentNode.children, false);
    tableRef.value?.reloadTreeExpand(parentNode);
  }
}
/* 获取某节点的信息 */
function getNodeById(nodes: any, id: string): any {
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

const treeConfig = reactive<VxeTablePropTypes.TreeConfig<ChilData>>({
  lazy: true,
  transform: true,
  reserve: false,
  rowField: 'id',
  parentField: 'parentId',
  hasChildField: 'hasChild',
  childrenField: 'children',
  iconOpen: 'vxe-icon-minus',
  iconClose: 'vxe-icon-add',
  loadMethod({ row }) {
    if (expandedRowKeys.value.includes(row.id!)) {
      return new Promise((resolve) => {
        const node = getNodeById(searchResultData.value, row.id!);
        const childs = cloneDeep(node.children);
        resolve(childs);
      });
    }
    else {
    // 异步加载子节点
      query.value.parentId = row.id;
      return new Promise((resolve) => {
        getRbacOrgOrgListByParentId({
          ...query.value,
        }).then((res: any) => {
          if (res?.success) {
            const childs = res.data?.map((e: ChilData) => {
              return {
                ...e,
                hasChild: !e.leaf,
              };
            });
            resolve(childs);
          }
        // console.log('*************', tableData.value);
        });
      });
    }
  },
});
function onAction(key: string, record?: ChilData): void {
  operateType.value = key;
  switch (key) {
    case ACTION.ADDNEXT:
      operateRow.value = record!;
      DrawerOrganizationRef.value.open(key, record);
      break;
    case ACTION.ADD:
      DrawerOrganizationRef.value.open(key);
      break;
    case ACTION.EDIT:
      operateRow.value = record!;
      DrawerOrganizationRef.value.open(key, record);
      break;
    case ACTION.REMOVE:
      operateRow.value = record!;
      // console.log('remove', operateRow.value, tableData.value);
      Modal.confirm({
        title: '删除',
        content: '确定要删除该组织吗？',
        onOk() {
          getRbacOrgDeleteOrg({ id: record?.id as string }).then((res: API.ResponseDataVoid) => {
            if (res.success) {
              message.success('删除成功');
              const parentRow = getNodeById(tableData.value, operateRow.value.parentId!);
              if (parentRow) {
                if (parentRow.children?.length > 1) {
                  tableRef.value?.remove(operateRow.value);
                }
                else {
                // 如果他的父节点只有一个子节点，那么刷新他的父节点的父节点，使其没有前面的加号
                  const opRow = getNodeById(tableData.value, parentRow.parentId!);
                  if (opRow) {
                    tableRef.value?.setTreeExpand(opRow.children, false);
                    tableRef.value?.reloadTreeExpand(opRow);
                  }
                  else {
                    generateData();
                  }
                }
              }
              else {
                generateData();
              }
            }
          });
        },
      });

      break;
  }
}
</script>

<template>
  <div w-full h-full p-10px>
    <div class="org_page bg-[#fff] dark:bg-[#141414]">
      <div class="search_panel">
        <div class="left">
          <label class="dark:text-[#f7f7f7]">组织名称：</label>
          <a-select
            v-model:value="searchId"
            class="w-400px!"
            show-search
            allow-clear
            :filter-option="false"
            :options="selectOptions.map(item => ({ ...item }))"
            @search="handleZuZhiSearch"
            @change="handleSelectChange"
          >
            <template #dropdownRender="{ menuNode: menu }">
              <VNodes :vnodes="menu" />
              <div class="text-right">
                <a-pagination
                  v-if="searchTotal > 10"
                  v-model:current="formState.currentPage"
                  :show-size-changer="false"
                  size="small"
                  :total="searchTotal"
                  @change="handleChange"
                />
              </div>
            </template>
          </a-select>
        </div>
        <div class="right">
          <a-button @click="reset">
            重置
          </a-button>
          <a-button class="ml-10px" type="primary" @click="onSearch">
            搜索
          </a-button>
        </div>
      </div>
      <div class="px-16px divider">
        <a-divider />
      </div>
      <div class="body_panel" style="height: calc(100% - 74px);">
        <div class="h-48px flex items-center px-16px">
          <a-button v-auth="'org_add'" type="primary" @click="onAction(ACTION.ADD)">
            <PlusCircleOutlined />
            {{ ACTION.ADD }}
          </a-button>
        </div>
        <div class="px-16px" style="height: calc(100% - 50px);">
          <VxeTable
            ref="tableRef"
            border="inner"
            keep-source
            :loading="loading"
            :auto-resize="true"
            height="auto"
            :row-config="{ keyField: 'id', isHover: true }"
            :column-config="{ resizable: true }"
            :tree-config="treeConfig"
            :data="tableData"
            :scroll-y="{ enabled: true }"
            show-overflow
          >
            <VxeColumn
              field="name"
              title="组织名称"
              width="300"
              tree-node
            />
            <VxeColumn field="enable" title="是否启动">
              <template #default="{ row }">
                <Badge v-if="row.enable" status="success" text="启用" />
                <Badge v-else status="error" text="禁用" />
              </template>
            </VxeColumn>
            <VxeColumn field="contactPerson" title="联系人" />
            <VxeColumn field="contactMobile" title="联系电话" />
            <VxeColumn field="type" title="组织类型" />
            <VxeColumn field="code" title="组织编码" />
            <VxeColumn field="action" title="操作" width="240">
              <template #default="{ row }">
                <a-space>
                  <a v-auth="'org_add_child'" class="flex items-center" @click="onAction(ACTION.ADDNEXT, row)">
                    <PubSvgIcon name="add-child" class="text-base" />
                    <span class="ml-4px">{{ ACTION.ADDNEXT }}</span>
                  </a>
                  <a v-auth="'org_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, row)">
                    <PubSvgIcon name="edit" class="text-base" />
                    <span class="ml-4px">{{ ACTION.EDIT }}</span>
                  </a>
                  <span v-auth="'org_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, row)">
                    <PubSvgIcon name="remove" class="text-base" />
                    <span class="ml-4px">{{ ACTION.REMOVE }}</span>
                  </span>
                </a-space>
              </template>
            </VxeColumn>

            <template #empty>
              <div class="flex-center">
                <img src="@/assets/icons/not-data.svg" alt="">
              </div>
            </template>
          </VxeTable>
        </div>
      </div>
    </div>
    <DrawerOrganization
      ref="DrawerOrganizationRef"
      @submit="updateData"
    />
  </div>
</template>

<style lang="scss" scoped>
.org_page {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 14px;
  line-height: 1.5714285714285714;
  color: rgba(0, 0, 0, 0.88);
  list-style: none;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
.search_panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 80px;
  padding: 16px 16px 16px 24px;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
.divider {
  :deep(.ant-divider-horizontal) {
    margin: 0px;
  }
}
</style>

<style lang="scss" scoped>
:deep(.vxe-table--body-wrapper) {
  overflow-x: hidden;
}
:deep(.vxe-tree--btn-wrapper) {
  width: 15px !important;
  height: 15px !important;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  &:hover {
    border-color: #69b1ff !important;
    .vxe-tree--node-btn {
      color: #69b1ff !important;
    }
  }
}
:deep(.vxe-header--column .vxe-resizable) {
  right: 0px;
  bottom: 14px;
  width: 1px;
  height: 1.6em;
  background-color: var(--vxe-table-border-color);
}
:deep([class*=vxe-icon-]) {
  font-size: 12px;
  transform: scale(0.8);
}
</style>

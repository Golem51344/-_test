<script setup lang="tsx">
import { Badge, Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { cloneDeep, isNil } from 'lodash-es';
import { PubSvgIcon } from '@pubinfo/components';
import ResourceEdit from './components/ResourceEdit.vue';
import RoleRelation from './components/RoleRelation.vue';
import { ACTION, RESOURCE_TYPE, resourceOptions } from './enum';
import type { TreeNode } from './interface';

defineOptions({
  name: 'Resource',
});

const { auth } = useAuth();

const columns: ProColumns<TreeNode> = [
  {
    valueType: 'a-input',
    width: 200,
    title: '资源名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入资源名称',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    title: '资源编码',
    dataIndex: 'code',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入资源编码',
      allowClear: true,
    },
  },
  {
    valueType: 'a-select',
    title: '资源类型',
    dataIndex: 'type',
    fieldProps: {
      placeholder: '请选择资源类型',
      allowClear: true,
      options: resourceOptions,
    },
    customRender({ text }) {
      const icon = ['', 'app', 'index', 'menu', 'btn', 'nonmenu'];
      return (
        <div class="flex items-center space-x-1">
          <PubSvgIcon name={`resource-${icon[text]}`} class="text-xl" />
          <span>{resourceOptions.find(item => item.value === text)?.label}</span>
        </div>
      );
    },
  },
  {
    valueType: 'a-select',
    title: '是否启用',
    dataIndex: 'enable',
    width: 100,
    fieldProps: {
      placeholder: '请选择是否启用',
      allowClear: true,
      options: [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
      ],
    },
    customRender({ text }) {
      return (
        text
          ? <Badge status="success" text="是" />
          : <Badge status="error" text="否" />
      );
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permissionCode',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    hideInSearch: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 320,
    hideInSearch: true,
    hideInTable() {
      return !auth([
        'resource_role_relation',
        'resource_add_child',
        'resource_edit',
        'resource_remove',
      ]);
    },
  },
];

function recursiveTreeMap<T extends { children?: T[] }>(tree: T[], fn: (node: T) => any) {
  return tree?.map((node) => {
    node.children = node.children && recursiveTreeMap(node.children, fn);
    return fn(node);
  }) ?? [];
}

function toList<T extends { children?: T[] }>(tree: T[]) {
  const list = cloneDeep(tree);
  for (let i = 0; i < list.length; i++) {
    if (!list[i].children) {
      continue;
    }
    list.splice(i + 1, 0, ...list[i].children as T[]);
    list[i].children = undefined;
  }
  return list;
}

const tableRef = ref();
const dataSource = computed(() => tableRef.value?.dataSource ?? []);
function getTreeData() {
  tableRef.value.reload();
}

async function request(params: any) {
  const dataSource = await getRbacResourceResourceTree({
    transformData(data) {
      return recursiveTreeMap<TreeNode>(data?.data ?? [], (node) => {
        return node.leaf ? { ...node, children: undefined } : node;
      }) as TreeNode[];
    },
  });
  const { name, code, type, enable } = params;
  const isAllNil = isNil(name) && isNil(code) && isNil(type) && isNil(enable);

  const data = toList(dataSource).filter((node) => {
    if (!node?.name?.includes(name) && !isNil(name)) {
      return false;
    }
    if (!node?.code?.includes(code) && !isNil(code)) {
      return false;
    }
    if (node.type !== type && !isNil(type)) {
      return false;
    }
    if (node.enable !== Boolean(enable) && !isNil(enable)) {
      return false;
    }
    return true;
  });

  return {
    success: true,
    data: isAllNil ? dataSource : data,
  };
}

const editRef = ref();
const relationRef = ref();
function onAction(key: string, record?: TreeNode) {
  switch (key) {
    case ACTION.ROLE_RELATION:
      relationRef.value.open(record);
      break;

    case ACTION.ADD:
      editRef.value.open(key);
      break;

    case ACTION.ADD_CHILD:
      editRef.value.open(key, record);
      break;

    case ACTION.EDIT:
      editRef.value.open(key, record);
      break;

    case ACTION.REMOVE:
      if (!record?.leaf) {
        message.info('非叶子节点不能删除');
        return;
      }
      Modal.confirm({
        title: '删除',
        content: '确定要删除该资源吗？',
        async onOk() {
          const res = await getRbacResourceResourceDelete({ id: record?.id as string });
          if (res.success) {
            message.success('删除成功');
            getTreeData();
          }
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
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :columns="columns"
      :request="request"
      :pagination="false"
      :scroll="{ x: 1024 }"
      auto-height
    >
      <template #toolbar>
        <a-button v-auth="'resource_app_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a v-auth="'resource_role_relation'" class="flex items-center" @click="onAction(ACTION.ROLE_RELATION, record)">
              <PubSvgIcon name="view" class="mr-1 text-base" />
              <span>{{ ACTION.ROLE_RELATION }}</span>
            </a>
            <a
              v-if="record.type !== RESOURCE_TYPE.BUTTON"
              v-auth="'resource_add_child'"
              class="flex items-center"
              @click="onAction(ACTION.ADD_CHILD, record)"
            >
              <PubSvgIcon name="add-child" class="mr-1 text-base" />
              <span>{{ ACTION.ADD_CHILD }}</span>
            </a>
            <a v-auth="'resource_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
              <PubSvgIcon name="edit" class="mr-1 text-base" />
              <span>{{ ACTION.EDIT }}</span>
            </a>
            <span v-auth="'resource_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
              <PubSvgIcon name="remove" class="mr-1 text-base" />
              <span>{{ ACTION.REMOVE }}</span>
            </span>
          </a-space>
        </template>
      </template>
    </ProTable>
    <ResourceEdit ref="editRef" :data-source="dataSource" @submit="getTreeData" />
    <RoleRelation ref="relationRef" />
  </div>
</template>

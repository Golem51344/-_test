<script setup lang="tsx">
import { Badge, Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION } from './enum';
import drawerDictionaryItem from './components/drawerDictionaryItem.vue';

defineOptions({
  name: 'DictionaryItem',
});
const { auth } = useAuth();
const tableRef = ref();
const DrawerDictionaryItemRef = ref();

const columns: ProColumns<API.DictItemVo> = [
  {
    minWidth: 100,
    title: '字典项标签名',
    dataIndex: 'dictLabel',
    ellipsis: true,
  },
  {
    minWidth: 100,
    title: '字典项值',
    dataIndex: 'dictValue',
    ellipsis: true,
  },
  {
    minWidth: 200,
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    width: 80,
    minWidth: 60,
    title: '排序',
    dataIndex: 'sort',
  },
  {
    width: 100,
    minWidth: 80,
    title: '是否启用',
    dataIndex: 'enable',
    customRender({ text }: { text: boolean }) {
      return (
        text
          ? <Badge status="success" text="启用" />
          : <Badge status="error" text="禁用" />
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 160,
    fixed: 'right',
    hideInTable() {
      return !auth([
        'dictionary_data_remove',
        'dictionary_data_edit',
      ]);
    },
  },
];

const state = reactive({
  code: '',
  name: '',
});
const route = useRoute();
onMounted(() => {
  state.code = route.query.code as string;
});

function onAction(key: string, record?: API.DictItemVo): void {
  switch (key) {
    case ACTION.ADD:
      DrawerDictionaryItemRef.value.open(key, state.code);
      break;
    case ACTION.EDIT:
      DrawerDictionaryItemRef.value.open(key, state.code, record);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该字典数据吗？',
        onOk() {
          deleteDictItemDeleteById({ id: record?.id as string }).then((res: API.ResponseDataVoid) => {
            if (res.success) {
              message.success('删除成功');
              getDictData();
            }
          });
        },
      });
      break;
  }
}

async function request(params: any) {
  const { current, pageSize, ...rest } = params;
  const res = await postDictItemPage({
    currentPage: current,
    pageSize,
    code: route.query.code,
    ...rest,
  });
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}

function getDictData() {
  tableRef.value.fetch();
}
</script>

<template>
  <div
    p-20px
    w-full
    h-full
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :request="request"
      :search="false"
      :columns="columns"
      auto-height
      :scroll="{ x: 1040 }"
    >
      <template #toolbar>
        <a-button v-auth="'dictionary_data_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a v-auth="'dictionary_data_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <a v-auth="'dictionary_data_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </a>
          </a-space>
        </template>
      </template>
    </ProTable>

    <drawerDictionaryItem
      ref="DrawerDictionaryItemRef"
      @submit="getDictData()"
    />
  </div>
</template>

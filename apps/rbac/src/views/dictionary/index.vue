<script setup lang="tsx">
import { Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION } from './enum';
import DrawerDictionary from './components/drawerDictionary.vue';

defineOptions({
  name: 'Dictionary',
});

const { auth } = useAuth();
const tableRef = ref();
const drawerDictionaryRef = ref();
const columns: ProColumns<API.DictTypeVo> = [
  {
    valueType: 'a-input',
    width: 50,
    hideInTable: true,
    title: '名称或编码',
    dataIndex: 'searchName',
    fieldProps: {
      placeholder: '请输入名称或者编码',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    minWidth: 100,
    title: '类型名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    minWidth: 80,
    title: '类型编码',
    dataIndex: 'code',
    ellipsis: true,
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
    width: 80,
    minWidth: 60,
    title: '排序',
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
        'dictionary_data',
        'dictionary_edit',
        'dictionary_remove',
      ]);
    },
  },
];

async function request(params: any) {
  const { current, pageSize, searchName } = params;
  const res = await postDictTypePage({
    currentPage: current,
    pageSize,
    name: searchName,
    doSearchTotal: true,
  });
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}

const router = useRouter();

function onAction(key: string, record?: API.DictTypeVo): void {
  switch (key) {
    case ACTION.ADD:
      drawerDictionaryRef.value.open(key);
      break;
    case ACTION.EDIT:
      drawerDictionaryRef.value.open(key, record);
      break;
    case ACTION.REMOVE:
      Modal.confirm({
        title: '删除',
        content: '确定要删除该类型吗？',
        onOk() {
          deleteDictTypeDeleteById({ id: record?.id as string })
            .then((res: API.ResponseDataVoid) => {
              if (res.success) {
                message.success('删除成功');
                getDictionaryData();
              }
            });
        },
      });
      break;
    case ACTION.ADDNEXT:
      router.push({
        name: 'DictionaryItem',
        params: {
          id: `${record?.id}`,
        },
        query: {
          code: `${record?.code}`,
        },
      });
      break;
  }
}

function getDictionaryData() {
  tableRef.value.fetch();
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
      :scroll="{ x: 1040 }"
    >
      <template #toolbar>
        <a-button v-auth="'dictionary_add'" type="primary" @click="onAction(ACTION.ADD)">
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'code'">
          <div class="flex items-center">
            <PubSvgIcon name="icard" class="text-20px" />
            <span class="ml-4px">{{ record.code }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a
              v-auth="'dictionary_data'"
              class="flex items-center"
              @click="onAction(ACTION.ADDNEXT, record)"
            >
              <PubSvgIcon name="zddata" class="text-20px" />
              <span class="ml-4px">{{ ACTION.ADDNEXT }}</span>
            </a>
            <a
              v-auth="'dictionary_edit'"
              class="flex items-center"
              @click="onAction(ACTION.EDIT, record)"
            >
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <a
              v-auth="'dictionary_remove'"
              class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80"
              @click="onAction(ACTION.REMOVE, record)"
            >
              <PubSvgIcon name="remove" class="text-base" />
              <span class="ml-4px">{{ ACTION.REMOVE }}</span>
            </a>
          </a-space>
        </template>
      </template>
    </ProTable>
    <DrawerDictionary
      ref="drawerDictionaryRef"
      @submit="getDictionaryData()"
    />
  </div>
</template>

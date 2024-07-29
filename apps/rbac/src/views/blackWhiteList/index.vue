<script setup lang="tsx">
import { useToggle } from '@vueuse/core';
import { Modal, message } from 'ant-design-vue';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import { ACTION } from './enum';
import DrawerBlackWhiteList from './components/drawerBlackWhiteList.vue';

defineOptions({
  name: 'BlackWhiteList',
});

const route = useRoute();
const isBlacklistMode = ref(route.meta.type === 'black');

// 黑名单0，白名单1
const currentType = computed(() => {
  if (isBlacklistMode.value) {
    return 0; // 黑名单
  }
  else {
    return 1; // 白名单
  }
});

const isblank = computed(() => {
  if (isBlacklistMode.value) {
    return 'blacklist';
  }
  else {
    return 'whitelist';
  }
});

// rights
const addRights = computed(() => `${isblank.value}_add`);
const editRights = computed(() => `${isblank.value}_edit`);
const deleteRights = computed(() => `${isblank.value}_delete`);
const enableRights = computed(() => `${isblank.value}_enable`);
const disableRights = computed(() => `${isblank.value}_disable`);

const { auth } = useAuth();
const tableRef = ref();
const drawerRef = ref();
const statusOptions = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
];
const columns: ProColumns<API.PubBlackWhiteList> = [
  {
    valueType: 'a-input',
    minWidth: 60,
    hideInTable: false,
    title: 'IP地址',
    dataIndex: 'ip',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    minWidth: 200,
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    valueType: 'a-select',
    minWidth: 100,
    title: '状态',
    dataIndex: 'enable',
    fieldProps: {
      placeholder: '请选择',
      allowClear: true,
      options: statusOptions,
    },
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    hideInTable() {
      return !auth([
        addRights.value,
        editRights.value,
        deleteRights.value,
        enableRights.value,
        disableRights.value,
      ]);
    },
  },
];

async function request(params: any) {
  const { current, pageSize, ip, enable } = params;
  const ps: any = {
    ip,
    pageSize,
    currentPage: current,
    doSearchTotal: true,
    type: currentType.value,
  };
  if (enable !== undefined) {
    // 为1时代表启用，传true, 否则传false
    ps.enable = enable;
  }
  const res = await postBlackWhiteListGetBlackWhiteListPageList(ps);
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

function actionRemove(subKey: string, record?: API.PubBlackWhiteList) {
  Modal.confirm({
    title: '删除',
    content: `确定要删除该条${subKey}数据吗？`,
    async onOk() {
      setLoading(true);
      getBlackWhiteListDeleteById({ id: record?.id as string })
        .then((res: API.ResponseDataBoolean) => {
          if (res.success) {
            message.success('删除成功');
            getListData();
          }
        })
        .finally(() => setLoading(false));
    },
  });
}

function actionDisable(record?: API.PubBlackWhiteList) {
  setLoading(true);
  postBlackWhiteListUpdateBlackWhiteList(
    { id: record?.id, enable: !record?.enable } as any)
    .then((res: API.ResponseDataBoolean) => {
      if (res.success) {
        let msg = '';
        if (!record?.enable) {
          msg = '启用成功！';
        }
        else {
          msg = '停用成功！';
        }
        message.success(msg);
        getListData();
      }
    })
    .finally(() =>
      setLoading(false),
    );
}

function onAction(key: string, record?: API.PubBlackWhiteList): void {
  if (loading.value) {
    return;
  }
  let subKey = '';

  if (isBlacklistMode.value) {
    subKey = '黑名单';
  }
  else {
    subKey = '白名单';
  }

  switch (key) {
    case ACTION.ADD:
      drawerRef.value.open(key + subKey, false);
      break;
    case ACTION.EDIT:
      drawerRef.value.open(key + subKey, true, record);
      break;
    case ACTION.REMOVE:
      actionRemove(subKey, record);
      break;
    case ACTION.ENABLE:
    case ACTION.DISABLE:
      actionDisable(record);
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
    class="page-black-white-list"
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
          v-auth="addRights"
          type="primary"
          @click="onAction(ACTION.ADD)"
        >
          <PlusCircleOutlined />
          {{ ACTION.ADD }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'enable'">
          <div class="flex items-center">
            <i class="status-mark" :class="[{ active: record.enable }]" />
            <span class="ml-4px">{{ record.enable ? '启用' : '停用' }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a
              v-auth="editRights"
              class="flex items-center hover:opacity-80"
              @click="onAction(ACTION.EDIT, record)"
            >
              <PubSvgIcon name="edit" class="text-base" />
              <span class="ml-4px">{{ ACTION.EDIT }}</span>
            </a>
            <a
              v-auth="deleteRights"
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
            <a
              v-if="record.enable"
              v-auth="disableRights"
              flex
              items-center
              class="text-#1D2129"
              hover:cursor-pointer
              hover:opacity-80
              @click="onAction(ACTION.DISABLE, record)"
            >
              <PubSvgIcon name="blacklist-disable" class="text-20px" />
              <span class="ml-4px">{{ ACTION.DISABLE }}</span>
            </a>
            <a
              v-else
              v-auth="enableRights"
              class="flex items-center"
              @click="onAction(ACTION.ENABLE, record)"
            >
              <PubSvgIcon name="blacklist-enable" class="text-20px" />
              <span class="ml-4px">{{ ACTION.ENABLE }}</span>
            </a>
          </a-space>
        </template>
      </template>
    </ProTable>
    <DrawerBlackWhiteList
      ref="drawerRef"
      :type="currentType"
      @submit="getListData()"
    />
  </div>
</template>

<style lang="scss">
.page-black-white-list {
  .ant-card.pro-table {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .status-mark {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    background-color: #aeaeae;
    border-radius: 50%;

    &.active {
      background: #01d689;
    }
  }
}
</style>

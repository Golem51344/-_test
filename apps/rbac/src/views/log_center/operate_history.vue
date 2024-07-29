<script setup lang="tsx">
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import OperateHistoryDetail from './components/operateHistoryDetail.vue';

defineOptions({
  name: 'OperateHistory',
});

const { auth } = useAuth();
const tableRef = ref();
const drawerVisible = ref(false);
const detailData = ref<API.PubOperateLogDto>();

const columns: ProColumns<API.PubOperateLogDto> = [
  {
    valueType: 'a-input',
    hideInTable: true,
    title: '模块标题',
    dataIndex: 'moduleName',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    hideInTable: true,
    title: '操作人姓名 ',
    dataIndex: 'realName',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    hideInTable: true,
    title: '操作人账号 ',
    dataIndex: 'loginName',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    hideInTable: true,
    title: '部门',
    dataIndex: 'orgName',
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-range-picker',
    hideInTable: true,
    title: '操作时间',
    dataIndex: 'operateTime',
    fieldProps: {
      placeholder: ['开始时间', '结束时间'],
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      allowClear: true,
    },
  },
  {
    hideInSearch: true,
    width: 60,
    title: '序号',
    customRender: ({ index }) => index + 1,
  },
  {
    hideInSearch: true,
    title: '模块标题',
    dataIndex: 'moduleName',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    width: 400,
    title: '来源渠道',
    dataIndex: 'requestUri',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作时间',
    dataIndex: 'operateTime',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作人姓名',
    dataIndex: 'realName',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作人账号',
    dataIndex: 'loginName',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作人部门',
    dataIndex: 'orgName',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作状态',
    dataIndex: 'success',
    ellipsis: true,
  },
  {
    hideInSearch: true,
    title: '操作',
    dataIndex: 'action',
    width: 100,
    fixed: 'right',
    hideInTable() {
      return !auth('operate_history_view');
    },
  },
];

onMounted(getListData);

async function request(params: any) {
  const { current, pageSize, moduleName, realName, loginName, orgName, operateTime } = params;
  const ps: any = {
    pageSize,
    currentPage: current,
    doSearchTotal: true,
  };
  if (moduleName) {
    Object.assign(ps, { moduleName });
  }
  if (realName) {
    Object.assign(ps, { realName });
  }
  if (orgName) {
    Object.assign(ps, { orgName });
  }
  if (loginName) {
    Object.assign(ps, { loginName });
  }
  if (operateTime && operateTime.length === 2) {
    Object.assign(ps, {
      operateStartTime: operateTime[0].format('YYYY-MM-DD HH:mm:ss'),
      operateEndTime: operateTime[1].format('YYYY-MM-DD HH:mm:ss'),
    });
  }
  const res: API.ResponseDataPageDataPubOperateLogDto = await postLogOperatePage(ps);
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}

function getListData() {
  tableRef.value.fetch();
}

function showDetailDrawer(record: API.PubOperateLogDto) {
  drawerVisible.value = true;
  detailData.value = record;
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
  >
    <ProTable
      ref="tableRef"
      row-key="id"
      :request="request"
      :columns="columns"
      auto-height
      :scroll="{ x: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'success'">
          <div class="flex items-center">
            <i class="status-mark" :class="[{ active: record.success }]" />
            <span class="ml-4px">{{ record.success ? '正常' : '异常' }}</span>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a
              class="flex items-center"
              @click="() => showDetailDrawer(record)"
            >
              <PubSvgIcon name="view" class="text-20px" />
              <span class="ml-4px">查看</span>
            </a>
          </a-space>
        </template>
      </template>
    </ProTable>
    <OperateHistoryDetail
      :visible="drawerVisible"
      :data="detailData"
      @close="drawerVisible = false"
    />
  </div>
</template>

<style lang="scss" scoped>
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
</style>

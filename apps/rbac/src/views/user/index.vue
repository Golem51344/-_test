<script setup lang="tsx">
import { Badge, Modal, Popover, Space, message } from 'ant-design-vue';
import type { EventDataNode } from 'ant-design-vue/es/tree';
import type { ProColumns } from '@pubinfo/pro-components';
import { ProTable } from '@pubinfo/pro-components';
import type { CurrentOrg, Data, Query } from './interface';
import { ACTION } from './enum';
import UserEdit from './components/UserEdit.vue';
import UserAuthorization from './components/UserAuthorization.vue';

defineOptions({
  name: 'User',
});

const { auth } = useAuth();

const columns: ProColumns<API.PubUserBo> = [
  {
    valueType: 'a-input',
    bind: 'value',
    title: '登录账号',
    dataIndex: 'loginName',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    valueType: 'a-input',
    bind: 'value',
    title: '真实姓名',
    dataIndex: 'realName',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '组织名称',
    dataIndex: 'userOrgList',
    ellipsis: true,
    hideInSearch: true,
    customRender({ text: list }) {
      return (
        <Popover
          placement="topLeft"
          getPopupContainer={() => document.body}
          v-slots={{
            default: () => list?.map((item: API.PubUserOrgBo) => item.orgName).join(','),
            content: () => (
              <Space direction="vertical">
                {list.map((item: API.PubUserOrgBo) => {
                  return <Badge status={item.main ? 'processing' : 'success'} text={item.orgName} />;
                })}
              </Space>
            ),
          }}
        />
      );
    },
  },
  {
    title: '电子邮箱',
    dataIndex: 'email',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    width: 100,
    hideInSearch: true,
    customRender({ text }) {
      return (
        text
          ? <Badge status="success" text="是" />
          : <Badge status="error" text="否" />
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 280,
    hideInSearch: true,
    hideInTable() {
      return !auth([
        'user_reset_password',
        'user_edit',
        'user_remove',
      ]);
    },
  },
];

const currentOrg = ref<CurrentOrg>({});
const currentUser = ref<Data>({});
const query = ref<Query>({});
const tableRef = ref();
async function request(params: any) {
  const { current, pageSize, ...rest } = params;
  const res = await postRbacUserUserPage({
    currentPage: current,
    pageSize,
    orgId: currentOrg.value?.orgId,
    ...query.value,
    ...rest,
  });
  return {
    success: res.success,
    data: res.data?.records ?? [],
    total: res.data?.total ?? 0,
  };
}

function getUserData() {
  tableRef.value.fetch();
}

function onSelect(_: unknown, { node }: { node: EventDataNode & API.PubOrg }) {
  currentOrg.value = {
    orgId: node.id,
    orgName: node.name,
  };
  getUserData();
}

const editRef = ref();
const authorizationRef = ref();
function onAction(key: ACTION, record?: Data) {
  switch (key) {
    case ACTION.ADD:
      editRef.value.open(key);
      break;

    case ACTION.AUTHORIZE:
      if (record) {
        currentUser.value = record;
      }
      if (authorizationRef.value && authorizationRef.value.open) {
        authorizationRef.value.open();
      }
      break;

    case ACTION.EDIT:
      editRef.value.open(key, record);
      break;

    case ACTION.RESET_PASSWORD:
      Modal.confirm({
        title: '重置密码',
        content: '确定要重置该用户密码吗？',
        async onOk() {
          const res = await putRbacUserResetPassword({ userId: record?.id as string });
          if (res.success) {
            message.success('重置密码成功');
          }
        },
      });
      break;

    case ACTION.REMOVE: {
      const hasMultiOrg = record?.userOrgList && record.userOrgList?.length > 1;
      Modal.confirm({
        title: '删除',
        content: `确定要删除该用户吗？${hasMultiOrg ? '该用户存在多个组织下，若只需移除组织，请在编辑中操作。' : ''}`,
        async onOk() {
          const res = await getRbacUserUserDelete({ userId: record?.id as string });
          if (res.success) {
            message.success('删除成功');
            getUserData();
          }
        },
      });
      break;
    }
  }
}
</script>

<template>
  <div
    w-full
    h-full
    py-10px
    px-10px
    overflow-hidden
  >
    <a-row :gutter="[8, 8]" :wrap="false" class="h-full">
      <a-col flex="320px" class="h-full overflow-hidden">
        <OrgTree :select-keys="[query.orgId]" :bordered="false" auth="organization" @select="onSelect" />
      </a-col>

      <a-col flex="auto" class="h-full">
        <ProTable
          ref="tableRef"
          :row-key="(record: any) => `${record.id}-${record.orgId}`"
          :request="request"
          :columns="columns"
          :scroll="{ x: 800 }"
          auto-height
        >
          <template #toolbar>
            <a-button v-auth="'user_add'" type="primary" @click="onAction(ACTION.ADD)">
              <PlusCircleOutlined />
              {{ ACTION.ADD }}
            </a-button>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
              <a-space>
                <a v-auth="'user_authorize'" class="flex items-center" @click="onAction(ACTION.AUTHORIZE, record)">
                  <PubSvgIcon name="authorize" mr-1 text-base />
                  <span>{{ ACTION.AUTHORIZE }}</span>
                </a>
                <a v-auth="'user_reset_password'" class="flex items-center" @click="onAction(ACTION.RESET_PASSWORD, record)">
                  <PubSvgIcon name="i-ci-arrows-reload-01" mr-1 text-base />
                  <span>{{ ACTION.RESET_PASSWORD }}</span>
                </a>
                <a v-auth="'user_edit'" class="flex items-center" @click="onAction(ACTION.EDIT, record)">
                  <PubSvgIcon name="edit" class="mr-1 text-base" />
                  <span>{{ ACTION.EDIT }}</span>
                </a>
                <span v-auth="'user_remove'" class="flex items-center text-red-500 hover:cursor-pointer hover:opacity-80" @click="onAction(ACTION.REMOVE, record)">
                  <PubSvgIcon name="remove" class="mr-1 text-base" />
                  <span>{{ ACTION.REMOVE }}</span>
                </span>
              </a-space>
            </template>
          </template>
        </ProTable>
      </a-col>
    </a-row>

    <UserEdit ref="editRef" :current-org="currentOrg" @submit="getUserData" />
    <UserAuthorization ref="authorizationRef" :user-id="currentUser.id || ''" />
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message, theme } from 'ant-design-vue';
import type { AuthItem, OptionItem } from '../interface';

defineOptions({
  name: 'UserAuthorization',
});

const props = defineProps<{ userId: string }>();

const emit = defineEmits(['submit']);

interface FormData {
  authList: AuthItem[]
}

const { token } = theme.useToken();
const [open, setOpen] = useToggle(false);
const [loading, setLoading] = useToggle(false);

const formRef = ref<FormExpose>();
const form = ref<FormData>({
  authList: [],
});

const roleOptions = ref<API.PubRole[]>([]);
const dataPermissionOptions = ref<API.shujuquanxianshituduixiang[]>([]);

watch(() => props.userId, getAuthData);

// 获取选项数据列表
getOptionData();

function getOptionData() {
  // 数据权限不分页列表
  getRbacPubDataPermissionsDataPermissionList().then((res: API.ResponseDataListshujuquanxianshituduixiang) => {
    if (res.data && res.data.length) {
      dataPermissionOptions.value = res.data;
    }
  });

  // 角色列表
  getRbacRoleRoleList().then((res) => {
    if (res.data && res.data.length) {
      roleOptions.value = res.data;
    }
  });
}

// 获取授权数据
function getAuthData() {
  if (!props.userId) {
    return;
  }

  // 清空之前数据
  form.value.authList = [];

  postRbacPubDataPermissionsGetUserOrgDataPermissionList({ userId: props.userId }).then((res: API.ResponseDatashouquanshujuquanxianduixiang) => {
    if (res.data && res.data.userOrgPermissionBos && res.data.userOrgPermissionBos.length) {
      form.value.authList = res.data.userOrgPermissionBos.map((item) => {
        const { orgId = '', orgName = '', main = false, dataPermissionsList, roleList } = item;
        const o: AuthItem = {
          userId: props.userId,
          orgId,
          orgName,
          main,
        };
        if (dataPermissionsList && dataPermissionsList.length) {
          o.dataPermissionIds = dataPermissionsList.map(dp => dp.dataPermissionId || '');
        }
        if (roleList && roleList.length) {
          o.roleIds = roleList.map(role => role.id || '');
        }
        return o;
      });
    }
  });
}

function onOpen() {
  setOpen(true);
}

function onClose() {
  setOpen(false);
}

function onSubmit() {
  if (!loading) {
    return;
  }

  setLoading(true);

  formRef.value?.validate().then(() => {
    const data: any[] = form.value.authList.map((item) => {
      const { dataPermissionIds = [], roleIds = [], orgId, userId } = item;
      const rIds = roleIds.map((item: OptionItem) => {
        // 在下拉框中选择之后，roleIds每一项的值会变成一个对象
        if (typeof item === 'object' && item.key) {
          return item.key;
        }
        // 若未更改过，其原始值是string，直接返回
        return item;
      });
      const dpIds = dataPermissionIds.map((item: OptionItem) => {
        // 在下拉框中选择之后，dataPermissionIds的值会变成一个对象
        if (typeof item === 'object' && item.key) {
          return item.key;
        }
        // 若未更改过，其原始值是string，直接返回
        return item;
      });
      return {
        orgId,
        userId,
        roleIds: rIds,
        dataPermissionIds: dpIds,
      };
    });

    postRbacUserGrantUserRoleAndDatPermission(data).then(() => {
      setLoading(false);
      message.success('授权成功');
      emit('submit');
      onClose();
    });
  }).catch(() => {});
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    title="授权"
    placement="right"
    :width="520"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
  >
    <a-form
      ref="formRef"
      :model="form"
      :label-col="{ span: 4 }"
    >
      <a-card
        v-for="(item, index) in form.authList"
        :key="index"
        size="small"
        :body-style="{ padding: '16px' }"
        class="auth-card"
      >
        <template #title>
          <div class="flex items-center justify-between">
            <div flex items-center>
              <PubSvgIcon v-if="item.main" name="org-main" class="text-2xl" />
              <PubSvgIcon v-else name="org-unmain" class="text-2xl" />
              <div :style="item.main ? { color: token.colorPrimary, fontWeight: 'bold' } : {}" class="font-normal">
                {{ `组织${index + 1}` }}
              </div>
            </div>
            <div v-if="item.main" :style="{ color: token.colorPrimary, fontWeight: 'bold' }">
              主组织
            </div>
          </div>
        </template>

        <a-form-item label="组织名称" :label-col="{ span: 5 }">
          <span>{{ item.orgName }}</span>
        </a-form-item>

        <a-form-item
          label="角色权限"
          :name="['authList', index, 'roleIds']"
          :label-col="{ span: 5 }"
        >
          <a-select
            v-model:value="item.roleIds"
            label-in-value
            :field-names="{ label: 'name', value: 'id' }"
            :options="roleOptions"
            allow-clear
            mode="multiple"
            placeholder="请选择"
          />
        </a-form-item>

        <a-form-item
          label="数据权限"
          :name="['authList', index, 'dataPermissionIds']"
          :label-col="{ span: 5 }"
        >
          <a-select
            v-model:value="item.dataPermissionIds"
            label-in-value
            :field-names="{ label: 'name', value: 'id' }"
            :options="dataPermissionOptions"
            allow-clear
            mode="multiple"
            placeholder="请选择"
          />
        </a-form-item>
      </a-card>
    </a-form>

    <template #footer>
      <a-space>
        <a-button @click="setOpen(false)">
          取消
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit()">
          提交
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">
.auth-card {
  margin-top: 12px;

  &:first-of-type {
    margin-top: 3px;
  }
}
</style>

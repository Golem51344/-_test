<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { FormExpose } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ACTION, GROUP_TYPE, useOptions } from '../enum';
import { selectOrg, selectUser } from '@/components/OrgUserSelector';

defineOptions({
  name: 'DrawerGroup',
});

const emit = defineEmits(['submit']);

const state = reactive({
  title: '',
  type: '',
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入群组名称', trigger: 'blur' },
    { max: 128, message: '长度不能超过128位', trigger: 'change' }],
  remark: [{ max: 250, message: '长度不能超过250位', trigger: ['blur', 'change'] }],
  viewScope: [{ required: true, message: '请选择使用范围', trigger: ['blur', 'change'] }],
  pubGroupMemberList: [{ required: true, message: '请选择群组成员', trigger: ['blur', 'change'] }],
};

const [open, setOpen] = useToggle(false);
const formRef = ref<FormExpose>();

type Member = API.PubGroupMemberDto;

const form = ref<API.PubGroupBo & { pubGroupMemberList?: Member[] }>({});
const memberList = computed(() => {
  return form.value?.pubGroupMemberList?.map((item) => {
    return {
      ...item,
      name: state.type === GROUP_TYPE.ORG ? item.orgName : item.userName,
    };
  });
});

async function onOpen(key: ACTION, type: string, record?: API.PubGroup) {
  setOpen(true);
  state.title = key;
  state.type = type;
  form.value = {};

  if (key === ACTION.EDIT) {
    const res = await getGroupDetailById({ id: record?.id as string });
    if (res.success) {
      form.value = res?.data ?? {};
    }
  }
}

function chooseMember() {
  if (state.type === GROUP_TYPE.ORG) {
    selectOrg({
      modelValue: form.value.pubGroupMemberList ?? [],
      multiple: true,
      onSubmit(selected = []) {
        form.value.pubGroupMemberList = selected;
      },
    });
  }

  if (state.type === GROUP_TYPE.PER) {
    selectUser({
      modelValue: form.value.pubGroupMemberList ?? [],
      multiple: true,
      onSubmit(selected = []) {
        form.value.pubGroupMemberList = selected;
      },
    });
  }
}

const [loading, setLoading] = useToggle(false);

function onSubmit() {
  formRef.value?.validate().then(() => {
    setLoading(true);
    const { pubGroupMemberList = [], ...rest } = form.value;
    const params: any = {
      ...rest,
      type: state.type,
      pubGroupMemberList: pubGroupMemberList?.map((e) => {
        return {
          orgId: e?.orgId,
          userId: e?.userId,
        };
      }),
    };
    delete params.createTime;
    delete params.updateTime;
    postGroupSaveOrUpdate(params)
      .then((res: API.ResponseData) => {
        if (res.success) {
          message.success(`${state.title}成功！`);
          setOpen(false);
          emit('submit');
        }
      }).finally(() => setLoading(false));
  });
}
function close() {
  setOpen(false);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-drawer
    v-model:open="open"
    :title="`${state.title}${state.type === GROUP_TYPE.ORG ? '组织' : '人员'}群组`"
    placement="right"
    :width="600"
    destroy-on-close
    :footer-style="{ textAlign: 'right' }"
    @close="close"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :label-wrap="true"
    >
      <a-form-item label="群组名称" name="name">
        <a-input v-model:value="form.name" :maxlength="128" />
      </a-form-item>
      <a-form-item label="群组描述" name="remark">
        <a-textarea
          v-model:value="form.remark"
          :maxlength="250"
          show-count
        />
      </a-form-item>
      <a-form-item label="群组使用范围" name="viewScope">
        <a-select v-model:value="form.viewScope" :options="useOptions" placeholder="本部门/本部门及子部门/全部" />
      </a-form-item>
      <a-form-item label="群组成员" name="pubGroupMemberList">
        <a-button type="primary" @click="chooseMember">
          编辑成员
        </a-button>
        <div class="pt-10px">
          <template v-for="item in memberList" :key="item">
            <a-tooltip v-if="item.name && item.name?.length > 20" :title="item.name">
              <span class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
                {{ `${item.name?.slice(0, 20)}...` }}
              </span>
            </a-tooltip>
            <span v-else class="inline-block mb-6px mr-6px bg-[#E8F3FF] rounded-2px px-8px py-3px whitespace-nowrap dark:bg-[#141414]">
              {{ item.name }}
            </span>
          </template>
        </div>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button @click="close">
          取消
        </a-button>
        <a-button type="primary" :loading="loading" @click="onSubmit()">
          提交
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { GROUP_TYPE } from '@/views/group/enum';

defineOptions({
  name: 'GroupSelector',
});

const emit = defineEmits(['select']);

interface IOption {
  label: string
  value: string
  name: string
  id: string
};

const currentTab = ref('OrgGroup');
const isOrgMode = computed(() => currentTab.value === 'OrgGroup');
const orgGroupList = ref<IOption[]>([]);
const userGroupList = ref<IOption[]>([]);
const selectedOrgGroups = ref<string[]>([]);
const selectedUserGroups = ref<string[]>([]);
const selectedData = computed(() => {
  const list = isOrgMode.value ? orgGroupList : userGroupList;
  const selectedKeys = isOrgMode.value ? selectedOrgGroups : selectedUserGroups;
  return list.value.filter(item => selectedKeys.value.includes(item.value));
});

const open = defineModel<boolean>('open');
const setOpen = useToggle(open);

getData();

function getData() {
  getGroupsData(GROUP_TYPE.ORG);
  getGroupsData(GROUP_TYPE.PER);
}

function getGroupsData(type: GROUP_TYPE.ORG | GROUP_TYPE.PER) {
  postGroupList({ type }).then((res) => {
    if (res && res.data && res.data.length) {
      const list = res.data.map((item) => {
        const { name = '', id = '' } = item;
        const shortName = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        return {
          label: shortName,
          value: id,
          name,
          id,
        };
      });

      if (type === GROUP_TYPE.ORG) {
        orgGroupList.value = list;
      }
      else {
        userGroupList.value = list;
      }
    }
  });
}

function onOpen(selectedGroups: IOption[]) {
  if (selectedGroups && selectedGroups.length) {
    const groups = selectedGroups.map((item) => {
      return item.value;
    });
    if (isOrgMode.value) {
      selectedOrgGroups.value = groups;
    }
    else {
      selectedUserGroups.value = groups;
    }
  }
  else {
    selectedOrgGroups.value = [];
    selectedUserGroups.value = [];
  }
  setOpen(true);
}

function onClearAll() {
  isOrgMode.value ? clearOrgGroups() : clearUserGroups();
}

function clearOrgGroups() {
  selectedOrgGroups.value = [];
}

function clearUserGroups() {
  selectedUserGroups.value = [];
}

function onRemoveGroup(value: string) {
  const selectedKeys = isOrgMode.value ? selectedOrgGroups : selectedUserGroups;
  const index = selectedKeys.value.findIndex(item => item === value);
  if (index !== -1) {
    selectedKeys.value.splice(index, 1);
  }
}

function notifySelect() {
  emit('select', selectedData.value);
  setOpen(false);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-modal
    v-model:open="open"
    class="group-modal"
    title="编辑群组"
    :mask-closable="false"
    :width="750"
    :z-index="4000"
  >
    <div class="h-340px border-1px border-solid flex flex-row border_color">
      <div class="w-360px">
        <a-tabs v-model:activeKey="currentTab" class="h-full overflow-hidden">
          <a-tab-pane key="OrgGroup" tab="组织群组">
            <a-checkbox-group v-model:value="selectedOrgGroups" :options="orgGroupList" />
          </a-tab-pane>
          <a-tab-pane key="UserGroup" tab="用户群组" force-render>
            <a-checkbox-group v-model:value="selectedUserGroups" :options="userGroupList" />
          </a-tab-pane>
        </a-tabs>
      </div>

      <div class="flex-1 flex flex-col border-solid border-0px border-l-1px border_color">
        <div class="w-full h-38px bg-[rgb(245,245,245)] flex px-15px items-center justify-between text-[#1D2129] dark:bg-[#000] dark:text-[#F2F3F5]">
          <div class="">
            已选群组
          </div>
          <div class="cursor-pointer text-[#165DFF]" @click="onClearAll">
            清空
          </div>
        </div>
        <div class="flex-1 p-10px overflow-auto">
          <div v-for="item in selectedData" :key="item.value" class="inline-block mb-6px max-w-300px">
            <a-tooltip v-if="item.name && item.name.length > 20" :title="item.name">
              <a-tag class="custom_tag bg-[#e8f3ff] dark:bg-[#141414]" closable @close="onRemoveGroup(item.value)">
                {{ item.label }}
              </a-tag>
            </a-tooltip>
            <a-tag
              v-else
              class="custom_tag bg-[#e8f3ff] dark:bg-[#141414]"
              closable
              @close="onRemoveGroup(item.value)"
            >
              {{ item.label }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <a-button @click="setOpen(false)">
        取消
      </a-button>
      <a-button type="primary" @click="notifySelect">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss">
.group-modal {
  .ant-tabs-content-holder {
    padding: 0 16px 8px;
    overflow: auto;
  }
  .ant-tabs-nav:before {
    display: none;
  }
  .ant-tabs-nav-wrap {
    height: 38px;
    background: rgba(245, 245, 245);
  }
  .ant-tabs-tab {
    padding: 0 12px;
    margin: 0;

    & + .ant-tabs-tab {
      margin-left: 0 !important;
    }
  }
  .ant-tabs-tab-active {
    background: white;
  }
  .ant-checkbox-group {
    display: block;
  }
  .ant-checkbox-wrapper {
    display: flex;
    margin-bottom: 8px;
  }
  .ant-tabs-ink-bar {
    display: none;
  }
}
.dark .group-modal {
  .ant-tabs-nav-wrap {
    color: #f2f3f5;
    background: #000;
  }
  .ant-tabs-tab-active {
    background: rgb(20, 20, 20);
  }
}
</style>

<style lang='scss' scoped>
.group-modal {
  :deep(.ant-modal-content) {
    padding: 0px;
    border-radius: 0px;
    border-radius: 0px;
  }
  :deep(.ant-modal-header) {
    padding: 12px 16px;
    margin-bottom: 0px;
    border-bottom: 1px solid #e5e6eb;
  }
  :deep(.ant-modal-title) {
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
  }
  :deep(.ant-modal-body) {
    padding: 16px;
  }
  :deep(.ant-modal-footer) {
    padding: 16px;
    border-top: 1px solid #e5e6eb;
    .ant-btn {
      border-radius: 2px;
    }
  }
}

:deep(.ant-tree-checkbox) {
  margin-block-start: 0px;
  margin-inline-end: 2px;
}
:deep(.ant-tree-checkbox + span .ant-tree-iconEle) {
  margin-right: 4px;
}

.custom_tag {
  padding: 3px 8px;
  border-width: 0px;
  border-radius: 2px;
  :deep(.ant-tag-close-icon) {
    color: rgba(22, 93, 255, 0.6);
    &:hover {
      color: #165dff;
    }
  }
}

.border_color {
  border-color: #e5e6eb;
}
[data-theme="dark"] {
  .border_color {
    border-color: rgba(253, 253, 253, 0.12);
  }
}
.border_c {
  border: 1px dashed #ccc;
  border-radius: 10px;
}
:deep(.ant-dropdown-link) {
  padding: 4px 6px;
  font-size: 12px;
  border-radius: 2px;
  transform: scale(0.7);
}
</style>

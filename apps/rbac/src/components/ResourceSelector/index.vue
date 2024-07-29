<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { EventDataNode, TreeProps } from 'ant-design-vue/es/tree';
import type { CheckInfo } from 'ant-design-vue/es/vc-tree/props';
import type { Key } from 'ant-design-vue/es/vc-tree/interface.d';
import { Form } from 'ant-design-vue';
import type { ResourceMode } from './enum';
import { RESOURCE_MODE } from './enum';

defineOptions({
  name: 'ResourceSelector',
});

const props = withDefaults(defineProps<{
  title?: string
  mode?: ResourceMode
}>(), {
  title: '资源选择',
  mode: RESOURCE_MODE.ROLE,
});

const emit = defineEmits(['select']);

const isDataPermissionMode = computed(() => props.mode === RESOURCE_MODE.DATA_PERMISSION);

interface StringMap<T> { [key: string]: T };

type TreeNode = API.PubResource & {
  children?: TreeNode[]
};
interface ReInfo {
  id: string
  name: string
}
interface CheckedKeys {
  checked: Key[]
  halfChecked: Key[]
}
const checkedKeys: Ref<CheckedKeys> = ref({ checked: [], halfChecked: [] });
const expandedKeys = ref<string[]>([]);
const rightItems: Ref<ReInfo[]> = ref([]);
const resourceMap: Ref<StringMap<string>> = ref({});
const resourceCount: Ref<number> = ref(0);
const treeData = ref<TreeProps['treeData'] & TreeNode[]>([]);

const open = defineModel<boolean>('open');

const setOpen = useToggle(open);

watch(() => checkedKeys.value.checked, (val) => {
  rightItems.value = val.reduce((acc: ReInfo[], item) => {
    const temp = {
      id: item as string,
      name: resourceMap.value[item],
    };
    acc.push(temp);
    return acc;
  }, []);
}, { deep: true });

function onOpen(ids: Key[], tree: any[], resMap: StringMap<string>) {
  checkedKeys.value.checked = [...ids];
  treeData.value = tree;
  resourceMap.value = resMap;
  resourceCount.value = Object.keys(resourceMap.value).length;

  // 默认展开第一级
  if (tree[0]?.id) {
    expandedKeys.value = [tree[0]?.id];
  }
  setOpen(true);
}

function onCheck(node: Key[] | CheckedKeys, e: CheckInfo) {
  // 数据权限模式时, 采用check-strictly=true时的默认值，即：只勾选/反选被点击的节点
  if (isDataPermissionMode.value) {
    return;
  }

  /*
    角色模式时：
    1.勾选：勾选节点时，同时勾选其所有祖先节点；
    2.反选：反选节点时，同时反选其所有子节点，不动祖先节点。
  */
  if (e.checked) {
    function getParents(obj: any) {
      if (obj.parent) {
        checkedKeys.value.checked.push(obj.key);
        getParents(obj.parent);
      }
      else {
        checkedKeys.value.checked.push(obj.key);
      }
    }
    getParents(e.node);
  }
  else {
    const childKeys = getAllDescendantIds([e.node], e.node.id);
    childKeys.forEach((delkey) => {
      const index = checkedKeys.value.checked.findIndex(item => item === delkey);
      if (index >= 0) {
        checkedKeys.value.checked.splice(index, 1);
      }
    });
  }
  checkedKeys.value.checked = Array.from(new Set(checkedKeys.value.checked));
}

function clearAllChecked() {
  checkedKeys.value.checked = [];
}

function handleCloseTag(removedTagId: string) {
  const allDeleteIds = getAllDescendantIds(treeData.value, removedTagId);
  allDeleteIds.forEach((delkey) => {
    const index = checkedKeys.value.checked.findIndex(item => item === delkey);
    if (index >= 0) {
      checkedKeys.value.checked.splice(index, 1);
    }
  });
}

/** 获取该节点信息 */
function getNodeById(nodes: any, id: string): TreeNode | undefined {
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

/** 获取该节点下所有子节点的ID（包括该节点） */
function getAllDescendantIds(nodes: any, targetNodeId: string): string[] {
  const result: string[] = [];
  const targetNode = getNodeById(nodes, targetNodeId);
  if (targetNode) {
    function dfs(node: TreeNode): void {
      result.push(node.id as string);
      if (node.children) {
        for (const child of node.children) {
          dfs(child);
        }
      }
    }

    dfs(targetNode);
  }

  return result;
}

function checkAllChildren(record: EventDataNode) {
  const data: string[] = getAllChildren(record.id);
  // 如果有子节点需要选中，那么当前节点一定选中
  if (data.length > 0) {
    data.push(record.id);
    data.forEach((item) => {
      const itemIndex = checkedKeys.value.checked.findIndex(ckey => ckey === item);
      if (itemIndex < 0) {
        checkedKeys.value.checked.push(item);
      }
    });
  }
}

function clearAllChildren(record: EventDataNode) {
  const data: string[] = getAllChildren(record.id);
  data.forEach((item) => {
    const itemIndex = checkedKeys.value.checked.findIndex(ckey => ckey === item);
    if (itemIndex >= 0) {
      checkedKeys.value.checked.splice(itemIndex, 1);
    }
  });
}

function checkNextChildren(record: EventDataNode) {
  const data: string[] = getNextChildren(record.id);
  // 如果有子节点需要选中，那么当前节点一定选中
  if (data.length > 0) {
    data.push(record.id);
    data.forEach((item) => {
      const itemIndex = checkedKeys.value.checked.findIndex(ckey => ckey === item);
      if (itemIndex < 0) {
        checkedKeys.value.checked.push(item);
      }
    });
  }
}

function clearNextChildren(record: EventDataNode) {
  const data: string[] = getNextChildren(record.id);
  data.forEach((item) => {
    const itemIndex = checkedKeys.value.checked.findIndex(ckey => ckey === item);
    if (itemIndex >= 0) {
      checkedKeys.value.checked.splice(itemIndex, 1);
    }
  });
}

function getNextChildren(id: string) {
  const targetNode = getNodeById(treeData.value, id);
  if (targetNode && targetNode.children && targetNode.children.length > 0) {
    return targetNode.children.reduce((acc: string[], item) => {
      // 不勾选禁用的节点
      if (isDataPermissionMode.value && (item as any)?.disabled) {
        return acc;
      }

      acc.push(item.id!);
      return acc;
    }, []);
  }
  else {
    return [];
  }
}

function getAllChildren(id: string) {
  const data: string[] = getAllDescendantIds(treeData.value, id);
  const index = data.indexOf(id);
  data.splice(index, 1);

  // 不勾选禁用的节点
  return data
    ?.map(id => getNodeById(treeData.value, id))
    ?.filter(item => isDataPermissionMode.value ? !(item as any).disabled : true)
    ?.map(item => item!.id as string);
}

const { onFieldChange } = Form.useInjectFormItemContext();
function notifySelect() {
  emit('select', rightItems.value);
  onFieldChange();
  setOpen(false);
}

defineExpose({
  open: onOpen,
});
</script>

<template>
  <a-modal
    v-model:open="open"
    class="custom_modal"
    :title="title"
    :mask-closable="false"
    :width="750"
    :z-index="4000"
  >
    <div class="h-340px border-1px border-solid flex flex-row border_color">
      <div class="w-360px flex flex-col">
        <div class="w-full h-34px bg-[#F2F3F5] flex px-15px items-center justify-between text-[#1D2129] dark:bg-[#1D2129] dark:text-[#F2F3F5]">
          <div class="">
            全部资源
          </div>
          <div>{{ checkedKeys.checked.length }}/{{ resourceCount }}</div>
        </div>
        <div class="flex-1 overflow-auto py-10px pr-10px">
          <a-tree
            v-model:checked-keys="checkedKeys"
            v-model:expanded-keys="expandedKeys"
            class="h-full custom_tree"
            block-node
            checkable
            check-strictly
            :field-names="{ children: 'children', title: 'name', key: 'id' }"
            :tree-data="treeData"
            @check="onCheck"
          >
            <template #title="record">
              <div class="flex items-center">
                <PubSvgIcon v-if="record.checked" name="zy_checked" size="24px" />
                <PubSvgIcon v-else name="zy_default" size="24px" />
                <span class="mx-4px">
                  {{ record.name }}
                </span>
                <!-- "操作"功能显示逻辑：角色模式下非叶子节点时显示； 数据权限模式下非叶子节点 且 数据disabled字段不为true时显示 -->
                <a-dropdown v-if="!record.leaf && (!isDataPermissionMode || !record.disabled)" class="bg-[#e8f3ff] dark:bg-[#141414]" :trigger="['click']">
                  <a class="ant-dropdown-link whitespace-nowrap" style="padding: 2px 4px;" @click.prevent>
                    <span class="text-base">操作</span>
                    <DownOutlined :style="{ fontSize: '10px' }" />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="0">
                        <a @click="checkAllChildren(record)">选中所有下级</a>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <a @click="clearAllChildren(record)">取消所有下级</a>
                      </a-menu-item>
                      <a-menu-item key="3">
                        <a @click="checkNextChildren(record)">选中下一级</a>
                      </a-menu-item>
                      <a-menu-item key="4">
                        <a @click="clearNextChildren(record)">取消下一级</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
          </a-tree>
        </div>
      </div>

      <div class="flex-1 flex flex-col border-solid border-0px border-l-1px border_color">
        <div class="w-full h-34px bg-[#F2F3F5] flex px-15px items-center justify-between text-[#1D2129] dark:bg-[#1D2129] dark:text-[#F2F3F5]">
          <div class="">
            已选资源
          </div>
          <div class="cursor-pointer text-[#165DFF]" @click="clearAllChecked">
            清空
          </div>
        </div>
        <div class="flex-1 p-10px overflow-auto">
          <div v-for="item in rightItems" :key="item.id" class="inline-block mb-6px max-w-300px">
            <a-tooltip v-if="item.name.length > 20" :title="item.name">
              <a-tag class="custom_tag bg-[#e8f3ff] dark:bg-[#141414]" closable @close="handleCloseTag(item.id)">
                {{ `${item.name.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag
              v-else
              class="custom_tag bg-[#e8f3ff] dark:bg-[#141414]"
              closable
              @close="handleCloseTag(item.id)"
            >
              {{ item.name }}
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

<style lang="scss" scoped>
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

<style lang='scss' scoped>
.custom_modal {
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
</style>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { EventDataNode, TreeProps } from 'ant-design-vue/es/tree';

defineOptions({
  name: 'OrgTree',
});

const props = defineProps<{
  auth?: string
}>();

type TreeNode = API.PubOrg & { isLeaf?: boolean, children?: TreeNode[] };

const treeData = ref<TreeProps['treeData'] & TreeNode[]>([]);
const [loading, setLoading] = useToggle(false);

function onLoadData(treeNode?: EventDataNode) {
  return new Promise<void>((resolve, reject) => {
    if (treeNode?.dataRef?.children) {
      resolve();
      return;
    }

    setLoading(true);
    getRbacOrgOrgListByParentId(
      {
        parentId: treeNode?.dataRef?.id, enable: true,
      },
      {
        headers: { 'X-ResourceMark': props.auth },
      })
      .then((res) => {
        if (res.success) {
          const data = res?.data?.map(formatTreeNode) ?? [];
          if (treeNode?.dataRef) {
            treeNode.dataRef.children = data;
          }
          else {
            treeData.value = data;
          }
        }
        treeData.value = [...treeData.value];
        resolve();
      })
      .catch(reject)
      .finally(() => setLoading(false));
  });
}

function formatTreeNode(data: API.PubOrg) {
  return {
    key: data.id!,
    isLeaf: data.leaf,
    ...data,
  };
}

onMounted(() => {
  onLoadData();
});
</script>

<template>
  <a-card :body-style="{ padding: '16px' }" class="w-full h-full overflow-y-auto overflow-x-hidden">
    <a-spin :spinning="loading">
      <a-empty v-if="treeData.length === 0" />
      <a-tree
        v-else
        v-bind="$attrs"
        block-node
        :load-data="onLoadData"
        :tree-data="treeData"
        :field-names="{ children: 'children', title: 'name', key: 'id' }"
      >
        <template #title="node">
          <div class="flex w-full items-center overflow-hidden">
            <span :title="node.name" class="truncate">{{ node.name }}</span>
          </div>
        </template>
      </a-tree>
    </a-spin>
  </a-card>
</template>

<style scoped>
:deep(.ant-tree .ant-tree-node-content-wrapper) {
  overflow: hidden;
}
</style>

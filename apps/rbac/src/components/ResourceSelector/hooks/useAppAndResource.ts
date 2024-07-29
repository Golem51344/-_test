import type { ResourceMode } from '../enum';
import { RESOURCE_MODE } from '../enum';

export type TreeNode = API.PubResource & {
  children?: TreeNode[]
  disabled?: boolean
};
export interface StringMap<T> { [key: string]: T };

export interface SelectedResourceInfo {
  id: string
  name: string
}

export default function useAppAndResource(mode?: ResourceMode) {
  const resourceModelRef = ref();
  const appList: Ref<API.PubResource[] | { label: string | undefined, value: string | undefined }[]> = ref([]);
  const treeData: Ref<TreeNode[]> = ref([]);
  const resourceMap: Ref<StringMap<string>> = ref({});
  const selectedResources = ref<SelectedResourceInfo[]>([]);
  const isDataPermissionMode = computed(() => mode === RESOURCE_MODE.DATA_PERMISSION);

  function getAppList() {
    getRbacResourceAppList().then((res) => {
      if (res?.success) {
        const data = res.data ?? [];
        const list: { label: string | undefined, value: string | undefined }[] = data.map((item: API.PubResource) => {
          return { label: item.name, value: item.id };
        });
        appList.value = list;
      }
    });
  }

  async function updateTreeDataAndResourceMap(appId: string) {
    const treeRes = await getRbacResourceGroupResourceTree({ appId });
    treeData.value = treeRes?.data ?? [];
    markDisabledNodesAndGenerateMap(treeData.value);
  }

  function markDisabledNodesAndGenerateMap(nodes: TreeNode[]) {
    nodes.forEach((node) => {
      if (node.id) {
        resourceMap.value[node.id] = node.name!;
      }

      if (isDataPermissionMode.value && node.enableDataPermission === false) {
        // 未开启数据权限的节点标记为不可选
        node.disabled = true;
      }

      if (node.children && node.children.length) {
        markDisabledNodesAndGenerateMap(node.children);
      }
    });
  }

  function setSelectedResources(resources: SelectedResourceInfo[]) {
    selectedResources.value = resources;
  };

  function updateSelectedResources(resourceIds: string[]) {
    if (!resourceIds.length || !Object.keys(resourceMap.value).length) {
      return [];
    }
    selectedResources.value = resourceIds.map((id) => {
      return { id, name: resourceMap.value[id] };
    }).filter(item => item.name);
  };

  function clearSelectedResources() {
    selectedResources.value = [];
  }

  function openResourceModel(resourceIds: string[]) {
    if (resourceModelRef.value && resourceModelRef.value.open) {
      resourceModelRef.value.open(resourceIds, treeData.value, resourceMap.value);
    }
  }

  return {
    appList,
    resourceModelRef,
    treeData,
    resourceMap,
    selectedResources,
    isDataPermissionMode,
    getAppList,
    updateTreeDataAndResourceMap,
    setSelectedResources,
    updateSelectedResources,
    clearSelectedResources,
    openResourceModel,
  };
}

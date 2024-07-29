export enum ACTION {
  /** 新增 */
  ADD = '新增',
  /** 编辑 */
  EDIT = '编辑',
  /** 删除 */
  REMOVE = '删除',
}

export enum GROUP_USE_TYPE {
  OWNER = '1',
  PARENT = '2',
  ALL = '3',
}

export const useOptions = [
  { label: '本部门', value: GROUP_USE_TYPE.OWNER },
  { label: '本部门及子部门', value: GROUP_USE_TYPE.PARENT },
  { label: '全部', value: GROUP_USE_TYPE.ALL },
];

export enum GROUP_TYPE {
  ORG = '1',
  PER = '2',
}

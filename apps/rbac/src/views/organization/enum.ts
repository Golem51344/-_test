export enum ACTION {
  ADD = '新增',
  ADDNEXT = '新增下级',
  /** 详情 */
  EDIT = '编辑',
  /** 删除 */
  REMOVE = '删除',
}

export enum RESOURCE_TYPE {
  OWNER = '1',
  ALL = '2',
}
export enum ENABLE_TYPE {
  ON = 1,
  OFF = 0,
}
export const kjOptions = [
  { label: '仅自己', value: RESOURCE_TYPE.OWNER },
  { label: '全部可见', value: RESOURCE_TYPE.ALL },
];
export const enableOptons = [
  { label: '正常', value: ENABLE_TYPE.ON },
  { label: '关闭', value: ENABLE_TYPE.OFF },
];

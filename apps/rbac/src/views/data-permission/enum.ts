export enum ACTION {
  ADD = '新增',
  EDIT = '编辑',
  VIEW = '查看',
  REMOVE = '删除',
}

/** 数据权限类型 */
export enum DATA_PERMISSION_TYPE {
  /* 查看全部 */
  ALL = '1',
  /* 仅看自己 */
  ONLY_SELF = '2',
  /* 仅看所在部门 */
  SELF_DEPT_ONLY = '3',
  /* 仅看所在部门及子部门 */
  SELF_DEPT_AND_SUB = '4',
  /* 仅自选部门 */
  CUSTOM_DEPT_ONLY = '5',
  /* 自选部门及子部门 */
  CUSTOM_DEPT_AND_SUB = '6',
  /* 指定群组 */
  CUSTOM_GROUP = '7',
}

export type dataPermissionType = DATA_PERMISSION_TYPE.ALL |
  DATA_PERMISSION_TYPE.ONLY_SELF |
  DATA_PERMISSION_TYPE.SELF_DEPT_ONLY |
  DATA_PERMISSION_TYPE.SELF_DEPT_AND_SUB |
  DATA_PERMISSION_TYPE.CUSTOM_DEPT_AND_SUB |
  DATA_PERMISSION_TYPE.CUSTOM_DEPT_ONLY |
  DATA_PERMISSION_TYPE.CUSTOM_GROUP;

export const dataPermissionTypeLabel = {
  [DATA_PERMISSION_TYPE.ALL]: '查看全部',
  [DATA_PERMISSION_TYPE.ONLY_SELF]: '仅看自己',
  [DATA_PERMISSION_TYPE.SELF_DEPT_ONLY]: '仅看所在部门',
  [DATA_PERMISSION_TYPE.SELF_DEPT_AND_SUB]: '仅看所在部门及子部门',
  [DATA_PERMISSION_TYPE.CUSTOM_DEPT_AND_SUB]: '自选部门及子部门',
  [DATA_PERMISSION_TYPE.CUSTOM_DEPT_ONLY]: '仅自选部门',
  [DATA_PERMISSION_TYPE.CUSTOM_GROUP]: '指定群组',
};

export const dataPermissionOptions = [
  { label: '查看全部', value: DATA_PERMISSION_TYPE.ALL },
  { label: '仅看自己', value: DATA_PERMISSION_TYPE.ONLY_SELF },
  { label: '仅看所在部门', value: DATA_PERMISSION_TYPE.SELF_DEPT_ONLY },
  { label: '仅看所在部门及子部门', value: DATA_PERMISSION_TYPE.SELF_DEPT_AND_SUB },
];

export const dataPermissionOptionsAll = [
  { label: '查看全部', value: DATA_PERMISSION_TYPE.ALL },
  { label: '仅看自己', value: DATA_PERMISSION_TYPE.ONLY_SELF },
  { label: '仅看所在部门', value: DATA_PERMISSION_TYPE.SELF_DEPT_ONLY },
  { label: '仅看所在部门及子部门', value: DATA_PERMISSION_TYPE.SELF_DEPT_AND_SUB },
  { label: '自选部门及子部门', value: DATA_PERMISSION_TYPE.CUSTOM_DEPT_AND_SUB },
  { label: '仅自选部门', value: DATA_PERMISSION_TYPE.CUSTOM_DEPT_ONLY },
  { label: '指定群组', value: DATA_PERMISSION_TYPE.CUSTOM_GROUP },
];

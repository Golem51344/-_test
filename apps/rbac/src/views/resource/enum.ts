/** 操作按钮 */
export enum ACTION {
  /** 分配查看 */
  ROLE_RELATION = '分配查看',
  /** 新建 */
  ADD = '新建',
  /** 新建下级 */
  ADD_CHILD = '新建下级',
  /** 修改 */
  EDIT = '修改',
  /** 删除 */
  REMOVE = '删除',
}

/** 资源类型 */
export enum RESOURCE_TYPE {
  /** 应用 */
  APP = '1',
  /** 目录 */
  INDEX = '2',
  /** 菜单 */
  MENU = '3',
  /** 按钮 */
  BUTTON = '4',
  /** 非菜单页 */
  NON_MENU = '5',
}

export const resourceOptions = [
  { label: '应用', value: RESOURCE_TYPE.APP },
  { label: '目录', value: RESOURCE_TYPE.INDEX },
  { label: '菜单', value: RESOURCE_TYPE.MENU },
  { label: '按钮', value: RESOURCE_TYPE.BUTTON },
  { label: '非菜单页', value: RESOURCE_TYPE.NON_MENU },
];

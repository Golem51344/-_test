export enum ACTION {
  /** 新增 */
  ADD = '新增',
  /** 编辑 */
  EDIT = '编辑',
  /** 删除 */
  REMOVE = '删除',
  /** 新建下级 */
  ADDNEXT = '新建下级',
}

export enum RANGE {
  /** 省 */
  PROVINCE = '1',
  /** 市 */
  CITY = '2',
  /** 区/县 */
  COUNTY = '3',
}
export const rangeOptions = [
  { label: '省', value: RANGE.PROVINCE },
  { label: '市', value: RANGE.CITY },
  { label: '区/县', value: RANGE.COUNTY },
];

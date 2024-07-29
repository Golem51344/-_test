/* eslint-disable */
// @ts-nocheck
declare namespace API {
  interface AddOrEditStyleConfigDto {
    /** 样式内容 */
    content: string;
  }

  interface AddOrUpdateConfigurationItemDTO {
    /** 配置项内容json */
    content: string;
  }

  interface BlackWhiteListAddDto {
    /** ip地址 */
    ip: string;
    /** 描述 */
    description?: string;
    /** true未启用 false启用 */
    enable: boolean;
    /** 0:黑名单 1白名单 */
    type: string;
  }

  interface BlackWhiteListQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** ip地址 */
    ip?: string;
    /** 类型 */
    type?: string;
    /** 启用或停用 */
    enable?: boolean;
  }

  interface BlackWhiteListUpdateDto {
    /** ip地址 */
    ip: string;
    /** 描述 */
    description?: string;
    /** true未启用 false启用 */
    enable: boolean;
    /** 0:黑名单 1白名单 */
    type: string;
    /** id */
    id: string;
  }

  interface deleteDictItemDeleteByIdParams {
    /** 字典项id */
    id: string;
  }

  interface deleteDictTypeDeleteByIdParams {
    /** 字典类型id */
    id: string;
  }

  interface DictItemBatchVo {
    /** 字典类型 */
    dictCode?: string;
    /** 批量字典项 */
    dictItemList?: DictItemVo[];
  }

  interface DictItemQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 字典类型编码 */
    code: string;
    /** 字典项名称 */
    dictLabel?: string;
  }

  interface DictItemSaveDto {
    /** 主键 */
    id?: string;
    /** 字典类型编码 */
    code: string;
    /** 字典项值 */
    dictLabel: string;
    /** 字典项值 */
    dictValue: string;
    /** 描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
  }

  interface DictItemVo {
    /** 主键 */
    id?: string;
    /** 字典类型编码 */
    code?: string;
    /** 字典项标签名 */
    dictLabel?: string;
    /** 字典项值 */
    dictValue?: string;
    /** 描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface DictTypeQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 名称或编码 */
    name?: string;
  }

  interface DictTypeSaveDto {
    /** 主键,新增时不填 */
    id?: string;
    /** 名称 */
    name: string;
    /** 字典类型编码 */
    code: string;
    /** 描述 */
    description?: string;
    /** 排序 */
    sort?: number;
  }

  interface DictTypeVo {
    /** 主键,新增时不填 */
    id?: string;
    /** 名称 */
    name?: string;
    /** 字典类型编码 */
    code?: string;
    /** 描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface EditSysSecurityConfigDto {
    /** 配置内容 */
    content: string;
  }

  interface getBlackWhiteListDeleteByIdParams {
    /** 黑白名单id */
    id: string;
  }

  interface getBlackWhiteListGetBlackWhiteListByIdParams {
    /** 黑白名单id */
    id: string;
  }

  interface getDictItemListBatchParams {
    /** 字典类型编码,用逗号分隔 */
    dictCode: string;
  }

  interface getDictItemListParams {
    /** 字典类型编码 */
    dictCode: string;
  }

  interface getSysconfigDownLoadImageStreamByCodeParams {
    code: string;
  }

  interface IPagePubBlackWhiteList {
    size?: number;
    total?: number;
    current?: number;
    pages?: number;
    records?: PubBlackWhiteList[];
  }

  interface PageDataDictItemVo {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: DictItemVo[];
    total?: number;
  }

  interface PageDataDictTypeVo {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: DictTypeVo[];
    total?: number;
  }

  interface postSysconfigAddOrUpdateBackgroundImageParams {
    /** 图片色调，1：亮色，2：暗色 */
    imageType: string;
  }

  interface postSysconfigAddOrUpdateBackgroundSmallImageParams {
    /** 图片色调，1：亮色，2：暗色 */
    imageType: string;
  }

  interface PubBlackWhiteList {
    /** id */
    id?: string;
    /** ip地址 */
    ip?: string;
    /** 描述 */
    description?: string;
    /** 0：黑名单 1：白名单 */
    type?: string;
    /** 排序 */
    sort?: number;
    /** false:未启用 true启用 */
    enable?: boolean;
    /** 删除标识, false:未删除, true删除 */
    deleted?: boolean;
    /** 更新用户id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 创建用户id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
  }

  interface PubSysConfig {
    /** id */
    id?: string;
    /** 配置名称 */
    name?: string;
    /** 配置编码 */
    code?: string;
    /** 配置内容 */
    content?: string;
    /** 0-系统内置，1-用户定义 */
    type?: string;
    /** 排序 */
    sort?: number;
    /** 备注 */
    remark?: string;
    /** 删除标识, false-未删除, true-删除 */
    deleted?: boolean;
    /** 创建用户id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新用户id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface ResponseDataBoolean {
    code?: number;
    msg?: string;
    hint?: string;
    data?: boolean;
    success?: boolean;
  }

  interface ResponseDataIPagePubBlackWhiteList {
    code?: number;
    msg?: string;
    hint?: string;
    data?: IPagePubBlackWhiteList;
    success?: boolean;
  }

  interface ResponseDataListDictItemBatchVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: DictItemBatchVo[];
    success?: boolean;
  }

  interface ResponseDataListDictItemVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: DictItemVo[];
    success?: boolean;
  }

  interface ResponseDataPageDataDictItemVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataDictItemVo;
    success?: boolean;
  }

  interface ResponseDataPageDataDictTypeVo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataDictTypeVo;
    success?: boolean;
  }

  interface ResponseDataPubBlackWhiteList {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubBlackWhiteList;
    success?: boolean;
  }

  interface ResponseDataPubSysConfig {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubSysConfig;
    success?: boolean;
  }

  interface ResponseDataString {
    code?: number;
    msg?: string;
    hint?: string;
    data?: string;
    success?: boolean;
  }

  interface ResponseDataVoid {
    code?: number;
    msg?: string;
    hint?: string;
    data?: Record<string, any>;
    success?: boolean;
  }
}

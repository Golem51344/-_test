/* eslint-disable */
// @ts-nocheck
declare namespace API {
  interface deleteGroupDeleteByIdParams {
    id: string;
  }

  interface getGroupDetailByIdParams {
    id: string;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
  }

  interface getNoticeDeleteNoticeParams {
    /** 公告服务id */
    id: string;
  }

  interface getNoticeDeleteNoticeSendParams {
    /** 公告服务推送id */
    id: string;
  }

  interface getNoticeDetailNoticeParams {
    /** 公告服务id */
    id: string;
  }

  interface getRegionDeleteRegionByCodeParams {
    code: string;
  }

  interface getRegionGetListByParentIdParams {
    /** 父级id */
    parentId?: string;
  }

  interface getRegionGetRegionDetailByCodeParams {
    code: string;
  }

  interface PageDataPubGroup {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubGroup[];
    total?: number;
  }

  interface PageDataPubNotice {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubNotice[];
    total?: number;
  }

  interface PubGroup {
    /** 主键 */
    id?: string;
    /** 群组名称 */
    name?: string;
    /** 群组类型：1=组织，2=人员 */
    type?: string;
    /** 可见范围: 1、本部门 2、本部门及子部门 3、全部 */
    viewScope?: string;
    /** 备注 */
    remark?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建组织id */
    createdOrgId?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 更新人姓名 */
    updatedUserName?: string;
    /** 创建人姓名 */
    createUserName?: string;
  }

  interface PubGroupBo {
    /** 主键 */
    id?: string;
    /** 群组名称 */
    name?: string;
    /** 群组类型：1=组织，2=人员 */
    type?: string;
    /** 可见范围: 1、本部门 2、本部门及子部门 3、全部 */
    viewScope?: string;
    /** 备注 */
    remark?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建组织id */
    createdOrgId?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 更新人姓名 */
    updatedUserName?: string;
    /** 创建人姓名 */
    createUserName?: string;
    /** 群组成员信息 */
    pubGroupMemberList?: PubGroupMemberDto[];
  }

  interface pubGroupDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 群组名称 */
    name?: string;
    /** 群组类型：1=组织，2=人员 */
    type?: string;
  }

  interface PubGroupListDto {
    /** 群组名称 */
    name?: string;
    /** 群组类型：1=组织，2=人员 */
    type?: string;
  }

  interface PubGroupMemberDto {
    /** 主键 */
    id?: string;
    /** 群组id */
    groupId?: string;
    /** 创建人id */
    createdBy?: string;
    /** 用户id */
    userId?: string;
    /** 用户姓名 */
    userName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 组织全名称 */
    fullOrgName?: string;
  }

  interface PubNotice {
    /** id */
    id?: string;
    /** 标题 */
    title?: string;
    /** 公告类型, 1-通知 2-公告 3-升级 */
    type?: string;
    /** 内容 */
    content?: string;
    /** 置顶标识, 0-未置顶,1-置顶 */
    top?: boolean;
    /** 附件地址，多个逗号隔开 */
    url?: string;
    /** 阅读量 */
    reviewCount?: number;
    /** 状态,0-草稿,1-发布,2-下线 */
    status?: string;
    deleted?: boolean;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubNoticeDto {
    /** id */
    id?: string;
    /** 标题 */
    title?: string;
    /** 公告类型, 1-通知 2-公告 3-升级 */
    type?: string;
    /** 内容 */
    content?: string;
    /** 置顶标识, 0-未置顶,1-置顶 */
    top?: boolean;
    /** 附件地址，多个逗号隔开 */
    url?: string;
    /** 阅读量 */
    reviewCount?: number;
    /** 状态,0-草稿,1-发布,2-下线 */
    status?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubNoticePageDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** id */
    id?: string;
    /** 标题 */
    title?: string;
    /** 公告类型, 1-通知 2-公告 3-升级 */
    type?: string;
    /** 内容 */
    content?: string;
    /** 状态,0-草稿,1-发布,2-下线 */
    status?: string;
  }

  interface PubNoticeSendDto {
    /** id */
    id?: string;
    /** 公告id */
    noticeId?: number;
    /** 接收对象类型 1-组织,2-个人 */
    objectType?: string;
    /** 接收组织，逗号分隔 */
    orgIds?: string;
    /** 接收人-逗号分隔 */
    userIds?: string;
    /** 接收方式（站内、钉钉、email等） */
    channel?: string;
    /** 发送时间 */
    sendTime?: number;
    /** 发送状态（0：等待发送，1：发送成功，2：发送失败） */
    sendState?: string;
    /** 备注 */
    remark?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubRegion {
    /** id */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 祖籍id */
    idPath?: string;
    /** 行政区名称 */
    name?: string;
    /** 行政区编码 */
    code?: string;
    /** 区域类型 */
    type?: string;
    /** 区域编码 */
    regionCode?: string;
    /** 排序 */
    sort?: number;
    /** 删除标识, 0-未删除, 1-删除 */
    deleted?: boolean;
    /** 更新用户id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 创建用户id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    isLeaf?: boolean;
    /** 父级名称 */
    parentName?: string;
  }

  interface PubRegionAddDto {
    /** 父级id */
    parentId?: string;
    /** 行政区名称 */
    name: string;
    /** 行政区编码 */
    code: string;
    /** 区域类型 */
    type: string;
    /** 区域编码 */
    regionCode: string;
    /** 排序 */
    sort?: number;
  }

  interface ResponseData {
    code?: number;
    msg?: string;
    hint?: string;
    data?: Record<string, any>;
    success?: boolean;
  }

  interface ResponseDataBoolean {
    code?: number;
    msg?: string;
    hint?: string;
    data?: boolean;
    success?: boolean;
  }

  interface ResponseDataListPubGroup {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubGroup[];
    success?: boolean;
  }

  interface ResponseDataListPubRegion {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRegion[];
    success?: boolean;
  }

  interface ResponseDataPageDataPubGroup {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubGroup;
    success?: boolean;
  }

  interface ResponseDataPageDataPubNotice {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubNotice;
    success?: boolean;
  }

  interface ResponseDataPubGroupBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubGroupBo;
    success?: boolean;
  }

  interface ResponseDataPubRegion {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRegion;
    success?: boolean;
  }
}

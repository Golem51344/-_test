/* eslint-disable */
// @ts-nocheck
declare namespace API {
  interface getLogLoginDetailLoginParams {
    /** 登录日志id */
    id: string;
  }

  interface getLogOperateDetailOperateParams {
    /** 操作日志id */
    id: string;
  }

  interface PageDataPubLoginLogDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubLoginLogDto[];
    total?: number;
  }

  interface PageDataPubOperateLogDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubOperateLogDto[];
    total?: number;
  }

  interface PubLoginLogDto {
    /** id */
    id?: number;
    /** 用户id */
    userId?: string;
    /** 账号名 */
    loginName?: string;
    /** 用户姓名 */
    realName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 登录IP */
    loginIp?: string;
    /** 登录时间 */
    loginTime?: string;
    /** 登录类型 */
    loginType?: string;
    /** 登录设备类型, 1-电脑,2-鸿蒙,3-安卓,4-苹果 */
    deviceType?: string;
    /** 登录浏览器 */
    browserName?: string;
    /** 操作系统 */
    os?: string;
    /** 登录是否成功, 0-失败, 1-成功 */
    success?: boolean;
  }

  interface PubLoginLogQuery {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 账号名 */
    loginName?: string;
    /** 用户姓名 */
    realName?: string;
    /** 组织名称 */
    orgName?: string;
    /** 登录IP */
    loginIp?: string;
    /** 开始时间 */
    loginStartTime?: string;
    /** 结束时间 */
    loginEndTime?: string;
    /** 登录类型 */
    loginType?: string;
    /** 登录是否成功, 0-失败, 1-成功 */
    success?: boolean;
  }

  interface PubOperateLogDto {
    /** 主键 */
    id?: string;
    /** 操作用户id */
    operatorUserId?: string;
    /** 账号名 */
    loginName?: string;
    /** 用户姓名 */
    realName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 操作时间 */
    operateTime?: string;
    /** 操作类型 */
    operateType?: string;
    /** 操作菜单目录 */
    moduleName?: string;
    /** 请求参数 */
    requestParams?: string;
    /** 请求方法，GET、POST、DELETE */
    requestMethod?: string;
    /** 请求地址 */
    requestUri?: string;
    /** 操作人ip */
    remoteAddr?: string;
    /** 服务端ip */
    serverAddr?: string;
    /** 是否成功 */
    success?: boolean;
    /** 耗时，ms */
    executeTime?: number;
    /** 操作设备/操作系统类型, 1-PC,2-鸿蒙,3-安卓,4-苹果 */
    deviceType?: string;
    /** 浏览器名称 */
    browserName?: string;
    /** 日志说明 */
    title?: string;
  }

  interface PubOperateLogQuery {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 主键 */
    id?: string;
    /** 账号名 */
    loginName?: string;
    /** 用户姓名 */
    realName?: string;
    /** 组织名称 */
    orgName?: string;
    /** 开始时间 */
    operateStartTime?: string;
    /** 结束时间 */
    operateEndTime?: string;
    /** 操作菜单目录 */
    moduleName?: string;
    /** 请求方法，GET、POST、DELETE */
    requestMethod?: string;
    /** 是否异常 */
    success?: boolean;
    /** 日志说明 */
    title?: string;
  }

  interface ResponseDataPageDataPubLoginLogDto {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubLoginLogDto;
    success?: boolean;
  }

  interface ResponseDataPageDataPubOperateLogDto {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubOperateLogDto;
    success?: boolean;
  }

  interface ResponseDataPubLoginLogDto {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubLoginLogDto;
    success?: boolean;
  }

  interface ResponseDataPubOperateLogDto {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubOperateLogDto;
    success?: boolean;
  }
}

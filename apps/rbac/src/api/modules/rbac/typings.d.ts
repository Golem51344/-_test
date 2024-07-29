/* eslint-disable */
// @ts-nocheck
declare namespace API {
  interface AddPubUserCollectDto {
    /** 1：组织，2：用户 */
    type?: string;
    /** 用户id */
    userId?: string;
    /** 组织id */
    orgId?: string;
  }

  interface AddPubUserUsedDto {
    /** 1：组织，2：用户 */
    type?: string;
    /** 用户id */
    userId?: string;
    /** 用户姓名 */
    userName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
  }

  interface bianjijiaoseheshouquanshujuquanxianduixiang {
    userId: string;
    orgId: string;
    roleIds?: string[];
    dataPermissionIds?: string[];
  }

  interface DataPermissionUserDto {
    /** 数据权限id */
    dataPermissionsId?: string;
    /** 用户id */
    userId?: string;
    /** 组织id */
    orgId?: string;
  }

  interface deleteRbacPostDeleteByIdParams {
    id: string;
  }

  interface deleteRbacPubDataPermissionsDeleteParams {
    id: string;
  }

  interface getRbacCollectByIdDetailParams {
    id: string;
  }

  interface getRbacOrgDeleteOrgParams {
    /** 组织id */
    id: string;
  }

  interface getRbacOrgInfoParams {
    /** 组织id */
    id: string;
  }

  interface getRbacOrgOrgListByParentIdParams {
    /** 父级id */
    parentId?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 是否展示全称名称，默认为false不显示 */
    showFullName?: boolean;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
  }

  interface getRbacOrgSearchSubOrgByIdParams {
    /** 父级id */
    parentId: string;
  }

  interface getRbacOrgSearchTreeByIdParams {
    /** 组织id */
    id?: string;
  }

  interface getRbacPostDetailByIdParams {
    /** 岗位id */
    id: string;
  }

  interface getRbacPostListParams {
    /** 岗位类型 */
    type?: string;
  }

  interface getRbacPubDataPermissionsGetByIdParams {
    id: string;
  }

  interface getRbacResourceGetRoleListByResourceIdParams {
    /** 资源id */
    id: string;
  }

  interface getRbacResourceGroupResourceTreeParams {
    /** 应用id */
    appId: string;
  }

  interface getRbacResourceInfoParams {
    /** 资源id */
    id: string;
  }

  interface getRbacResourceResourceDeleteParams {
    /** 资源id */
    id: string;
  }

  interface getRbacResourceResourceListByParentIdParams {
    /** 父级id */
    parentId?: string;
    /** 是否启用 */
    enable?: boolean;
  }

  interface getRbacRoleInfoParams {
    /** 角色id */
    id: string;
  }

  interface getRbacRoleRoleDeleteParams {
    /** 角色id */
    id: string;
  }

  interface getRbacUsedByIdDetailParams {
    id: string;
  }

  interface getRbacUserInfoParams {
    /** 用户id */
    id: string;
  }

  interface getRbacUserUserDeleteParams {
    /** 用户id */
    userId: string;
  }

  interface OrgSearchQuery {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 组织名称关键字 */
    keyWord?: string;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
    /** 筛选出启用的组织 */
    enable?: boolean;
  }

  interface PageDataPubOrg {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubOrg[];
    total?: number;
  }

  interface PageDataPubPost {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubPost[];
    total?: number;
  }

  interface PageDataPubRoleBo {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubRoleBo[];
    total?: number;
  }

  interface PageDataPubUserBo {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubUserBo[];
    total?: number;
  }

  interface PageDataPubUserCollect {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubUserCollect[];
    total?: number;
  }

  interface PageDataPubUserOrgBo {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubUserOrgBo[];
    total?: number;
  }

  interface PageDataPubUserUsed {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: PubUserUsed[];
    total?: number;
  }

  interface PageDatashujuquanxianshituduixiang {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    records?: shujuquanxianshituduixiang[];
    total?: number;
  }

  interface postRbacCollectByIdDeleteParams {
    id: string;
  }

  interface postRbacPubDataPermissionsGetUserOrgDataPermissionListParams {
    userId: string;
  }

  interface PubDataPermissions {
    /** id */
    id?: string;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门,7:指定群组 */
    type?: string;
    /** 名称 */
    name?: string;
    /** 是否删除，0：否，1：是 */
    isDeleted?: string;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 所属应用id */
    appId?: string;
  }

  interface PubOrg {
    /** 主键 */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 组织名称 */
    name?: string;
    /** 组织全称 */
    fullName?: string;
    /** 组织简称 */
    simpleName?: string;
    /** 组织编码 */
    code?: string;
    /** 祖籍ids，id以逗号隔开 */
    idPath?: string;
    /** 组织类型 */
    type?: string;
    /** 是否行政区划，0：否，1：是 */
    district?: boolean;
    /** 是否叶子节点 */
    leaf?: boolean;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 统一社会信用代码 */
    creditCode?: string;
    /** 行政区划编码 */
    areaCode?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactMobile?: string;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** org_num_id */
    orgNumId?: number;
    /** 版本 */
    version?: number;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
    /** 是否收藏 */
    collect?: boolean;
  }

  interface PubOrgAddDto {
    /** 父级id */
    parentId?: string;
    /** 组织名称 */
    name: string;
    /** 组织编码 */
    code: string;
    /** 行政区划编码 */
    areaCode?: string;
    /** 组织类型 */
    type: string;
    /** 是否行政区划 */
    district: boolean;
    /** 是否启用 */
    enable: boolean;
    /** 排序 */
    sort?: number;
    /** 统一社会信用代码 */
    creditCode?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactMobile?: string;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
  }

  interface PubOrgBo {
    /** 主键 */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 组织名称 */
    name?: string;
    /** 组织全称 */
    fullName?: string;
    /** 组织简称 */
    simpleName?: string;
    /** 组织编码 */
    code?: string;
    /** 祖籍ids，id以逗号隔开 */
    idPath?: string;
    /** 组织类型 */
    type?: string;
    /** 是否行政区划，0：否，1：是 */
    district?: boolean;
    /** 是否叶子节点 */
    leaf?: boolean;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 统一社会信用代码 */
    creditCode?: string;
    /** 行政区划编码 */
    areaCode?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactMobile?: string;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** org_num_id */
    orgNumId?: number;
    /** 版本 */
    version?: number;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
    /** 是否收藏 */
    collect?: boolean;
    /** 父组织名称 */
    parentName?: string;
  }

  interface PubOrgTreeBo {
    /** 主键 */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 组织名称 */
    name?: string;
    /** 组织全称 */
    fullName?: string;
    /** 组织简称 */
    simpleName?: string;
    /** 组织编码 */
    code?: string;
    /** 祖籍ids，id以逗号隔开 */
    idPath?: string;
    /** 组织类型 */
    type?: string;
    /** 是否行政区划，0：否，1：是 */
    district?: boolean;
    /** 是否叶子节点 */
    leaf?: boolean;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 统一社会信用代码 */
    creditCode?: string;
    /** 行政区划编码 */
    areaCode?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactMobile?: string;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** org_num_id */
    orgNumId?: number;
    /** 版本 */
    version?: number;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
    /** 是否收藏 */
    collect?: boolean;
    /** 子节点 */
    children?: PubOrgTreeBo[];
  }

  interface PubOrgUpdateDto {
    /** id */
    id: string;
    /** 组织名称 */
    name: string;
    /** 组织编码 */
    code: string;
    /** 行政区划编码 */
    areaCode?: string;
    /** 组织类型 */
    type: string;
    /** 是否行政区划 */
    district: boolean;
    /** 是否启用 */
    enable: boolean;
    /** 排序 */
    sort?: number;
    /** 统一社会信用代码 */
    creditCode?: string;
    /** 联系人 */
    contactPerson?: string;
    /** 联系方式 */
    contactMobile?: string;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
  }

  interface PubPost {
    /** id */
    id?: string;
    /** 岗位类型 */
    type?: string;
    /** 岗位编号 */
    code?: string;
    /** 岗位名称 */
    name?: string;
    /** 岗位描述 */
    description?: string;
    /** 是否启动, 0-未启用,1-启用 */
    enable?: boolean;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubPostDto {
    /** id */
    id?: string;
    /** 岗位类型 */
    type?: string;
    /** 岗位编号 */
    code?: string;
    /** 岗位名称 */
    name?: string;
    /** 岗位描述 */
    description?: string;
    /** 是否启动, 0-未启用,1-启用 */
    enable?: boolean;
  }

  interface PubPostQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 岗位名称 */
    name?: string;
    /** 岗位类型 */
    type?: string;
  }

  interface PubResource {
    /** 主键 */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 资源名称 */
    name?: string;
    /** 资源编码 */
    code?: string;
    /** 资源类型，1-应用,2-目录,3-菜单,4-按钮,5-非菜单页 */
    type?: string;
    /** 祖籍ids,id用逗号隔开 */
    idPath?: string;
    /** 资源描述 */
    description?: string;
    /** 是否叶子节点，0：否，1：是 */
    leaf?: boolean;
    /** 排序 */
    sort?: number;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否外链，0：否，1：是 */
    link?: boolean;
    /** 外链地址 */
    outLink?: string;
    /** 权限码，多个以逗号分隔 */
    permissionCode?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 版本 */
    version?: number;
    /** 是否启用数据权限，0：否，1：是 */
    enableDataPermission?: boolean;
    /** 数据权限类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门 */
    dataPermissionType?: string;
  }

  interface PubResourceAddDto {
    /** 父级id */
    parentId?: string;
    /** 资源名称 */
    name: string;
    /** 资源编码 */
    code?: string;
    /** 资源类型，1-应用,2-目录,3-菜单,4-按钮,5-非菜单页 */
    type?: string;
    /** 资源描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 是否启用 */
    enable?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否外链 */
    link?: boolean;
    /** 外链地址 */
    outLink?: string;
    /** 权限码，多个以逗号分隔 */
    permissionCode?: string;
    /** 是否启用数据权限，0：否，1：是 */
    enableDataPermission?: boolean;
    /** 数据权限类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门 */
    dataPermissionType?: string;
  }

  interface PubResourceTreeBo {
    /** 主键 */
    id?: string;
    /** 父级id */
    parentId?: string;
    /** 资源名称 */
    name?: string;
    /** 资源编码 */
    code?: string;
    /** 资源类型，1-应用,2-目录,3-菜单,4-按钮,5-非菜单页 */
    type?: string;
    /** 祖籍ids,id用逗号隔开 */
    idPath?: string;
    /** 资源描述 */
    description?: string;
    /** 是否叶子节点，0：否，1：是 */
    leaf?: boolean;
    /** 排序 */
    sort?: number;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否外链，0：否，1：是 */
    link?: boolean;
    /** 外链地址 */
    outLink?: string;
    /** 权限码，多个以逗号分隔 */
    permissionCode?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 版本 */
    version?: number;
    /** 是否启用数据权限，0：否，1：是 */
    enableDataPermission?: boolean;
    /** 数据权限类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门 */
    dataPermissionType?: string;
    /** 子节点 */
    children?: PubResourceTreeBo[];
  }

  interface PubResourceUpdateDto {
    /** id */
    id?: number;
    /** 资源名称 */
    name: string;
    /** 资源类型，1-应用,2-目录,3-菜单,4-按钮,5-非菜单页 */
    type?: string;
    /** 资源编码 */
    code: string;
    /** 资源描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 是否启用 */
    enable?: boolean;
    /** 图标 */
    icon?: string;
    /** 是否外链 */
    link?: boolean;
    /** 外链地址 */
    outLink?: string;
    /** 权限码，多个以逗号分隔 */
    permissionCode?: string;
    /** 是否启用数据权限，0：否，1：是 */
    enableDataPermission?: boolean;
    /** 数据权限类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门 */
    dataPermissionType?: string;
  }

  interface PubRole {
    /** 主键id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 编码(唯一) */
    code?: string;
    /** 描述 */
    description?: string;
    /** 是否启用:0否1是 */
    enable?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 创建组织id */
    createOrgId?: string;
    /** 创建组织名称 */
    createOrgName?: string;
    /** 应用id */
    appId?: string;
  }

  interface PubRoleAddDto {
    /** 角色名称 */
    name?: string;
    /** 编码(唯一) */
    code?: string;
    /** 描述 */
    description?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 资源id集合 */
    resourceIds: string[];
    /** 应用id */
    appId: string;
  }

  interface PubRoleBo {
    /** 主键id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 编码(唯一) */
    code?: string;
    /** 描述 */
    description?: string;
    /** 是否启用:0否1是 */
    enable?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 创建组织id */
    createOrgId?: string;
    /** 创建组织名称 */
    createOrgName?: string;
    /** 应用id */
    appId?: string;
    /** 创建人姓名 */
    createUserName?: string;
    /** 应用名称 */
    appName?: string;
  }

  interface PubRoleQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 角色名称 */
    name?: string;
    /** 所属应用 */
    appId?: string;
  }

  interface PubRoleResourceBo {
    /** 主键id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 编码(唯一) */
    code?: string;
    /** 描述 */
    description?: string;
    /** 是否启用:0否1是 */
    enable?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 创建组织id */
    createOrgId?: string;
    /** 创建组织名称 */
    createOrgName?: string;
    /** 应用id */
    appId?: string;
    /** 创建人姓名 */
    createUserName?: string;
    /** 应用名称 */
    appName?: string;
    resourceIds?: string[];
  }

  interface PubRoleUpdateDto {
    /** 主键id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 资源id集合 */
    resourceIds?: string[];
  }

  interface PubUserAddDto {
    /** 登录账号 */
    loginName?: string;
    /** 登录密码 */
    loginPassword?: string;
    /** 真实姓名 */
    realName?: string;
    /** 性别 0:未知,1：男，2:女 */
    sex?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 联系地址 */
    address?: string;
    /** 身份证号码 */
    idCard?: string;
    /** 用户头像 */
    userPic?: string;
    /** 电子邮箱 */
    email?: string;
    /** 描述 */
    description?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 排序 */
    sort?: number;
    /** 用户绑定的组织和角色 */
    orgRoles: UserAddRoleInnerDto[];
    /** 用户绑定的组织和岗位 */
    posts?: PubUserPostDto[];
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
  }

  interface PubUserAndOrgQueryDto {
    /** 用户id */
    userId?: string;
    /** 组织id */
    orgId?: string;
  }

  interface PubUserBo {
    /** 主键 */
    id?: string;
    /** 所属组织，当前为组织 */
    orgId?: string;
    /** 登录账号 */
    loginName?: string;
    /** 登录密码 */
    loginPassword?: string;
    /** 真实姓名 */
    realName?: string;
    /** 性别 0:未知,1：男，2:女 */
    sex?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 联系地址 */
    address?: string;
    /** 身份证号码 */
    idCard?: string;
    /** 用户头像 */
    userPic?: string;
    /** 电子邮箱 */
    email?: string;
    /** 描述 */
    description?: string;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    userType?: string;
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
    /** 是否收藏 */
    collect?: boolean;
    /** 用户组织信息 */
    userOrgList?: PubUserOrgBo[];
  }

  interface PubUserCollect {
    /** 主键 */
    id?: string;
    /** 1：组织，2：用户 */
    type?: string;
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
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubUserCollectDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 主键 */
    id?: string;
    /** 1：组织，2：用户 */
    type?: string;
    /** 用户id */
    userId?: string;
    /** 用户姓名 */
    userName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface PubUserDto {
    /** 主键 */
    id?: string;
    /** 所属组织，当前为组织 */
    orgId?: string;
    /** 登录账号 */
    loginName?: string;
    /** 真实姓名 */
    realName?: string;
    /** 性别 0:未知,1：男，2:女 */
    sex?: string;
    /** 昵称 */
    nickName?: string;
    /** 是否启用，0：否，1：是 */
    enable?: boolean;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    userType?: string;
    /** 是否收藏 */
    collect?: boolean;
    /** 组织名称 */
    orgName?: string;
    /** 组织全称 */
    fullOrgName?: string;
    /** 是否为 主组织 */
    main?: boolean;
    /** 用户id */
    userId?: string;
    userInfo?: PubUserDto;
  }

  interface PubUserOrgBo {
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 组织全称 */
    fullOrgName?: string;
    /** 是否为 主组织 */
    main?: boolean;
    /** 用户id */
    userId?: string;
    /** 用户名 */
    userName?: string;
    /** 角色列表 */
    roles?: PubUserOrgRoleBo[];
    /** 岗位列表 */
    posts?: PubUserOrgPostBo[];
    /** 是否收藏 */
    collect?: boolean;
  }

  interface PubUserOrgPostBo {
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 岗位id */
    postId?: string;
    /** 岗位名称 */
    postName?: string;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位描述 */
    postDescription?: string;
  }

  interface PubUserOrgRoleBo {
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 角色id */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色描述 */
    roleDescription?: string;
    /** 角色编码 */
    roleCode?: string;
  }

  interface PubUserPostDto {
    /** 组织id */
    orgId?: string;
    /** 岗位id集合 */
    postIds: string[];
  }

  interface PubUserQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 组织id */
    orgId?: string;
    /** 登录账号 */
    loginName?: string;
    /** 真实姓名 */
    realName?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
  }

  interface PubUserSplitOrgQueryDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 组织id */
    orgId?: string;
    /** 登录账号 */
    loginName?: string;
    /** 真实姓名 */
    realName?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
  }

  interface PubUserUpdateDto {
    /** id */
    id: string;
    /** 真实姓名 */
    realName?: string;
    /** 性别 0:未知,1：男，2:女 */
    sex?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 联系地址 */
    address?: string;
    /** 身份证号码 */
    idCard?: string;
    /** 用户头像 */
    userPic?: string;
    /** 电子邮箱 */
    email?: string;
    /** 描述 */
    description?: string;
    /** 是否启用 */
    enable?: boolean;
    /** 用户绑定的组织和角色 */
    orgRoles: UserAddRoleInnerDto[];
    /** 用户绑定的组织和岗位 */
    posts?: PubUserPostDto[];
    /** 扩展信息 */
    extendInfo?: Record<string, any>;
  }

  interface PubUserUsed {
    /** 主键 */
    id?: string;
    /** 1：组织，2：用户 */
    type?: string;
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
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人 */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否收藏 */
    collect?: boolean;
  }

  interface PubUserUsedDto {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 主键 */
    id?: string;
    /** 1：组织，2：用户 */
    type?: string;
    /** 用户id */
    userId?: string;
    /** 用户姓名 */
    userName?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 创建人id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人 */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否显示是否收藏，默认不显示 */
    showIsCollect?: boolean;
  }

  interface putRbacUserChangePasswordParams {
    /** 原密码(使用公钥加密) */
    oldPassword: string;
    /** 新密码(使用公钥加密) */
    newPassword: string;
  }

  interface putRbacUserResetPasswordParams {
    /** 用户id */
    userId: string;
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

  interface ResponseDataListPubOrg {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubOrg[];
    success?: boolean;
  }

  interface ResponseDataListPubPost {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubPost[];
    success?: boolean;
  }

  interface ResponseDataListPubResource {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubResource[];
    success?: boolean;
  }

  interface ResponseDataListPubResourceTreeBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubResourceTreeBo[];
    success?: boolean;
  }

  interface ResponseDataListPubRole {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRole[];
    success?: boolean;
  }

  interface ResponseDataListPubRoleBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRoleBo[];
    success?: boolean;
  }

  interface ResponseDataListPubUserDto {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubUserDto[];
    success?: boolean;
  }

  interface ResponseDataListshujuquanxianshituduixiang {
    code?: number;
    msg?: string;
    hint?: string;
    data?: shujuquanxianshituduixiang[];
    success?: boolean;
  }

  interface ResponseDataListString {
    code?: number;
    msg?: string;
    hint?: string;
    data?: string[];
    success?: boolean;
  }

  interface ResponseDataPageDataPubOrg {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubOrg;
    success?: boolean;
  }

  interface ResponseDataPageDataPubPost {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubPost;
    success?: boolean;
  }

  interface ResponseDataPageDataPubRoleBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubRoleBo;
    success?: boolean;
  }

  interface ResponseDataPageDataPubUserBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubUserBo;
    success?: boolean;
  }

  interface ResponseDataPageDataPubUserCollect {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubUserCollect;
    success?: boolean;
  }

  interface ResponseDataPageDataPubUserOrgBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubUserOrgBo;
    success?: boolean;
  }

  interface ResponseDataPageDataPubUserUsed {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDataPubUserUsed;
    success?: boolean;
  }

  interface ResponseDataPageDatashujuquanxianshituduixiang {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PageDatashujuquanxianshituduixiang;
    success?: boolean;
  }

  interface ResponseDataPubDataPermissions {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubDataPermissions;
    success?: boolean;
  }

  interface ResponseDataPubOrg {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubOrg;
    success?: boolean;
  }

  interface ResponseDataPubOrgTreeBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubOrgTreeBo;
    success?: boolean;
  }

  interface ResponseDataPubPost {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubPost;
    success?: boolean;
  }

  interface ResponseDataPubResource {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubResource;
    success?: boolean;
  }

  interface ResponseDataPubRoleBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRoleBo;
    success?: boolean;
  }

  interface ResponseDataPubRoleResourceBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubRoleResourceBo;
    success?: boolean;
  }

  interface ResponseDataPubUserBo {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubUserBo;
    success?: boolean;
  }

  interface ResponseDataPubUserCollect {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubUserCollect;
    success?: boolean;
  }

  interface ResponseDataPubUserUsed {
    code?: number;
    msg?: string;
    hint?: string;
    data?: PubUserUsed;
    success?: boolean;
  }

  interface ResponseDatashouquanshujuquanxianduixiang {
    code?: number;
    msg?: string;
    hint?: string;
    data?: shouquanshujuquanxianduixiang;
    success?: boolean;
  }

  interface ResponseDatashujuquanxianbianjiduixiang {
    code?: number;
    msg?: string;
    hint?: string;
    data?: shujuquanxianbianjiduixiang;
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

  interface shouquanshujuquanxianduixiang {
    /** 用户id */
    userId?: string;
    /** 所属组织，当前为组织 */
    orgId?: string;
    /** 登录账号 */
    loginName?: string;
    /** 真实姓名 */
    realName?: string;
    /** 性别 0:未知,1：男，2:女 */
    sex?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 数据权限列表 */
    userOrgPermissionBos?: yonghuzuzhishujuquanxianhexiaosequanxianduixiang[];
  }

  interface shujuquanxianbianjiduixiang {
    /** id */
    id?: string;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门,7:指定群组 */
    type?: string;
    /** 名称 */
    name?: string;
    /** 应用id */
    appId?: string;
    /** 应用名称 */
    appName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 组织id */
    orgs?: PubOrgBo[];
    /** 群组id */
    groups?: shujuquanxianmokuaihuixiandequnzuduixiang[];
    /** 资源id */
    resources?: PubResourceTreeBo[];
  }

  interface shujuquanxianchaxunduixiang {
    currentPage?: number;
    pageSize?: number;
    doSearchTotal?: boolean;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门,7:指定群组 */
    type?: string;
    /** 名称 */
    name?: string;
  }

  interface shujuquanxianmokuaihuixiandequnzuduixiang {
    /** 群组id */
    id?: string;
    /** 群组名称 */
    name?: string;
    /** 群组类型：1=组织，2=人员 */
    type?: string;
  }

  interface shujuquanxianshituduixiang {
    /** id */
    id?: string;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门,7:指定群组 */
    type?: string;
    /** 名称 */
    name?: string;
    /** 应用id */
    appId?: string;
    /** 应用名称 */
    appName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  }

  interface shujuquanxianxinzenghuogengxinduixiang {
    id?: string;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门;7:指定群组 */
    type?: string;
    /** 名称 */
    name: string;
    /** 所属应用id */
    appId?: string;
    /** 组织id */
    orgIds?: string[];
    /** 群组id */
    groupIds?: string[];
    /** 资源id */
    resourceIds?: string[];
  }

  interface UserAddRoleInnerDto {
    /** 组织id */
    orgId?: string;
    /** 角色id集合 */
    roleIds: string[];
    /** 多个组织时,是否为主要组织,只能有一个 */
    main?: boolean;
  }

  interface UserOrgRoleBo {
    /** 主键id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 编码(唯一) */
    code?: string;
    /** 描述 */
    description?: string;
    /** 是否启用:0否1是 */
    enable?: boolean;
    /** 创建id */
    createdBy?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新人id */
    updatedBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除，0：否，1：是 */
    deleted?: boolean;
    /** 可见范围: 1-仅自己;2-全部可见 */
    viewScope?: string;
    /** 创建组织id */
    createOrgId?: string;
    /** 创建组织名称 */
    createOrgName?: string;
    /** 应用id */
    appId?: string;
    /** 所属用户组织id */
    userOrgId?: string;
    /** 所属用户id */
    userId?: string;
  }

  interface xinzengshouquanshujuquanxianduixiang {
    /** 数据权限id列表 */
    userDataPermissions?: DataPermissionUserDto[];
  }

  interface yonghuzuzhishujuquanxianduixiang {
    userId?: string;
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** id */
    dataPermissionId?: string;
    /** 类型: 1:查看全部;2:仅看自己;3仅看所在部门;4:仅看所在部门及子部门;5:仅自选部门;6:自选部门及子部门,7:指定群组 */
    dataPermissionType?: string;
    /** 名称 */
    dataPermissionName?: string;
  }

  interface yonghuzuzhishujuquanxianhexiaosequanxianduixiang {
    /** 组织id */
    orgId?: string;
    /** 组织名称 */
    orgName?: string;
    /** 是否为主组织 */
    main?: boolean;
    /** 数据权限列表 */
    dataPermissionsList?: yonghuzuzhishujuquanxianduixiang[];
    /** 角色列表 */
    roleList?: UserOrgRoleBo[];
  }
}

declare interface User {
  /**
   * 账户名
   */
  account: string

  /**
   * 用户id
   */
  userId: string

  /**
   * 所在部门
   */
  department: string

  /**
   * 用户头像
   */
  avatar: string

  /**
   * 用户权限
   */
  permissions: string[]

  /**
   * 用户 token
   */
  token: string

  /*
  * 刷新token
  */
  refreshToken: string

  /**
   * 所属组织列表
   */
  orgList: API.PubUserOrgBo[]

  /**
   * 当前的组织id
   */
  orgId: string
}

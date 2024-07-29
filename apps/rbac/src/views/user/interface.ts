export type Query = API.PubUserQueryDto;
export type Data = API.PubUserBo;
export type AddForm = API.PubUserAddDto & Record<string, unknown>;
export type EditForm = API.PubUserUpdateDto & Record<string, unknown>;

interface BaseSelect {
  value: string
  label: string
}
export type Form = Omit<API.PubUserBo, 'userOrgList'> & {
  userOrgList: Array<Omit<API.PubUserOrgBo, 'roles' | 'posts'> & { positionList: BaseSelect[] }>
};

export interface CurrentOrg {
  orgId?: string
  orgName?: string
}

export interface AuthItem {
  dataPermissionIds?: string[]
  roleIds?: string[]
  userId?: string
  orgId: string
  orgName: string
  main: boolean
  [key: string]: any
}

export interface SelectItem {
  label: string
  key: string
}

export type OptionItem = string | SelectItem;
export interface ResultAuthItem {
  dataPermissionIds: OptionItem[]
  roleIds: OptionItem[]
  userId: string
  orgId: string
  orgName: string
  main: boolean
}

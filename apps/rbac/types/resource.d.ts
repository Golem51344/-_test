export interface ResourceBasicRouter {
  title: string
  icon: string
  activeIcon: string
  defaultOpened: boolean
  permanent: boolean
  auth: string
  sidebar: boolean
  singleMenu: boolean
  breadcrumb: boolean
  activeMenu: string
  copyright: boolean
  paddingBottom: string
  whiteList: boolean
}

export interface ResourceBadgeOpenRouter extends ResourceBasicRouter {
  badge: false
}

export interface ResourceBadgeCloseRouter extends ResourceBasicRouter {
  badge: true
  badgeRequest: string
}

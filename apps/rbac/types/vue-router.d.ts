import type { RouteRecordRaw } from 'vue-router';
import type { Merge, RequireExactlyOne } from 'type-fest';
import type { User } from './user';

export interface RouterMetaRawBaseOptions {
  title: string | (() => string)
  i18n: string
  icon: string
  activeIcon: string
  defaultOpened: boolean
  permanent: boolean
  auth: string | string[]
  sidebar: boolean
  singleMenu?: boolean
  breadcrumb: boolean
  activeMenu: string
  cache: boolean | string | string[]
  noCache: string | string[]
  badge: boolean | string | number | (() => boolean | string | number)
  iframe: string | ((user: User) => string | Promise<string>)
  link: string
  copyright: boolean
  paddingBottom: string
  whiteList: boolean
  breadcrumbNeste: Route.breadcrumb[]
  isDev: boolean
}

type RouterMetaRaw = RequireExactlyOne<Partial<RouterMetaRawBaseOptions>, 'title'>;

export declare namespace Route {

  type mainMeta =
    | 'title'
    | 'i18n'
    | 'icon'
    | 'activeIcon'
    | 'auth';

  type recordMainRawBasicMeta = Partial<Pick<RouterMetaRawBaseOptions, mainMeta>>;

  interface recordMainRawNotDev {
    meta: Merge<recordMainRawBasicMeta, { isDev?: false }>
    children: RouteRecordRaw[]
  }

  interface recordMainRawDev {
    meta: Merge<recordMainRawBasicMeta, { isDev: true }>
    children?: RouteRecordRaw[]
  }

  type recordMainRaw = recordMainRawNotDev | recordMainRawDev;

  interface breadcrumb {
    path: string
    title?: string | (() => string)
    i18n?: string
    icon?: string
    activeIcon?: string
    hide: boolean
  }
}

declare module 'vue-router' {
  interface RouteMeta extends RouterMetaRaw { }
}

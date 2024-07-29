import type { RouteRecordName } from 'vue-router';
import type { User } from './user';

export declare namespace Tabbar {
  interface recordRaw {
    tabId: string
    fullPath: string
    routeName?: RouteRecordName
    activeMenu?: string
    title?: string | (() => string)
    i18n?: string
    iframe?: string | ((user: User) => string | Promise<string>)
    icon?: string
    activeIcon?: string
    name: string[]
    customTitleList: {
      fullPath: string
      title: string
    }[]
    isPin: boolean
    isPermanent: boolean
  }
}

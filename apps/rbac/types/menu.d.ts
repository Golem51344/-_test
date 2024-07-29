export declare namespace Menu {
  /** 原始 */
  interface recordRaw {
    path?: string
    meta?: {
      title?: string
      i18n?: string
      icon?: string
      activeIcon?: string
      defaultOpened?: boolean
      auth?: string | string[]
      sidebar?: boolean
      badge?: boolean | string | number | (() => boolean | string | number)
      link?: string
      isDev?: boolean
    }
    children?: recordRaw[]
  }
  /** 主导航 */
  interface recordMainRaw {
    meta?: {
      title?: string
      i18n?: string
      icon?: string
      activeIcon?: string
      auth?: string | string[]
      isDev?: boolean
    }
    children: recordRaw[]
  }
}

/**
 * ========================================================================
 * ?                                ABOUT
 * @author         :  weiyafei
 * @email          :  2553241022@qq.com
 * @createdOn      :  2023-12-15 23:17
 * @description    :  app配置文件的类型,使用者不应当修改此文件的类型
 *========================================================================*
 */

declare namespace Settings {

  /* ================== APP ================= */

  interface app {
    /**
     * 亮色主题
     *
     * @默认值 [`'classic'`]
     * @可选值 可选择 `./themes/index.ts` 里所有 `color-scheme: light` 的主题
     */
    lightTheme?: string

    /**
     * 暗色主题
     *
     * @默认值 `'dark'`
     * @可选值 可选择 `./themes/index.ts` 里所有 `color-scheme: dark` 的主题
     */
    darkTheme?: string

    /**
     * 颜色方案
     *
     * @默认值 `'light'`
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme?: | '' | 'light' | 'dark'

    /**
     * 默认语言
     *
     * @默认值 `''` 跟随浏览器语言设置
     */
    defaultLang?: string

    /**
     * 是否开启权限功能
     *
     * @默认值 `true`
     */

    enablePermission?: boolean

    /**
     * 是否开启载入进度条
     *
     * @默认值 `true`
     */
    enableProgress?: boolean

    /**
     * 是否开启动态标题
     *
     * @默认值 `true`
     */
    enableDynamicTitle?: boolean

    /**
     * localStorage/sessionStorage/cookies 前缀
     *
     * @默认值 `'wsy_rbac'`
     */

    storagePrefix?: string

    /**
     * 是否在非开发环境开启错误日志功能，具体业务代码在 ./utils/error.log.ts
     * @默认值 `false`
     */
    enableErrorLog?: boolean

    /**
     * 路由数据来源
     *
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     * @可选值 `'filesystem'` 文件系统
     */
    routeBaseOn?: | 'frontend' | 'backend' | 'filesystem'

    /**
     * 是否开启用户偏好设置
     *
     * @默认值 `true`
     */
    enableUserPreferences?: boolean

    /**
     * 是否开启系统偏好设置
     *
     * @默认值 `true`
     */
    enableSettingPreferences?: boolean

    /**
     * 是否开启应用配置，强烈建议在生产环境中关闭
     *
     * @默认值 `true`
     */
    enableAppSetting?: boolean
  }

  /* ================== HOME ================= */

  interface home {

    /**
     * 是否开启主页
     *
     * @默认值 `true`
     */
    enable?: boolean

    /**
     * 主页名称
     *
     * @默认值 `'主页'`
     */
    title?: string

  }

  /* ================== LAYOUT ================= */

  interface layout {

    /**
     * 页宽模式，当设置为非 `'adaption'` 时，可以去 ./src/assets/styles/layout.scss 里设置 `--g-app-width` 宽度变量
     *
     * @默认值 `'adaption'` 自适应
     * @可选值 `'adaption-min-width'` 自适应（有最小宽度）
     * @可选值 `'center'` 定宽居中
     * @可选值 `'center-max-width'` 定宽居中（有最大宽度）
     */
    widthMode?: | 'adaption' | 'adaption-min-width' | 'center' | 'center-max-width'

    /**
     * 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
     *
     * @默认值 `true`
     */
    enableMobileAdaptation?: boolean
  }

  /* ================== MENU ================= */

  interface menu {

    /**
     * 导航栏数据来源，当 `app.routeBaseOn: 'filesystem'` 时生效
     *
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     */
    baseOn?: | 'frontend' | 'backend'

    /**
     * 导航栏模式
     *
     * @default
     * @默认值 `'side'` 侧边栏模式（有主导航）
     * @可选值 `'head'` 顶部模式
     * @可选值 `'single'` 侧边栏模式（无主导航）
     * @可选值 `'only-side'` 侧边栏精简模式
     * @可选值 `'only-head'` 顶部精简模式
     */
    menuMode?: | 'side' | 'head' | 'single' | 'only-side' | 'only-head'

    /**
     * 导航栏是否圆角
     *
     * @默认值 `true`
     */
    isRounded?: boolean

    /**
     * 导航栏激活风格
     *
     * @默认值 `''`
     * @可选值 `'arrow'` 箭头
     * @可选值 `'line'` 线条
     * @可选值 `'dot'` 圆点
     */
    menuActiveStyle?: | '' | 'arrow' | 'line' | 'dot'

    /**
     * 切换主导航是否跳转页面
     *
     * @默认值 `true`
     */
    switchMainMenuAndPageJump?: boolean

    /**
     * 次导航是否只保持一个子项的展开
     *
     * @默认值 `true`
     */
    subMenuUniqueOpened?: boolean

    /**
     * 次导航只有一个导航时是否自动隐藏
     *
     * @默认值 `true`
     */
    subMenuOnlyOneHide?: boolean

    /**
     * 次导航是否收起
     *
     * @默认值 `false`
     */
    subMenuCollapse?: boolean

    /**
     * 是否开启次导航的展开/收起按钮
     *
     * @默认值 `true`
     */
    enableSubMenuCollapseButton?: boolean

    /**
     * 是否开启主导航切换快捷键
     *
     * @默认值 `false`
     */
    enableHotkeys?: boolean

  }

  /* ================== TOPBAR ================= */

  interface topbar {
    /**
     * 模式
     *
     * @默认值 `'static'` 静止，跟随页面滚动
     * @可选值 `'fixed'` 固定，不跟随页面滚动，始终固定在顶部
     * @可选值 `'sticky'` 粘性，页面往下滚动时隐藏，往上滚动时显示
     */
    mode?: | 'static' | 'fixed' | 'sticky'

    /**
     * 是否切换显示标签栏和工具栏的显示位置
     *
     * @默认值 `false` 标签栏在工具栏上面
     * @可选值 `true` 工具栏在标签栏上面
     */
    switchTabbarAndToolbar?: boolean

  }

  /* ================== TABBAR ================= */

  interface tabbar {

    /**
     * 是否开启标签栏
     *
     * @默认值 `true`
     */
    enable?: boolean

    /**
     * 标签栏风格
     *
     * @默认值 `'fashion'` 时尚
     * @可选值 `'card'` 卡片
     * @可选值 `'square'` 方块
     */
    style?: | 'fashion' | 'card' | 'square'

    /**
     * 是否开启标签栏图标显示
     *
     * @默认值 `true`
     */
    enableIcon?: boolean

    /**
     * 标签页合并规则
     *
     * @默认值 `'activeMenu'`
     * @可选值 `'routeName'` 根据路由名称，相同路由名称的路由合并
     * @可选值 `'activeMenu'` 根据路由的 `meta.activeMenu` 字段，与指向的目标路由合并
     */
    mergeTabsBy?: | '' | 'routeName' | 'activeMenu'

    /**
     * 是否开启标签栏记忆功能
     *
     * @默认值 `true`
     */
    enableMemory?: boolean

    /**
     * 是否开启标签栏快捷键
     *
     * @默认值 `true`
     */
    enableHotkeys?: boolean

    /**
     * 固定标签页存储位置
     *
     * @默认值 `'local'` 本地存储
     * @可选值 `'server'` 服务器存储
     */
    storageTo?: | 'local' | 'server'

  }

  /* ================== TOOLBAR ================= */

  interface toolbar {
    /**
     * 是否开启通知中心
     *
     * @默认值 `true`
     */
    enableNotification?: boolean

    /**
     * 是否开启国际化
     *
     * @默认值 `true`
     */
    enableI18n?: boolean

    /**
     * 是否开启全屏
     *
     * @默认值 `true`
     */
    enableFullscreen?: boolean

    /**
     * 是否开启页面刷新
     *
     * @默认值 `true`
     */
    enablePageReload?: boolean

    /**
     * 是否开启颜色主题
     *
     * @默认值 `true`
     */
    enableColorScheme?: boolean

  }

  /* ================== FAVORITES ================= */

  interface favorites {

    /**
     * 是否开启收藏夹
     *
     * @默认值 `true`
     */
    enable?: boolean
    /**
     * 存储位置
     *
     * @默认值 `'local'` 本地存储
     * @可选值 `'server'` 服务器存储
     */
    storageTo?: | 'local' | 'server'
  }

  /* ================== BREADCRUMB ================= */

  interface breadcrumb {
    /**
     * 是否开启面包屑导航
     *
     * @默认值 `true`
     */

    enable?: boolean

    /**
     * 面包屑导航风格
     *
     * @默认值 `''` 默认
     * @可选值 `'modern'` 现代
     */
    style?: '' | 'modern'

    /**
     * 是否在面包屑导航里显示主导航
     *
     * @默认值 `false`
     */
    enableMainMenu?: boolean
  }

  /* ================== MAIN_PAGE ================= */

  interface mainPage {

    /**
     * 是否开启页面快捷键
     *
     * @默认值 `true`
     */
    enableHotkeys?: boolean

    /**
     * iframe 页面最大缓存数量
     *
     * @默认值 `3`
     */
    iframeCacheMax?: number

    /**
     * 是否开启页面切换动画
     *
     * @默认值 `true`
     */
    enableTransition?: boolean

    /**
     * 页面切换动画
     *
     * @默认值 `'fade'` 淡入淡出
     * @可选值 `'slide-left'` 向左滑动
     * @可选值 `'slide-right'` 向右滑动
     * @可选值 `'slide-top'` 向上滑动
     * @可选值 `'slide-bottom'` 向下滑动
     */
    transitionMode?: | 'fade' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom'
  }

  /* ================== NAV_SEARCH ================= */

  interface navSearch {

    /**
     * 是否开启导航搜索
     *
     * @默认值 `true`
     */
    enable?: boolean

    /**
     * 是否开启导航搜索快捷键
     *
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }

  /* ================== COPYRIGHT ================= */

  interface copyright {

    /**
     * 是否开启底部版权，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
     *
     * @默认值 `true`
     */
    enable?: boolean

    /**
     * 网站运行日期
     *
     * @默认值 `'2024'`
     */
    dates?: string

    /**
     * 公司名称
     *
     * @默认值 `'PUBINFO'`
     */
    company?: string

    /**
     * 网站地址
     *
     * @默认值 `''`
     */
    website?: string

    /**
     * 网站备案号
     *
     * @默认值 `''`
     */
    beian?: string

  }

  /* ================== WATERMARK ================= */
  interface watermark {
    /**
     * 是否开启页面水印
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 水印文案
     * @默认值 PUBINFO U|O|OU
     */
    text?: string
    /**
     * 水印起始位置x轴坐标
     * @默认值 0
     */
    x?: number
    /**
     * 水印起始位置Y轴坐标
     * @默认值 0
     */
    y?: number
    /**
     * 水印x轴间隔
     * @默认值 50
     */
    x_space?: number
    /**
     * 水印y轴间隔
     * @默认值 50
     */
    y_space?: number
    /**
     * 水印透明度，要求设置在大于等于0.005
     * @默认值 0.1
     */
    alpha?: number
    /**
     * 水印宽度
     * @默认值 150
     */
    width?: number
  }
  /* ================== ALL ================= */

  interface all {
    /** 应用设置 */
    app?: app
    /** 主页设置 */
    home?: home
    /** 布局设置 */
    layout?: layout
    /** 导航栏设置 */
    menu?: menu
    /** 顶栏设置 */
    topbar?: topbar
    /** 标签栏设置 */
    tabbar?: tabbar
    /** 工具栏设置 */
    toolbar?: toolbar
    /** 收藏夹设置 */
    favorites?: favorites
    /** 面包屑导航设置 */
    breadcrumb?: breadcrumb
    /** 页面设置 */
    mainPage?: mainPage
    /** 导航搜索设置 */
    navSearch?: navSearch
    /** 底部版权设置 */
    copyright?: copyright
    /** 水印 */
    watermark?: watermark
  }
}

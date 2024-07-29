# Changelog

## v1.5.3-beta.2


### 🚀 Enhancements

- **rbac:** 添加暂未上线的一级演示菜单 (51205c757)
- **rbac:** 调整isDev路由判断 (e30b74c1f)

### 🏡 Chore

- **other:** 更新日志 (b17e2371c)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v1.5.3-beta.1


### 🚀 Enhancements

- **rbac:** 增加租户管理功能 (2ef8155f7)

### 🏡 Chore

- **other:** 更新日志 (4dbd99f03)

### ❤️ Contributors

- Werheng@<vhang97@163.com>
- Weiyafei@<2553241022@qq.com>

## v1.5.2


### 🚀 Enhancements

- **rbac:** 移除修改密码的icon，替换了显式录入 (f5ce989fe)
- **rbac:** 调整vite clientFiles (4b0c498da)
- **rbac:** 调整升级依赖导致的样式问题 (ca7aa63d7)
- **rbac:** 移除演示系统的IsDev (cde4eb194)

### 🩹 Fixes

- **project:** 修复turbo缓存空命中问题 (99b3942a3)
- **rbac:** 组织管理无数据情况下增加缺省图片 (a30b58ef7)
- **rbac:** 解决刷新token时会额外存储localstorage的问题 (a2431e909)

### 💅 Refactors

- **vite:** 调整getServerProxy函数 (a0c22833e)
- **rbac:** 调整安全配置代码符合研发云sonar规范 (6e970bb9d)
- **rbac:** 调整登录日志等页面的代码，适配新版sonar检测 (d1ca9daa8)
- **rbac:** 调整黑白名单 onAction函数复杂度 (d6b8d2a44)
- **rbac:** 调整line超长的格式 (ea9d0554b)

### 🏡 Chore

- **other:** 更新日志 (e2d16af61)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>

## v1.5.1


### 🚀 Enhancements

- **rbac:** 调整layout内的icon组件为显式引入 (b2d269f0c)
- **rbac:** 调整tabbar菜单图标调整为显式加载 (29a7533a9)
- **rbac:** 调整layout的布局 (d6c714fec)
- **rbac:** 调整vite clientFiles (d359dca5e)
- **vite:** 调整配置文件 (629f1d90a)

### 🩹 Fixes

- **vite:** 修复proxy代理 (d934415fa)

### 🏡 Chore

- **other:** 更新日志 (90502d184)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v1.5.0


### 🚀 Enhancements

- **rbac:** 用户编辑和授权接口更换, 并移除授权时的必填校验 (55b56d554)
- **rbac:** 修改dockerfile (2f5f0115d)
- **rbac:** 关闭openapi自动生成配置 (380698985)
- **rbac:** 修复响应式丢失问题 (a911453c2)
- **rbac:** 升级副作用小的依赖 (e2526597f)
- **rbac:** 调整vite 相关的版本 (46c3fa4cc)
- **rbac:** 将@pubinfo/headlessui添加入预编译 (2d23ac8a0)
- **vite:** 调整vite 打包的并发数 (f87228461)
- **rbac:** 调整turbo版本 (7d865b1e0)
- **project:** 添加turbo prepack 移除缓存 (31179929c)
- **rbac:** 在用户管理下组织树单独添加 数据权限标识 (7e3547bd0)
- **rbac:** 移除Dockerfile文件 (4f2f90be9)

### 🔥 Performance

- **rbac:** 懒加载部分组件 (6bfe55ad1)

### 🩹 Fixes

- **rbac:** 解决单点登录前未清空登录状态的问题 (97060ee6d)
- **rbac:** 资源管理新增默认关闭数据权限, 资源树弹窗默认展开第一级 (402d7b0fe)

### 🏡 Chore

- **other:** 更新日志 (6b60fc49a)
- **rbac:** 更新vite-plugin-env-runtime版本 (b8802f049)
- **other:** 移除配置文件 (7cbd2fc9c)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>

## v1.4.0


### 🚀 Enhancements

- **rbac:** 升级unocss相关配置 (5b160ec72)

### 🔥 Performance

- **rbac:** 编译速度提升 (c297228cd)

### 💅 Refactors

- **rbac:** Ip正则重构 (89e270232)

### 🏡 Chore

- **other:** 更新日志 (b796a8c35)
- **project:** 升级vue相关依赖 (f07502f36)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v1.3.0


### 🚀 Enhancements

- **rbac:** 添加dockerfile (77b593091)
- **rbac:** 调整git 大小写问题 (85d67656e)
- **rbac:** 增加全局缩放功能 (9556c70b0)

### 🩹 Fixes

- **rbac:** 修复资源选择弹窗图标不展示问题, 增加组织用户弹窗的Tab隐藏功能 (7e378ff18)

### 🏡 Chore

- **other:** 更新日志 (974babf61)

### ❤️ Contributors

- Werheng@<vhang97@163.com>
- Weiyafei@<2553241022@qq.com>

## v1.2.0


### 🚀 Enhancements

- **rbac:** 组织用户组件增加禁用数据和单独接口替换功能 (37504f8f8)
- **rbac:** Api接口调整为微服务 (9116762a0)
- **rbac:** 优化svg体积 (98869694b)

### 🩹 Fixes

- **rbac:** 组织树组件优化组织名称过长换行的问题 (509cc6b60)

### 🏡 Chore

- **other:** 更新日志 (d4dd2e2d0)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>

## v1.1.0


### 🚀 Enhancements

- **rbac:** 资源新增及编辑弹窗中添加数据权限相关选项 (96deda152)
- **rbac:** 用户管理添加授权按钮及授权弹窗(未完成) (a55b99544)
- **rbac:** 用户新建和编辑弹窗中去掉角色授权 (3ffd7014e)
- **rbac:** 资源选择弹窗添加数据权限模式 (aa8cda0f5)
- **rbac:** 数据权限列表及新建页面(除群组外)开发完成 (abb162d42)
- **rbac:** 用户管理之授权弹窗联调完成 (551d7579f)
- **rbac:** 数据权限相关功能开发完毕 (4a6b2399b)
- **rbac:** 请求header中添加Auth字段 (f88d38918)
- **rbac:** Eslint 正则修复 (b3fb5503d)
- **rbac:** 增加4A第三方登录功能 (485e25e08)
- **rbac:** 默认关闭4A登录功能 (7ad379cb0)
- **rbac:** 添加数据范围 (6448b86c4)
- **rbac:** 调整数据鉴权的请求头名称 (497f58a9a)
- **rbac:** 调整数据鉴权函数的注释 (cc07eedc2)
- **rbac:** 调整数据权限枚举字段 (36ed71c34)
- **rbac:** 增加4A redirect_uri的配置 (e258c4d3b)
- **rbac:** 调整路由auth的覆盖逻辑 (27fbecde7)
- **rbac:** 调整auth取值,以子元素为先 (92dda48d6)
- **rbac:** 调整群组管理 (2f9b8a49f)
- **rbac:** 完成群组管理调整及组织用户组件的使用 (b6feb548e)
- **rbac:** 添加头栏菜单下,暂未上线功能 (f99ddcfe4)
- **rbac:** 侧栏模式下添加暂未上线功能 (dabf2c854)
- **rbac:** 侧边栏精简模式添加暂未上线功能 (28dfcd968)
- **rbac:** 完成组织用户选择器及函数式调用 (957903c5f)
- **rbac:** 调整菜单问题 (018be7be2)
- **rbac:** 组织用户选择器增加数据权限配置 (d5e856d99)
- **rbac:** 头部菜单栏css调整 (3569eade1)
- **rbac:** 更多应用的隐藏逻辑 (15afddf5c)
- **other:** 增加openapi的生成指令 (c42c28e68)
- **other:** 增加openapi的生成指令 (868c86a2b)
- **rbac:** 添加更多应用逻辑 (8e01818f8)
- **rbac:** 更多应用关联当前激活应用 (f39df1c5c)
- **rbac:** 暂无数据的逻辑样式 (9c2ded83b)
- **rbac:** 添加一级菜单演示demo (3f0b57b2a)
- **rbac:** 修复tab滚动问题 (feb9fdcf0)
- **rbac:** 调整系统暂未上线的提示 (e6c7da0fe)
- **rbac:** 调整数据权限的层级 (003a6fc89)
- **rbac:** 调整lock文件 (b29487624)

### 🩹 Fixes

- **rbac:** 资源编辑中数据权限显示逻辑更正 (9581c44c8)
- **rbac:** 用户授权弹窗添加TS类型 (7d3cbc5d5)
- **rbac:** 创建角色及数据权限时，应用切换时清除已选的资源 (4841da9cf)
- **rbac:** 群组选择弹窗中群组数据接口更新为不分页全量接口 (97ffdb330)
- **rbac:** 修复tabbarId取值问题 (3eecc8bda)
- **rbac:** 修复登录页可以支持点击登录按钮 (40597678d)
- **rbac:** 其他配置单词拼错问题 (160d9cb4e)
- **rbac:** 修复路径寻址函数的相关问题 (f661cef0e)
- **rbac:** 解决水印初次进入页面时未生效的问题 (a4911390f)
- **rbac:** 修复更多应用无法容乃最后一个应用的问题 (c8172bfe8)
- **rbac:** 修复数据权限name 为空的问题 (231a2ec59)
- **rbac:** 修复一级菜单样式破损问题 (20e1f223e)

### 📦 Build

- **script:** 简化script的错误提示, 使报错更易理解 (4eeede155)

### 🏡 Chore

- **rbac:** 优化@pubinfo/pro-components的类型提示 (f70cc2b82)

### 🎨 Styles

- **rbac:** 删除黑白名单页面冗余样式 (3cf98eb3e)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>
- 王炜毅@<wangweiyi_ty@163.com>

## v1.0.0


### 🚀 Enhancements

- **other:** 调整changelog信息字段 (086ab00e7)
- **rbac:** 移除AppSetting功能组 (7338f4322)
- **rbac:** 移除文档 (0864015ff)
- **rbac:** 调整setting配置在dev环境和主动开启下才能显示 (84b8fc1d5)
- **rbac,other:** 完善水印配置 (f4c4df5fc)
- **rbac:** 增加组织用户选择组件 (d0370d42e)
- **rbac:** 将mock数据迁移到api目录文件下 (c13eff951)
- **rbac:** 水印开启按钮放置在配置中 (db70a75ae)
- **rbac:** 组织用户组件隐藏群组 (43028cef6)
- **rbac:** 安全配置页面表单默认值修改 (94e3eee8d)
- **rbac:** 调整接口和类型 (04791ef51)

## v0.9.8-beta.1


### 🚀 Enhancements

- **other:** 调整版本号差异 (cd866b0f1)
- **other:** Pnpm 添加ignoreMissing 忽略eslint 依赖问题 (965976ea7)
- **rbac,project:** 修改系统名称 (a447d643e)
- **rbac:** 默认语言调整成默认中文简体 (2ccbd607b)
- **other:** 忽略eslint的依赖版本警告 (f0d41bb34)
- **other:** 提升pnpm的版本,添加npmrc下对pnpm的版本建议,engines 下强制使用高版本的pnpm (339cbae63)
- **project:** 日志中心开发及联调完毕 (8ed5e7f02)
- **project:** 添加日志管理接口配置 (c6d903d04)
- **rbac:** 日志模块更正TS类型及浏览器图标逻辑 (573d3f56f)
- **rbac:** 添加日志模块 (048a24125)
- **rbac:** 安全配置页开发完成 (65bb78d80)
- **rbac:** 调整安全配置错误问题 (201d474f4)

### 🩹 Fixes

- **rbac:** 修复修改密码,传递延迟问题 (9428c838a)
- **rbac:** 修复测试bug (14689103d)
- **rbac:** 安全配置页面样式修正 (c9952e611)
- **rbac:** 修复浏览器警告activeStyle (bfe0b7491)
- **rbac:** 安全配置页 及 主题配置页 样式调整 (788f25440)
- **rbac:** 修改日志页面字段不同早成的问题 (629b9edb9)

### 💅 Refactors

- **rbac:** 日志相关页面表格字段调整 (ff184a037)

### 📖 Documentation

- **other:** 调整changelog (17e93af3e)

### 🌊 Types

- **rbac:** 更新类型配置 (ddff1042e)

### 🏡 Chore

- **other:** 更新日志 (17e48adcf)
- **rbac:** 优化openapi.config的配置 (054f1bc12)
- **vite:** 更新openapi相关依赖的版本并优化配置文件 (44201afaa)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- 王炜毅@<wangweiyi_ty@163.com>
- Nancy12138@<349567497@qq.com>
- Werheng@<vhang97@163.com>

## v0.9.7-beta.2


### 🚀 Enhancements

- **rbac:** 补充个人偏好设置的动画数据 (2ddb20d4a)
- **rbac:** 角色管理 选择资源时，树形后面增加操作按钮 (b4c933467)
- **rbac:** 其他配置页面逻辑处理实现 (b6906d3a6)
- **rbac:** 菜单级别修改 (54cae90e0)
- **rbac:** 增加请求实例对blob格式的判断 (6d0694f5a)
- **rbac:** 接口更新 (eb4795290)

### 🩹 Fixes

- **rbac:** 群组管理-成员选择搜索icon更换 (3eb347a5f)
- **rbac:** 修复部分测试bug (3f2dce8b3)
- **rbac:** 修复组织管理测试bug (a958038df)
- **project:** 主题设置页面高亮样式修正 (c0b6eeafa)

### 🏡 Chore

- **rbac:** 端口更改 (60d240c2d)
- **rbac:** 工具栏页面代码优化 (6ed2d263d)
- **rbac:** 优化面包屑配置页面代码 (63ee53ec0)
- **rbac:** 面包屑、标签栏、页面动画配置页代码优化 (f51069c9a)
- **other:** 更新日志 (34ec21d8e)
- **rbac:** 优化类型推导 (97cc5eb66)
- **other:** 更新日志 (f94ab0215)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>
- 王炜毅@<wangweiyi_ty@163.com>
- Nancy12138@<349567497@qq.com>

## v0.9.7-beta.1

### 🩹 Fixes

- **vite:** 修复冷启动变慢问题 (feee00b4c)
- **rbac:** 字典管理编辑时，不允许修改类型编码 (cd27c9c2c)
- **rbac:** 优化资源管理及组织树组件, 并更新表格组件版本 (87339719c)
- **rbac:** 修改新增资源时的parentId默认值 (26b3ec89a)
- **rbac:** 组织接口入参parentId为空 (0b81bef0c)
- **rbac:** 用户管理增加对某个字段为空时的处理 (7fb23a272)
- **rbac:** 解决用户管理新建按钮权限码错误的问题 (354056d93)
- **rbac:** 解决用户管理授权时的错误校验未及时消失的问题 (849d7eec0)
- **rbac:** 去除路由图标 (3dce69b20)
- **rbac:** 测试bug修改 (c88ea85c9)
- **rbac:** 修改组织管理无法重置的问题 (07e9de287)
- **rbac:** 修改字典菜单路由问题 (3c2463b40)
- **project:** 去除黑白名单页面滚动条及控制台警告 (b365a3d5a)
- **rbac:** 修复字典页面刷新不会展开侧栏的bug (1914898b2)
- **project:** 黑白名单国际化菜单名修复 (1b9a59cda)
- **rbac:** 修改编辑时上级展示问题 (d0b4e90e5)
- **rbac,vite:** ⚠️  修复基于openApi自动生成函数重复率较高问题 (d73180fb1)
- **rbac:** 群组中使用的接口进行更新 (b2f56ea90)
- **rbac:** 导航栏配置页面隐藏，使用默认页面 (947451b35)
- **rbac:** 颜色配置修改 (882d0a1d4)
- **rbac:** 系统配置使用globalSettings (bca76402e)
- **project:** 修正暗色模式下主题配置页面的颜色适配 (48913a0db)
- **rbac:** 系统配置和用户个人配置冲突覆盖问题 (72f2950ad)
- **rbac:** 调整SettingGlobalThemes页面颜色重复vue报重复key的问题 (ab67ab97f)
- **rbac:** 修复在全局主题配置下,样式冲突问题 (0eb2539ce)
- **rbac:** 修复lodash-es没有默认导出的类型问题 (bee48fe12)
- **rbac:** 组织管理自测问题修改 (3b0dae95e)
- **rbac:** 修改路由区域权限配置问题 (02fdfb1b3)
- **rbac:** 选中所有子集数据缓慢时 添加过渡动画 (86492bf7e)
- **rbac:** 修复导航栏页面样式异常问题 (849dea5ad)
- **rbac:** 部分类型未添加 (3c54a1a68)
- **rbac:** 组织管理页面样式调整 (ce53199ab)
- **rbac:** 自测样式问题修改 (662d50c5d)
- **rbac:** 修复群组类型错误 (0fe132893)
- **rbac:** 修复lodash-es的问题 (85ac5c260)
- **script:** 解决在没有初始化git的情况下, 找不到工作区根目录的情况 (fb54499b0)
- **project:** 回退unocss的版本,最新版导致冷启动速度变慢 (54389e4c6)
- **eslint-config:** Eslint 自定义插件暂时抹除 (59f2bb7c4)
- **rbac:** Ref 函数入参el增加类型 (eba80da8f)
- **rbac:** 修复组织管理页面 (9106b00e5)
- **rbac:** 修复动画json文件导致的transform时间过长问题 (cca8c0893)

### ❤️ Contributors

- Werheng@<vhang97@163.com>
- Nancy12138@<349567497@qq.com>
- Weiyafei@<2553241022@qq.com>
- 王炜毅@<wangweiyi_ty@163.com>

## v0.9.6


### 🚀 Enhancements

- **admin:** 初始化admin (410940c0b)
- **rbac:** 新增岗位管理页面 (ec2e126ba)
- **other:** 移除admin (96d092fac)
- **rbac:** 增加群组页面初始代码 (bb20dd918)
- **vite:** 调整vite maxParallelFileOps 防止内存溢出 (d9acd2b5f)
- **vite:** 将ant-design 相关依赖添加预热 (9dcd099a9)
- **vite:** 将ant icon的组件依赖添加入 optimizeDeps (7a357fcad)
- **rbac:** 区域管理初始代码提交 (2b3920a5e)
- **rbac:** 调整AppSetting组件的子组件为异步组件 (18b12745a)
- **rbac:** 将setting配置组件转为异步 (12341bab6)
- **vite:** 调整optimizeDeps (7e413ba6d)
- **rbac:** 区域管理页面代码提交 (7afede385)
- **rbac:** 权限管理系统关闭移动端自适应功能 (88d91eedf)
- **rbac:** 添加路由演示demo (40dc74a7d)
- **rbac:** 添加面包屑当行路由演示demo (43b263650)
- **rbac:** 调整router类型 (581a00366)
- **other:** 提升vue-tsc版本 (f61743743)
- **rbac:** 移除iframe 演示模块 (517bec2c0)
- **other:** 调整tsc的版本 (6a3d1fa25)
- **rbac:** 调整rbac的clean指令 (5abde1cb3)
- **vite:** 增加外部config配置功能 (65920c6c5)
- **rbac:** 群组页面选择成员：组织提交 (41f338d75)
- **vite:** 调整运行时环境变量的配置 (f5c7abf9d)
- **rbac:** 字典管理启用状态默认改成true (ecaebf393)
- **rbac:** 区域接口调试+群组页面逻辑调整 (e154e00e7)
- **rbac:** 全局ProTable表格组件样式覆盖 (50c3b0f67)
- **rbac:** 路由层级调整 (8780d76a3)
- **project:** 黑白名单相关页面及组件提交 (d9cf833f0)
- **project:** 黑白名单页面操作按钮添加权限 (d95d2b90d)
- **meta:** 增加metadata相关配置JSON (8797eae25)
- **rbac:** 添加项目 pro-components 样式覆盖 (a8586dc29)
- **rbac:** 调整菜单栏样式 (8a83eac2a)
- **rbac:** 添加activeIcon 为system-point时候的默认样式 (006179042)
- **rbac:** 调整标签栏和工具栏默认高度 (bd9a59826)
- **rbac:** 在tabar激活时排除system-point (b398b7196)
- **project:** 黑白名单拆成两个页面 (c6df96474)
- **rbac:** Tabbar 记忆功能开启 (e19245c2b)
- **rbac:** 添加安全管理配置菜单 (11d191b85)
- **rbac:** 添加lottie 动画支持 (5f613a450)
- **rbac:** 将rbac提取到全局做配置 (4dce6b4e7)
- **themes:** 抽离themes到全局环境 (ff7a86789)
- **rbac:** 调整安全名单的样式 (5244ad3fc)
- **rbac:** 调整个人设置管理 (cf983eee6)
- **rbac:** 调整用户配置显示字段 (1cafce147)
- **rbac:** 添加 watchDiffObject 去识别setting的变更最小集 (c624f9c5e)
- **rbac:** 移除watchDiffObject 的clone函数 (ec49002a2)
- **rbac:** 优化角色关联弹窗的表格高度 (9814c8165)
- **rbac:** 调整动画配置信息 (a781ea886)
- **rbac:** 添加系统配置菜单组 (f5ab1e06e)
- **rbac:** 岗位管理功能接口调试 (95766f98a)
- **rbac:** 修改lottie动画 (69c07546a)
- **rbac:** 用户创建时需要可选岗位 (0bd887efa)
- **rbac:** 增加布局配置页面 (7b297558b)
- **rbac:** UseLottie 调整参数,添加暗色 亮色的 animationData (1a749e758)
- **rbac:** 调整导航栏模式页面的布局样式 (ebff913b5)
- **rbac:** 布局页面配置 (85bd838f4)
- **rbac:** 调整rbac 鉴权类接口 (fb445de69)
- **rbac:** 页宽设置页面实现 (42b12d3de)
- **rbac:** 完成用户管理和资源管理的接口替换 (692bac1e9)
- **rbac:** 接口名称更改 (abf638379)
- **rbac:** 添加个人配置和系统配置 (fae3aecbd)
- **rbac:** 页面动画配置与导航栏配置静态页面实现 (8b3826386)
- **rbac:** 调整系统下拉暗黑主题 (df2790bde)
- **rbac:** Tools 暗黑切换关联个人设置 (47ea286ba)
- **rbac:** 水印设置添加到安全管理组 (7804aee5d)
- **rbac:** 接口更改 (6086e08a8)
- **rbac:** 开放群组菜单 (77f16f87f)
- **rbac:** 移除个人配置的tools控制 (ed5e3d6e2)
- **rbac:** 添加接口 (3eaec126c)
- **rbac:** 页宽设置代码提交 (a6302ce49)
- **rbac:** 添加个人偏好设置提示 (b37aaf3d0)
- **rbac:** 修改菜单名称 (8845a08c1)
- **rbac:** 页面切换动画设置提交 (529f9eaec)
- **rbac:** 获取获取系统默认配置项 (3101f948a)
- **rbac:** GlobalSettings 添加类型 (d7b55de90)
- **rbac:** Tabbar超长后提示字符时长缩小 (09e1e1a15)
- **project:** 主题配置静态页面开发完毕 (c187241de)
- **rbac:** 导航栏设置页面实现 (c64cf74cf)
- **project:** 主题配置接入接口 (e9114223e)
- **rbac:** 调整scss 废弃语法 (34a441dd3)
- **rbac:** 修复scss一些废弃语法 (3801aecea)
- **rbac:** 添加系统设置被个人设置覆盖下的提示 (0bcf47f42)
- **rbac:** 配置系统设置拦截器 (6d11b2704)
- **rbac:** 添加拦截器 (31e2fff1a)
- **rbac:** 调整系统配置页面覆盖逻辑 (1aded88ee)
- **rbac:** 调整菜单位置和权限标识 (1fc7710ba)
- **rbac:** 调整布局收起下菜单透明问题 (65fb7439d)
- **rbac:** Menu的菜单point修复显示不正常问题 (25be897d1)
- **rbac:** 添加vue-tsc 作为打包校验 (61c6299bc)
- **rbac:** 调整标题 (e72b0989a)
- **rbac:** 添加enableSettingPreferences 全局配置开关 (be1d821a1)
- **rbac:** 升级相关依赖 (eae73ebd6)
- **rbac:** 添加test workspace 支持 (f49b8be88)
- **project:** 修改全局 vitest monorepo (bbe80f3a6)
- **project:** 调整root下的ts config配置 (5d16d8066)
- **test-utils,themes:** 调整pkg配置信息 (e8510a3bd)
- **rbac:** 群组管理接口引入 自测问题修改 (c62dda323)
- **rbac:** 组织管理表格使用vxe-table (80a7dc23b)
- **rbac:** 增加选中所有子节点和取消所有子节点的功能 (27e44153c)
- **other:** 提升@pubinfo相关依赖 (a7d3c20c1)
- **rbac:** 移除 table 注释内容 (e02c099ee)
- **rbac:** 标签栏配置、面包屑配置页面代码实现 (442866707)
- **rbac:** 标签栏配置增加动画数据 (54d26a689)
- **rbac:** 面包屑导航配置设置动画数据 (f85922993)
- **other:** 升级ts和eslint相关的依赖 (76707fbd9)
- **rbac:** 移除 pnpm 的版本限制器 (bb47555f1)
- **rbac:** 扩展打包是node的内存限制 (af5753922)
- **rbac:** 添加pnpm version限制 (73068c3f1)
- **rbac:** 调整版本号 (377deeda0)
- **other:** 提升项目依赖版本 (26f5b570a)
- **rbac:** 关闭mock配置,关闭br配置 (9ac355c81)
- **rbac:** 工具栏配置页面实现 (e23fd79b0)
- **rbac:** 给系统配置的部分页面分配权限 (112463959)
- **rbac:** 调整全局系统配置菜单鉴权 (ac4501c89)
- **rbac:** 标签栏、工具栏、面包屑配置设置权限 (67ee201f9)
- **other:** 升级changelog (ccc095653)
- **rbac:** 页面水印配置代码提交 (915292dbe)
- **rbac:** 其他配置页面实现 (388c567ee)
- **rbac:** 隐藏其他配置菜单 (38722bcb2)
- **rbac:** 移除log配置模块 (dc184ac3d)
- **rbac:** Ip地址切换 (019000d88)
- **rbac:** 调整openapi问题 (081660bac)
- **rbac:** @pubinfo/preset-openapi版本升级 (5f6240f1a)

### 💅 Refactors

- **vite:** 将运行时config.js配置的插件改为依赖引入 (2cb55aea0)
- **metadata:** 修改meta命名为metadata (0a43c017e)
- **project:** 黑白名单接口名称更新 (f10d6238b)
- **rbac:** 调整vitest的目录层级 (9296697bc)

### 📖 Documentation

- **other:** 调整版本 (76f2656f9)
- **project:** 修改标题 (3aa10a43e)

### 🌊 Types

- **rbac:** 添加AMenuDivider的类型 (552ab802c)
- **rbac:** 修正类型问题 (3a58298a5)

### 🏡 Chore

- **other:** 更新日志 (4174c9730)
- **vite:** 更新部分插件版本 (ea6788738)
- **rbac:** 更新接口文件 (20ae438b8)
- **rbac:** 代码优化 (6527ab9e5)
- **vite:** 增加openapi的预设, 调整生成规则 (bc449d789)
- **other:** 更新日志 (683dc9bc6)
- **other:** 更新日志 (e17491a3a)
- **other:** 更新ant-design-vue和pro-components的版本 (3ab766ab4)

#### ⚠️ Breaking Changes

- **rbac,vite:** ⚠️  修复基于openApi自动生成函数重复率较高问题 (d73180fb1)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Nancy12138@<349567497@qq.com>
- Werheng@<vhang97@163.com>
- 王炜毅@<wangweiyi_ty@163.com>

## v0.9.5


### 🚀 Enhancements

- **rbac:** 调整title 和rbac中文名 (4964b8039)
- **rbac:** 新增字典管理页面及功能 (f7e817948)
- **rbac:** Interface没有提交+修改用户名在编辑状态下disabled (00ce59aad)
- **rbac:** 用户管理, 增加多组织的展示方式 (5b5334dcf)
- **rbac:** 增加字典管理菜单 (252578013)
- **rbac:** Vscode推荐插件更新 (e28996d7d)
- **rbac:** 字典数据新开一个页面处理 (d1178f43e)
- **rbac:** 调整mergeTabsBy合并策略 (c6a2fd8eb)
- **stylelint:** 增加对less的支持 (51e102aba)
- **rbac:** 用户管理增加筛选条件 (13e8fbd57)
- **rbac:** 组织管理增加组织名称搜索功能 (882aca9c8)
- **rbac:** 调整settring默认值 (5a84060aa)
- **rbac:** 处理账户锁定的边界情况 (3875a9c31)
- **rbac:** 合并 (325893e3c)
- **rbac:** 调整PubSvgIcon内 transform 类型 (aa8f32ee5)
- **rbac:** 角色操作时，资源使用弹窗处理 (72674cd74)
- **other:** 升级依赖 (a565823c4)
- **rbac:** 增加pro-components组件的调用 (637a88a1c)
- **rbac:** 增加pro-components组件的引入 (a453a2733)
- **project:** 移除 admin 子应用 (37d4abddc)
- **project:** 调整依赖 (285ea8510)
- **vite:** 添加esbuild插件,处理esm转译 (ba67d611a)
- **vite:** Esbuild插件文件夹修改名称 (73ae46fb7)
- **rbac:** 添加文档提示 (5e21c8970)
- **rbac:** 调整登录接口字段 (10e10088e)
- **rbac:** 调整字体 (88cebb784)
- **rbac:** 优化资源管理页面 (8cf386989)
- **rbac:** 调整不同布局下的title大小 (bda42c00b)
- **rbac:** 用户管理接口变化 (9f33fcece)
- **rbac:** 添加切换组织 (2d7255b24)
- **rbac:** 增加角色新增选择资源时右侧已选删除同时清除左侧树选中的功能 (bdce7273b)
- **rbac:** 添加切换组织 (c6cf165c2)
- **rbac:** Tabbar的记忆功能基于用户id和组织id为前缀 (f6cf9752b)
- **rbac:** 用户管理增加重置密码功能 (843d0f359)
- **rbac:** 切换组织页面 (f60f4d9be)
- **rbac:** 添加修改密码页面 (d81275d3f)
- **rbac:** Script指令调整,如果只有一个workspace就直接执行 (38ae56120)
- **rbac:** 调整404,403页面 (ba803c075)
- **rbac:** 调整修改密码页面的icon (ad56d43cc)
- **rbac:** 统一设置Badge属性 (49f18a122)
- **rbac:** 调整登录页布局 (aaf291f76)
- **rbac:** Html link中移除favicon.icon 采用svg (d794a1296)
- **rbac:** 统一调整页面布局 (0918e3b71)
- **rbac:** 调整布局间距 (924f2a3ea)
- **rbac:** 调整整体样式, 用户管理系统独有样式 (e6a1a9ea4)
- **rbac:** 切换组织,图标补充 (c48226293)
- **rbac:** 调整menu的高度 (7c6c7f5dd)
- **rbac:** 调整menu间距 (7ce61fc95)
- **rbac:** 用图标竖线替代div (297fa8c5a)
- **rbac:** 添加幽影黑皮肤 (b194708c5)
- **rbac:** 只在特定皮肤下调整页面容器布局 (228b8184b)
- **rbac:** 调整重置密码icon (7374dd586)
- **rbac:** 添加按钮级权限 (1de208a98)
- **rbac:** 添加pinia持久化 (39ab41d0a)
- **rbac:** 调整部署baseUrl (cf58f7ca9)
- **rbac:** 登录页面增加暗黑风格 (0e5faaa94)
- **components,composables,utils:** 添加clean指令 (a31ee7a89)
- **rbac:** 暂时开始sourcemap (a457e9557)
- **rbac:** 6个非业务页面增加暗黑风格 (2d5df60fd)
- **rbac:** 修改密码修改页暗色风格样式 (f0de87ba8)
- **rbac:** 非业务页面暗色风格调整 (1261f078e)

### 🩹 Fixes

- **rbac:** 修改启用的的label名称为统一为"是否启用" (830ad3635)
- **rbac:** 修改默认启动配置为“true” (5925784c5)
- **eslint-config:** 调整attribute-hyphenation 放开vnode的一些生命周期 (e160df1d4)
- **rbac:** 修复权限路由bug (621309296)
- **rbac:** Interface自动生成 无需手动写入 (393e1353f)
- **rbac:** 用户名包含数字字母以及某些特殊字符 (039b4f0ed)
- **rbac:** 优化资源管理 (769864fd4)
- **rbac:** 修改角色页面bug (7c3d79725)
- **rbac:** 优化用户管理 (fb11dad15)
- **rbac:** 修复组织管理模块的bug (aa650f25f)
- **rbac:** 新增组织校验 (91d910629)
- **rbac:** 合并 (df9fc5c90)
- **rbac:** H去除 (5988f825c)
- **rbac:** 修复下拉选项无法渲染的问题 (bceaa6979)
- **rbac:** 修复用户管理和资源管理的问题 (6f1f658fb)
- **rbac:** 角色编码必选 (1f1962b2b)
- **rbac:** 修改测试bug (9db00a78f)
- **rbac:** OpenApi类型问题引发的报错 (a9351943b)
- **eslint-config:** 调整依赖升级带来的类型错误 (00d235dca)
- **rbac:** 优化用户管理和资源管理页面 (9d635e1dc)
- **rbac:** 修复侧边栏层级不够被遮罩遮挡的问题 (84310e8a7)
- **rbac:** 统一调整各模块层级问题 (168e743bc)
- **rbac:** 移除登出时得redirect 防止切换用户进入403页面 (d21b72f01)
- **rbac:** 后端调整文档导致的openApi扫描报错问题 (58e6d3d1c)
- **rbac:** 资源管理和用户管理页面样式调整 (fbdf5941c)
- **rbac:** 列表样式修改 (0c95a7de5)
- **rbac:** 补全placeholder (b700f7a0a)
- **rbac:** 在1440下不出现横向滚动条 (f9dbcbb82)
- **rbac:** 用户管理优化表单校验规则 (7efe04902)
- **rbac:** 展开后获取一次数据 (cb97a2532)
- **rbac:** 修复持久化缓存问题 (f55abc681)
- **rbac:** 移除页面级别的config-provider (9c814e070)
- **rbac:** 退出的时候瞬间移除了权限,但是路由还未加载,显示403页面的问题 (706a42d19)
- **rbac:** 切换组织页面切断响应式 (82a60cbf5)
- **rbac:** 添加滚动条 (013edf43e)
- **rbac:** 恢复组织管理操作栏 (47a91f4bf)
- **rbac:** 角色新建时默认为启用状态 (149940ba1)

### 💅 Refactors

- **rbac:** 组织管理代码重构 (80fde1662)
- **rbac:** 角色列表更新 (e1658bf0c)
- **rbac:** 组织管理页面代码重构 (588b48ad6)
- **rbac:** 角色选择资源代码优化 (f2bd00359)
- **rbac:** 字典管理相关页面代码重构 (bbffd61af)
- **rbac:** 自测问题修改 (3a20e34bd)
- **rbac:** 优化组织选择组件的代码 (1d2348e2e)

### 🏡 Chore

- **other:** 更新日志 (4701aeaeb)
- **rbac:** 更新接口文件 (7253bcc14)
- **rbac:** 去除字典数据drawer (87d894d9e)
- **other:** 更新日志 (377ef68e6)
- **rbac:** 更新依赖 (cc3ae363c)
- **rbac:** 更新pro-components版本 (5edac5480)
- **rbac:** 更新pro-components版本 (672260331)
- **rbac:** 更新pro-components版本 (c2298a0b9)
- **project:** 升级相关依赖 (7603bd213)
- **rbac:** 合并 (106a00b3f)
- **vite:** 增加unplugin-config插件 (415eb5d2b)
- **vite:** 完善unplugin-config的配置 (98924202c)
- **other:** 提升依赖版本 (f4aa4e72b)

### ❤️ Contributors

- Nancy12138@<349567497@qq.com>
- Werheng@<vhang97@163.com>
- Weiyafei@<2553241022@qq.com>

## v0.9.4


### 🚀 Enhancements

- **rbac:** 调整title 和rbac中文名 (4964b8039)
- **rbac:** 新增字典管理页面及功能 (f7e817948)
- **rbac:** Interface没有提交+修改用户名在编辑状态下disabled (00ce59aad)
- **rbac:** 用户管理, 增加多组织的展示方式 (5b5334dcf)
- **rbac:** 增加字典管理菜单 (252578013)
- **rbac:** Vscode推荐插件更新 (e28996d7d)
- **rbac:** 字典数据新开一个页面处理 (d1178f43e)
- **rbac:** 调整mergeTabsBy合并策略 (c6a2fd8eb)
- **stylelint:** 增加对less的支持 (51e102aba)
- **rbac:** 用户管理增加筛选条件 (13e8fbd57)
- **rbac:** 组织管理增加组织名称搜索功能 (882aca9c8)
- **rbac:** 调整settring默认值 (5a84060aa)
- **rbac:** 处理账户锁定的边界情况 (3875a9c31)
- **rbac:** 合并 (325893e3c)
- **rbac:** 调整PubSvgIcon内 transform 类型 (aa8f32ee5)
- **rbac:** 角色操作时，资源使用弹窗处理 (72674cd74)

### 🩹 Fixes

- **rbac:** OpenApi 接口变化导致的打包报错 (da4f4f0ca)
- **rbac:** 修改启用的的label名称为统一为"是否启用" (830ad3635)
- **rbac:** 修改默认启动配置为“true” (5925784c5)
- **eslint-config:** 调整attribute-hyphenation 放开vnode的一些生命周期 (e160df1d4)
- **rbac:** 修复权限路由bug (621309296)
- **rbac:** Interface自动生成 无需手动写入 (393e1353f)
- **rbac:** 用户名包含数字字母以及某些特殊字符 (039b4f0ed)
- **rbac:** 优化资源管理 (769864fd4)
- **rbac:** 修改角色页面bug (7c3d79725)
- **rbac:** 优化用户管理 (fb11dad15)
- **rbac:** 修复组织管理模块的bug (aa650f25f)
- **rbac:** 新增组织校验 (91d910629)
- **rbac:** 合并 (df9fc5c90)
- **rbac:** H去除 (5988f825c)
- **rbac:** 修复下拉选项无法渲染的问题 (bceaa6979)
- **rbac:** 修复用户管理和资源管理的问题 (6f1f658fb)
- **rbac:** 角色编码必选 (1f1962b2b)
- **rbac:** 修改测试bug (9db00a78f)
- **rbac:** OpenApi类型问题引发的报错 (a9351943b)

### 🏡 Chore

- **other:** 更新日志 (c13a13cd6)
- **other:** 更新日志 (4701aeaeb)
- **rbac:** 更新接口文件 (7253bcc14)
- **rbac:** 去除字典数据drawer (87d894d9e)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Nancy12138@<349567497@qq.com>
- Werheng@<vhang97@163.com>

## v0.9.4-beta.2


### 🩹 Fixes

- **rbac:** OpenApi 接口变化导致的打包报错 (da4f4f0ca)

### 🏡 Chore

- **other:** 更新日志 (c13a13cd6)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.4-beta.1


### 🚀 Enhancements

- **ci:** 添加github action私有化部署 (d9a5e38eb)
- **rbac:** 抽离用户协议模块 (ad846cffa)
- **rbac:** 验证码登录 (64c611860)
- **rbac:** 添加手机号登录,浙政钉登录,微信扫码登录等功能 (b5deaebd3)
- **rbac:** 调整默认登录项目,修改为账号密码登录 (181e2efb9)
- **rbac:** 角色,用户移除排序 (0471f69f1)
- **rbac:** 调整系统title等基础信息 (adee821a5)
- **rbac:** 区分404/403,不同的逻辑触发不同的error页面 (d4d45b672)

### 🩹 Fixes

- **rbac:** 调整组织结构查询默认值 (3dad6e5f4)

### 💅 Refactors

- **rbac:** 更新unplugin-openapi并调整部分接口调用逻辑 (8d95e609b)
- **rbac:** 优化页面交互 (6370f3c62)

### 🏡 Chore

- **other:** 更新日志 (bae442f59)
- **other:** 调整vscode的githuby远程源 (3f56128d2)
- **rbac:** 关闭vite app inspector (13169cfc5)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- Werheng@<vhang97@163.com>

## vv0.9.3


### 🚀 Enhancements

- **rbac:** 修改request请求实例错误回调 (964be44ae)
- **rbac:** 调整组织管理布局 (b1db1601c)
- **rbac:** 调整用户管理页面布局 (c1e11f9ce)
- **rbac:** 调整资源管理布局 (2acecd285)
- **rbac:** 调整暗色模式风格 (49a48b745)
- **rbac:** 调整toolsbar搜索功能在不同主题下的样式 (f582bef53)
- **rbac:** 添加修改密码入口 (740e3772d)
- **rbac:** 调整为hash路由模式 (889a26711)
- **rbac:** 调整rbac项目打包目录为rbac (494cbfb2f)
- **other:** 调整gitignore忽悠rbac打包文件 (f3cebc26f)
- **rbac:** 添加vite配置深度合并 (c10b0cd37)
- **ci:** 初始化github action (7d7ac6b0d)

### 🩹 Fixes

- **rbac:** 解决用户管理id重复导致表格数据异常的问题 (743e3009e)

### 💅 Refactors

- **rbac:** 优化用户管理中的交互逻辑 (8bfac24c2)
- **rbac:** 角色和组织管理删除弹框修改 (029789162)

### 🌊 Types

- **rbac:** 调整auto components插件导入的类型 (7af4753cd)

### 🏡 Chore

- **other:** 更新日志 (595f945af)
- **other:** 调整changelog日志信息 (3dfa83c63)
- **vite:** 更新unplugin-openapi版本 (05f0db02c)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- 叶小鹏@<helloye1024@foxmail.com>
- Werheng@<vhang97@163.com>

## v0.9.3-beta.6


### 🚀 Enhancements

- **other:** Github 提交时间问题,移除 (1e69d9493)
- **other:** 添加Badges (ff85a9852)
- **other:** Badges补充 (3b29107ac)
- **rbac:** 增加alova实例配置, 并删除openapi-example项目 (42c1cc5ad)
- **rbac:** 添加菜单 (88acf23bc)
- **rbac:** 校验openapi (d9c275abb)
- **rbac:** 添加请求code编码enum (681e6ee81)
- **rbac:** 调整请求实例配置 (2ab1378b2)
- **rbac:** 添加SimplifyDeep类型,深度展开对象类型,获得更好的类型提示 (b4c4f9706)
- **rbac:** 增加资源管理 (d75d25af7)
- **rbac:** 对接资源管理接口 (25d01442f)
- **rbac:** Tabbar固定模式,关闭devtools (56d7b1794)
- **rbac:** 添加菜单图标 (9cd18bde8)
- **rbac:** 给菜单添加多语言支持 (ff57d6aa0)
- **rbac:** 菜单组添加多语言支持 (397616ad1)
- **rbac:** 调整多布局下main头栏和主侧栏文字隐藏 (0bf126ad2)
- **rbac:** 主菜单调整样式 (317728a60)
- **rbac:** 调整系统名称 (5d4c74574)
- **rbac:** 跳帧主题色 (43da695a4)
- **rbac:** 侧栏配置调整为圆角 (ce4979655)
- **rbac:** 调整主题色的名称 (53bc3e3aa)
- **rbac:** 头部搜索按钮跟随主题色变化 (8dcc4fd6a)
- **rbac:** 面包屑添加应用前缀 (477959227)
- **rbac:** 完成资源管理的增删改查功能 (8819eaca6)
- **rbac:** Logo调整 (390db8fc8)
- **rbac:** 资源管理增加分配查看抽屉 (587708b3c)
- **rbac:** 调整侧栏图标 (25c9604a7)
- **rbac:** Setting bar按钮 修改样式 (86fea2341)
- **rbac:** Login页面基本搭建 (a514fc82e)
- **rbac:** 增加用户管理并优化资源管理 (b99d4d5b4)
- **rbac:** 组织管理页面和接口 (8e901bb39)
- **rbac:** 登录页账号密码登录 (7fe183447)
- **rbac:** 添加最小屏幕登录页适配 (a966b49f3)
- **rbac:** 账号密码登录 (b35778c86)
- **rbac:** 密码强度校验 (37872adf1)
- **rbac:** 修改密码安全校验 (a32f8e243)
- **rbac:** 修改密码功能 (b231f2de0)
- **rbac:** 登录存储token (b9f63cb0e)
- **rbac:** 登录逻辑调整 (d16350ea4)
- **rbac:** 添加头像 (dee09581b)
- **rbac:** 用sleep函数替换定时器 (fb23e0dcd)
- **rbac:** 添加token过期后,使用refreshToken刷新token (8f7a74d57)
- **rbac:** 请求实例添加注释 (8b2e080dd)
- **rbac:** 添加演示系统 (6ea077ccd)
- **rbac:** 调整change password页面鉴权模式 (9322ac883)

### 🩹 Fixes

- **rbac:** 调整rbac页面问题 (40d26f1b8)
- **rbac:** 修复tabbar移除时候报空指针 (c03f150ff)
- **rbac:** Alove类型覆盖,修复实例中类型错误 (024701eb7)
- **rbac:** 调整mock修改后,类型报错问题 (6ddb00618)
- **rbac:** 移除未使用的组件, 自动引入未添加类型 (8404bfc0a)
- **rbac:** 解决树选择加载问题 (a96b06c1a)
- **project:** 修复i18n-ally在monorepo下不支持问题 (286af7900)
- **rbac:** 修复组织管理刷新表格数据展开行没恢复的问题 (0ad746616)
- **rbac:** 用户管理增加组织选择组件 (0fe1acbc7)
- **rbac:** 角色管理新增页面修改 (18b872d3d)
- **rbac:** 修改角色管理中列表的字段名称 (9caacc7fc)
- **rbac:** 布局高度调整, 需每个页面自定义滚动内容 (ab033b12a)
- **rbac:** 修复文件路径报错问题 (382b7032d)
- **rbac:** 添加系统ico图标 (b691e3221)

### 💅 Refactors

- **rbac:** 优化用户管理的交互 (5fa1d686a)
- **rbac:** 组织管理代码优化 (c7832a265)
- **rbac:** 组织管理弹窗名称错误问题 (2f1cf4b64)
- **rbac:** 优化部分页面样式 (be002b267)
- **rbac:** 组织管理代码优化 (7852b0c9c)
- **rbac:** 优化资源和用户管理的部分交互 (99b791a32)
- **rbac:** 调整修改密码代码逻辑 (dc544bef4)
- **rbac:** 调整文件结构 (aad5dc601)
- **rbac:** 组织管理表单需求优化 (5f1fc505d)
- **rbac:** 调整login目录层级 (95321b8d0)
- **rbac:** 在refresh失效之后, 暂时不提供msg信息 (14468c397)
- **rbac:** 调整鉴权拦截器 (f32bdeada)
- **rbac:** 调整change password页面hooks (9b92abcc2)

### 📦 Build

- **other:** 修复lock文件 (d652127d9)

### 🌊 Types

- **vite:** Vite-plugin-fake-server 参数类型补充 (bb0549324)
- **rbac:** 生成的类型提交 (286ee309b)
- **rbac:** 添加http请求异常时候 error断言 成httpError (60421fe83)

### 🏡 Chore

- **changelog:** 更新日志 (554ae9215)
- **openapi-example,vite:** 增加openapi插件及相关功能 (f3bf4f23f)
- **rbac:** 增加openapi指令生成, 并生成rbac接口 (76bfe6e55)
- **tsconfig:** 增加对jsx的支持 (b2b5bc26c)
- **rbac:** 生成接口文件覆盖 (12ef91c04)
- **rbac,vite:** 更新openapi插件版本, 并重新生成接口文件 (86f5f8df2)
- **rbac:** 更新接口生成文件 (ee63f70c0)
- **rbac:** 更新接口及临时token (0a9d31845)
- **rbac:** 更新接口文件和自动引入 (b836f4d97)
- **project:** 依赖版本提升 (20ecc6ff3)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>
- 叶小鹏@<helloye1024@foxmail.com>
- Werheng@<vhang97@163.com>
- Cj1779@<cj19921779@163.com>

## v0.9.3-beta.5


### 🚀 Enhancements

- **other:** 添加github action (1c5bd402)

### 🩹 Fixes

- **other:** 调整github action (a02c470c)

### 🏡 Chore

- **other:** 更新日志 (8f8f8067)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.3-beta.4


### 🚀 Enhancements

- **other:** 移除无用依赖 (0c226da8)
- **other:** 更新相关依赖 (d58aea38)

### 📦 Build

- **other:** Typescript 版本锁定,eslint-typescript不支持太高版本 (30b6d932)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.3-beta.2


### 🚀 Enhancements

- **admin:** 添加简单的登录 (3a45becf)
- **rbac:** 建立rbac (3867e30a)
- **changelog:** 添加prepack指令 (65a7390f)
- **script:** 调整快捷指令的样式 (2764e5fb)
- **vite:** 添加vue调试的开关 (ec941f61)
- **openapi-example:** 添加openapi示例工程 (4fb7be40)
- **script:** 添加 script build命令,可多选选择要打包的系统 (c6bcbc19)
- **project:** 系统依赖升级 (9945a9d8)

### 💅 Refactors

- **script:** 调整workspace逻辑 (c01ce0b5)

### 🌊 Types

- **admin,rbac:** 添加相关组件类型 (d20a58f1)

### 🏡 Chore

- **changelog:** 更新日志 (a60ff276)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.3-beta.1


### 🚀 Enhancements

- **vite:** 添加clientFiles 提高编译速度 (3e241f3)
- **admin:** 替换element 为 antdesign (d3299c9)
- **admin:** 抽离provider组件 (c9e6893)
- **other:** 调整root packages信息 (12f40c7)
- **vite:** 添加optimizeDeps优化 (465c7df)
- **project:** 全局添加pub指令,快捷执行模块的scripts (210ec58)
- **admin:** Ui框架颜色和语言设置 (d62efac)
- **admin:** Ui主题色的设置 (901dfee)

### 🔥 Performance

- **vite:** 调整warmup配置 (971dbf1)

### 🩹 Fixes

- **changelog:** 添加多入口,修复cli文件打包不成功问题 (8e4adea)
- **admin:** 忽略vite生产环境的临时文件 (74d9a22)

### 🏡 Chore

- **changelog:** 更新日志 (e73046c)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.2


### 🚀 Enhancements

- **changelog:** Changelog 只铆钉在tag之间的提交 (6d8def5)
- **script:** 选择仓库执行dev操作 (c78748b)

### 📖 Documentation

- **project:** 移除CHANGELOG.md (1171892)

### 📦 Build

- **changelog:** 移除changelog (a3a581e)

### 🏡 Chore

- **changelog:** 更新日志 (af330cb)
- **changelog:** 更新日志 (742e7d0)
- **changelog:** 更新日志 (6182ca4)
- **changelog:** 更新日志 (bd1ca55)
- **changelog:** 更新日志 (f95df58)
- **project:** 更新依赖项 (b1acfee)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.1


### 🏡 Chore

- **changelog:** 更新日志 (e3309c0)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.9.0


### 🏡 Chore

- **changelog:** 变更commitlint配置 (08e43be)
- **project:** 调整bummp的执行逻辑 (51c9607)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.5


### 🚀 Enhancements

- **script:** 获取apps下项目名称和项目路径 (18382df)
- **script:** 添加快速选择项目执行dev操作指令 (f447cc2)
- **changelog,changelog:** 添加changelog模块 (7f11255)
- **changelog,changelog:** 提交version的时候自动改变changelog (4e8b487)

### 🩹 Fixes

- **admin:** 修复admin模块下themes 路径错误问题 (a83f0c6)

### 💅 Refactors

- **script:** 调整workspace选择函数逻辑 (3cd6e41)
- **changelog,script,project,changelog:** 调整依赖的层级 (f09f5ae)

### 📖 Documentation

- **project:** 重新提炼changelog日志 (7ffec9a)

### 📦 Build

- **project:** 调整npmrc (7939449)

### 🌊 Types

- **project:** 调整.vue模块的类型声明 (7dd9498)

### 🏡 Chore

- **changelog:** 更新日志 (ba72de6)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.4


### 🚀 Enhancements

- **admin:** 更新components.d.ts (5e31cf5)
- **project:** 将配置提升到全局 (64e8bbb)
- **project:** 升级依赖 (29d3803)

### 💅 Refactors

- **vite:** 抽离vite模块内辅助函数 (6229315)

### 🏡 Chore

- **vite:** 移除无用依赖 (5a97404)
- **other:** Changelog update (930a2e1)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.3


### 🚀 Enhancements

- **directives:** 全局指令自动引入,子项目内的指令手动引入 (4819669)
- **admin:** 调整auto components配置 (c562c58)

### 🏡 Chore

- **other:** Changelog update (cdd2da5)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.2


### 🚀 Enhancements

- **vite:** 全局组件捕获名称支撑不同格式名称 (d57cd2b)
- **admin,components:** 业务组件内的SvgIcon组件移入全局组件 (88f02f6)
- **components:** 添加全局PubFixedActionBar 组件 (b86be36)
- **components:** 添加PubListLayout全局组件 (ef081a6)
- **components:** 添加全局PubPageHeader 组件 (422b395)
- **components:** 添加全局PubPageMain组件 (6d127ea)
- **components:** 添加全局组件PubSearchBar (12e704a)
- **components:** 添加全局PubTrend组件 (cdf6b92)

### 🏡 Chore

- **other:** Changelog update (ec96447)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.1


### 🚀 Enhancements

- **scripts:** 调整scripts下的tsconfig (6170535)
- **cmd:** 添加cmd monorepo (8fb1214)
- **cmd:** 更新CHANGELOG文档后自动提交 (1209ef6)
- **project:** 调整版本号,修复zx相关问题 (1d0bbad)
- **vite:** 添加vite info插件 (70453d4)
- **vite:** 添加vite info插件 serve服务print样式 (a90540a)
- **vite:** 添加info 插件信息提示 (1e6b3ef)
- **vite:** 移除info 中的无用代码 (befc5a3)
- **components:** 自动引入@pubinfo/components下组件 (07e1ab4)

### 🩹 Fixes

- **cmd:** 修改bash问题 (abbc517)
- **cmd:** 路径捕获错误 (0a2c92a)

### 🏡 Chore

- **other:** Changelog更新 (35df7e9)
- **other:** Changelog update (22dc9d8)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.8.0


### 🚀 Enhancements

- **project:** 配置npmrc 作用域提升 (c17043c)
- **admin:** Browserlistrc文件移入admin内,legacy抓取路径在子模块内 (5f5e270)
- **directives:** 添加directives monorepo子模块 (4d4870b)
- **project:** 初始化compoents monorepo包 (63e5ca9)

### 📖 Documentation

- **project:** 更新changelog (8ce4858)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.7.6


### 🚀 Enhancements

- **project:** 调整project下指令顺序 (2abed2c)

### 📦 Build

- **project:** 调整packageManager 控制版本号 (9951f32)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.7.5

### 🚀 Enhancements

- **ci:** 添加changelog指令 (0821c0c)

### 📖 Documentation

- **project:** 调整changelog指令 (08c0846)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.7.4


### 🚀 Enhancements

- **project:** 调整root目录下 scripts指令顺序 (b0e8cf3)
- **project:** Npmrc添加link-workspace-packages (005d1ce)
- **project:** 依赖版本管理控件 (5b5b0c7)
- **project:** 添加依赖更新预览指令 (e55289d)
- **project:** 调整commit scopes (483da72)

### 🩹 Fixes

- **vite:** 修复获取vite依赖时的问题 (07d3d25)

### 📖 Documentation

- **project:** 添加changelog (787e756)

### 🏡 Chore

- **other:** 调整 commitlint prompt 提示信息 (ad4108c)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>

## v0.7.3


### 🚀 Enhancements

- **build:** Simple-git-hooks 添加 preserveUnused (2d09c0b)
- **project:** Test (b2d2435)
- **project:** 添加node版本检测,logo 打印 (62b0580)
- **views:** 系统默认配置调整 (87792fb)
- **project:** 添加logo (688f32c)
- **views:** 添加ico文件 (3bc68bd)
- **project:** 添加unocss 的eslint校验 (b0bd106)
- **project:** Eslint 配置调整 (94abfa7)
- **assets:** 修改logo (4040d8f)
- **views:** 添加@unocss/reset (dd99415)
- **project:** Vscode插件配置推荐添加file-nesting (ca88202)
- **project:** Eslint 规则预览器 (45f5794)
- **vite:** 添加vite-plugin-scssPreprocessor (20bb849)
- **vite:** 打包产物较大文件切割 (fa28a7b)
- **router:** 调整router的权限校验 (9ae782d)
- **project:** 添加部署指令 (caa1d56)
- **views:** 将hash路由替换为History路由 (7b625e3)
- **router:** Router 路由守卫模块 (b2ade1c)
- **views:** Favorites 功能 (42b6d75)
- **views:** 打开iframe 控制 (e5e7e85)
- **router:** 讲iframe组件配置为在router中可以是一个函数 (59286be)
- **router:** 路由iframe类型调整为可以接受一个异步promise (a415341)
- **store:** KeepAlive模块功能 (42626ec)
- **store:** Menu菜单模块-基于文件留有 (2d4eb49)
- **store:** 消息通知模块 (ba95d9d)
- **project:** 添加debugger配置 (925eb49)
- **project,views:** 添加log功能 (398a7e8)
- **composables:** 添加log相关hooks (050e141)
- **project:** 将composables下hooks自动导入 (f5448fc)
- **project:** 讲Element-plus改为按需导入 (bf7ce4c)
- **views:** 将多级路由对象拍平成二级 (ed0f1af)
- **router:** 修改变量名称,更符合语义化 (a6d33c8)
- **router:** 新增文件路由功能 (8282455)
- **store:** InitPermanentTab 内添加createTab函数,抽离逻辑 (d66702a)
- **store:** Tabbar功能添加 (9b2e7de)
- **project:** 调整vue文件 eslint规则 (7c7764f)
- **project:** 添加remade文件 (6ce71c9)
- **project:** 测试window下lint GUI效果 (f5a1bcf)
- **project:** 添加.env文件配置公用的配置 (23bc811)
- **views:** UseGetComputedStyle 函数控制调整 mainSide和subSide (c1686dc)
- **composables:** 添加暗黑色系 (6c65bed)
- **vite:** 使用 vite-plugin-vue-devtools 作为调试插件 (fe9bef9)
- **project:** DefineModel现已稳定,修改vue-plugin的配置 (1d6ce31)
- **project:** 添加vitest,test测试文件 (90c1e57)
- **vite:** 编写 unocss的 preset,定制化主题色 (327f526)
- **vite:** 调整unocss的预设 (385896b)
- **project:** 移除无用资源 (b32fb4c)
- **project:** 添加postcss 预设postcss-preset-env (5d3d933)
- **project:** 全局style调整 (1b9b0c9)
- **vite:** 调整unocss预设 (fcefd82)
- **project:** 调整主题色转变的问题 (acb9323)
- **layouts:** 添加全局主题色组件 (3788c5d)
- **layouts:** SettingMode模块 (73d1ec0)
- **layouts:** 调整页面布局设置页面 (45df453)
- **project:** 调整stylelint (a933745)
- **project:** 用vite-plugin-fake-server 替换 vite-plugin-mock (afff995)
- **store:** Store user的id转为enum值 (1638464)
- **views:** 侧栏设置页面 (f731067)
- **project:** 调整底部版权信息 (1851fab)
- **vite:** 通过插件提供scss全局配置 (f8e15a0)
- **project:** 使用fast-glob替换glob (f8194ca)
- **vite:** 调整cssPreprocessor插件的名称 (ebbbec0)
- **components:** 添加DayNightSwitch组件 (79fc54e)
- **components:** Setting中使用定制化的checkbox组件 (3064adf)
- **layouts:** 调整主题色选择插件 (97792d8)
- **assets:** Update primary and active colors in light theme (4fc79b6)
- **components:** Add DayNightToggle component (df82cac)
- **vite:** Add configDeps to presetThemes.ts (8fe6d44)
- **project:** 研发云适配 (162e4f0)
- **project:** 添加.npmrc文件 (e355610)
- **project:** 添加适配研发云的指令 (60becc4)
- **vite:** Add zip functionality to build process (cfc3291)
- **vite:** Update zipPack function in zip.ts (20cef1f)
- **project:** Update srdcloud script in package.json (435726f)
- **project:** Add themesPath to configDeps (640e9bd)
- **project:** Update header height and font size (3316d4b)
- **layouts:** Remove commented out code for theme toggle (d2e33dc)
- **project:** Add unplugin-icons dependency and update version (c0a6f67)
- **project:** Update SVG icon names (3188709)
- **project:** Update icons in various files (bbe51d6)
- **composables:** Add useTitle composable for dynamic page titles (51176ce)
- **composables:** Refactor global system info registration (a2c9201)
- **project:** Add dark and light themes for element-plus (9d1b34c)
- **project:** Update el-mask-color-extra-light value in dark theme (c8de162)
- **views:** Remove buttons from level2/page.vue (8fee2a2)
- **i18n:** 调整国际化插件配置 (66370e5)
- **project:** 调整水印前缀 (98768e4)
- **vite:** Feat: 引入 unplugin-turbo-console 优化开发体验 (c9eba2a)
- **vite:** 关闭跳转编辑器 (a9d1628)
- **composables:** 添加hooks的注释 (6fb1ca3)
- **composables:** 调整usePagination的逻辑 (7c32ff4)
- **project,views:** 清除无用代码 (e4bf91b)
- **api:** 接口层调整 (d7e352a)
- **store:** 调整收藏功能 (bdf0e17)
- **store:** Menu菜单逻辑 (df61e63)
- **router:** 侧单栏支持直接svg name作为可选项 (26767f7)
- **router:** 调整router icon图标 (db4d307)
- **components:** 添加收藏功能 (d90f3ff)
- **layouts:** 调整收藏夹功能 (e89a6c2)
- **layouts:** 添加Topbar组件 (584f272)
- **layouts:** 调整收藏提示 (a5b90da)
- **layouts:** Tabbar逻辑调整 (65d76fe)
- **layouts:** 调整tools工具栏图标 (833283a)
- **layouts:** 调整消息通知组件 (4a618f1)
- **layouts:** 调整个人设置页面逻辑 (fdf38d7)
- **layouts:** 调整图标引入方式 (5cab685)
- **layouts:** 讲icons的在线引入方式全部移除 (1923ee4)
- **layouts:** 调整layout布局 (c15cc93)
- **components:** 移除无用代码 (c1c25c8)
- **router:** 添加登录页逻辑 (a88220c)
- **store:** 调整文件路由的tabbar (4daff26)
- **router:** 针对文件路由,添加volar的增强 (785442d)
- **router:** 调整createRouter (1b0889e)
- **store:** 调整router store的逻辑 (c4ccec3)
- **router:** 添加泛型用以修饰多参数问题 (6d3b3be)
- **project:** 调整测试文件名称 (dac8bef)
- **project:** 添加coverage覆盖率测试 (ffbe81e)
- **project:** 添加coverage预览 (4ed4b1f)
- **project:** 添加fireEvent键盘事件触发器 (7378200)
- **project:** 用bootstrop替换createApp (75ff4d9)
- **project:** 添加tests的文件alias,添加tsnode对于*.spec.ts文件的类型支持 (8edbee7)
- **router:** 添加@ts-expect-error和相关描述,文件路由和modules路由不可共存 (c1ad006)
- **project:** 调整commitlint scope规则 (8b8e96f)
- **project:** 调整commitlint scope-empty校验 (1dc1ec7)
- **project:** 调整bumpp规则 (103728a)
- **views:** 添加useUrlParams 钩子处理免登等url参数相关逻辑 (5a30709)
- **project:** 项目改为monorepo (8c0266e)
- **project:** 讲eslint装载入@pubinfo-eslint (11ec691)
- **project:** 移除volar配置文件 (03359c6)
- **project:** 创建@pubinfo/stylelint (3b45b3a)
- **project:** Main 挂载vue改为异步自执行 (546ff3d)
- **project:** Engine 控制的环境配置调整为强制 (02bbca3)
- **project:** 项目调整为monorepo架构 (f6d5d77)
- **project:** 调整monorepo下的eslint校验规则 (66cbe14)
- **project:** 调整packages下的配置 (03c6902)
- **project:** 移除demo文件 (a5e198b)
- **project:** 调整monorepo的文件结构 (9f50982)
- **project:** 修改lint包的打包文件名 (4e163e1)
- **project:** 统一设置turbo的build (19266da)
- **project:** 调整全局lint配置 (7d16f5a)
- **project:** 讲vite配置迁移到monorepo组下config (989f2c6)
- **project:** Vite 依赖归集到 monorepo/vite (c8dc682)
- **vite:** 讲vite插件重新隔离到monorepo下 (9e3b4c3)
- **project:** 调整postainstall之后逻辑 (db5fa11)
- **project:** Root目录添加 reinstall指令 (2910d9c)
- **project:** 添加tip提示 (c508ca3)
- **project:** Vite 导出文件添加 用户配置参数 (3f1125b)
- **vite:** Admin项目下 配置@pubinfo/vite 导出文件 (90e4e7d)
- **project:** Trubo配置文件添加打包文件作为打包缓存key (89cb3e8)
- **project:** 调整turbo日志级别 (a393d02)

### 🩹 Fixes

- **project:** 修复git hook在tty检测为false的行为 (2939fb7)
- **vite:** Unocss类型调整 (2d683f9)
- **project:** Vite-plugin-mock 报错修改 (a666c7c)
- **build:** 为tsx提供 unocss 能力 (4c92552)
- **assets:** Favicon.ico 权限不足问题 (8eb5858)
- **router:** 路由无name, 造成死循环问题 (4dc0511)
- **router:** 路由 iframe组件 closeLoading调用失败问题 (689adc2)
- **router:** Iframe组件函数返回值包含Promise (71ab2c3)
- **store:** RouteRecordRaw 的Meta重title变为必填带来的类型错误 (38743c1)
- **project:** Consola 会暴露node的api,移除暴露node api的工具 (c0bea86)
- **project:** 修复 husky GUI失效问题 (f433594)
- **project:** 添加peerDependencyRules管理stylelint 警告 (ede4bf8)
- **vite:** Unocss transfrom 会有大量热更新移除,使用postcss (6f9bcc9)
- **project:** 调整unocss 造成的热更新问题 (bfb3b46)
- **components:** 调整upload组件 (f0103b6)
- **store:** 路由响应式循环调用自身 (950f0f0)
- **store:** 修复导航模式切换到 single 时有几率报错 (c0ca587)
- **store:** Lodash-es在pro环境下 chain返回值不正确的问题 (2c91b83)
- **layouts:** 修复setting mode面板的bug (a68d389)

### 💅 Refactors

- **vite:** 调整vite配置文件 (10d4994)
- **project,env,vite:** 移除cjs模块 (87378ba)
- **build:** 移除系统tag符 (274b215)
- **router:** 讲progress进度条css放入 plgins文件内 (32e4d3a)
- **project:** 排序 import引用 (040ac75)
- **views:** Route store代码重构 (a8612fc)
- **store:** Router 路由代码重构 (4e089e7)
- **store:** 调整store下的 router模块代码 (89a3d0e)
- **router:** 将类型判断用lodash替换 (e52ed5d)
- **components:** 调整Star组件 (677f9e0)
- **project:** 调整main入口代码逻辑 (f9cc4b1)

### 📖 Documentation

- **env:** 调整title (483b8c2)

### 📦 Build

- **project:** 添加构建相关的环境配置文件 (47694a3)

### 🌊 Types

- **project:** 移动type到根目录下 (faf0062)
- **project:** 调整type全局地址 (0523583)
- **env:** 调整tsconfig.json includes范围 (c9df666)
- **project,env,vite:** 修改类型问题 (d9ec128)
- **env:** 调整 Setting 类型的位置,新建setting.d.ts文件 (f1f1093)
- **env:** 调整类型声明细节 (1df8215)
- **env:** 按类型分配d.ts文件 (ddba0fa)
- **env:** 引入 type-fest 模块 (59f028a)
- **vite:** 调整自动引入组件的 type位置 (297b854)
- **router:** RouteMeta 将title设置为必填项 (a933a1d)
- **project:** 调整vite 类型声明到tsconfig.node.json (86777d0)
- **project:** Unocss 的预设类型调整 (6d35e9e)
- **project:** 调整 unocss预设normalizeColor 函数类型 (4de6c11)
- **project:** 调整install after后的提示文本 (96314db)
- **store:** 移除部分any (885137c)

### 🏡 Chore

- **project:** 🔨  git emoji (ab60e1c)
- **project:** 添加package.json引入断言,更符合ESM 规范 (06ef3ca)
- **project:** 依赖版本升级 (d92f931)
- **project:** 依赖版本升级 (b128147)
- **project:** 添加vscode插件推荐 (bc71b83)
- **project:** 调整setting默认配置 (32d9f83)
- **project:** 配置文件和文档提示的默认值校准 (3d1e386)
- **project:** 依赖库版本升级 (488500f)
- **project:** Add light, dark, and classic themes (680cfcb)
- **project:** 添加main中注释 (6e0ebcd)
- **project:** 依赖提升 (ac6aa82)
- **project:** 提升依赖 (09a8da4)
- **project:** 移除@pubinfo/script 无用代码 (17c01a8)

### ✅ Tests

- **project:** 测试husky 提交commit的提示 (0c1352e)
- **project:** 测试vitest服务可用 (af94aa1)
- **project:** 修改测试vitest相关配置 (42685a7)
- **project:** 添加全局router mock (92b84c7)
- **project:** 添加test useSetup 辅助函数 (ae3d9ab)
- **project:** 添加测试router辅助函数 (1175665)

### 🎨 Styles

- **project:** Eslint 扁平化配置 (e29274c)
- **project:** 调整eslint.config.js的配置顺序 (f8d3aa8)
- **vite:** Vite 插件载入逻辑调整 (9f36f92)
- **project:** 添加vue自定义换行eslint插件 (477b214)
- **project:** 适配研发云调整代码格式 (f555c89)
- **project:** Fix browser upgrade display issue (b7cf0fd)
- **project:** Fix eslint configuration and plop templates (b559d3b)
- **project:** Fix eslint rules and prompt validation (a1ee719)
- **project:** Refactor HKbd component styles (50fd5db)
- **project:** Update theme paths and add new light themes (4b33c81)
- **components:** 简化Star组件代码 (220a037)

### 🤖 CI

- **project:** 移除github workspace (c79f641)

### ❤️ Contributors

- Weiyafei@<2553241022@qq.com>


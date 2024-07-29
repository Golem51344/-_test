/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-12-14 09:01:42
 * @LastEditors: wsy
 */

// 全局样式
import '@unocss/reset/normalize.css';
import 'overlayscrollbars/overlayscrollbars.css';
import '@/assets/styles/globals.scss';

// 加载 svg 图标
import 'virtual:svg-icons-register';

// unocss 虚拟模块,提供按需加载能力
import 'virtual:uno.css';

import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupI18n } from '@/locales';
import { setupGlobDirectives } from '@/directive';
import { registerGlobComp } from '@/utils/registerGlobComp';
import { useUrlParams } from '@/utils/useUrlParams';
import { registerIntercept } from '@/utils/registerIntercept';

(async () => {
  const app = createApp(App);
  // 注册全局组件
  registerGlobComp(app);
  // 处理 url 参数,例如免登逻辑之类
  await useUrlParams();
  // 配置 store
  setupStore(app);

  // 配置路由
  setupRouter(app);

  // 拦截器
  await registerIntercept(app);

  // 多语言配置
  setupI18n(app);
  // 注册全局指令
  setupGlobDirectives(app);
  app.mount('#app');
})();

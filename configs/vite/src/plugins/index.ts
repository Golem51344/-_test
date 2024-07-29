/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2024-04-16 14:38:19
 * @LastEditors: Werheng vhang97@163.com
 */
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueLegacy from '@vitejs/plugin-legacy';

import createAutoImport from './auto-import';
import createComponents from './components';
import createUnocss from './unocss';
import createSvgIcon from './svg-icon';
import createI18n from './i18n';
import createMock from './mock';
import createLayouts from './layouts';
import createPages from './pages';
import createCompression from './compression';
import createBanner from './banner';
import createPreprocessor from './preprocessor';
import createZip from './zip';
import createIcons from './icon';
import createConsole from './console';
import createInspector from './inspector';
import createOpenAPI from './openapi';
import createConfig from './config';
import { appInfo } from './info';

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild = false) {
  /* =============================================
  =                    通用配置插件               =
  ============================================= */
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    createPages(),
    vue(),
    vueJsx(),
    vueLegacy(),
    createAutoImport(),
    createComponents(),
    createUnocss(),
    createSvgIcon(isBuild),
    createIcons(),
    createI18n(),
    createMock(viteEnv, isBuild),
    createLayouts(),
    createBanner(),
    createPreprocessor(),
    createZip(),
    createConsole(),
    createInspector(viteEnv),
    createOpenAPI(),
    createConfig(),
    appInfo(),
  ];

  /* =============================================
  =                用于生产环境的插件              =
  ============================================= */

  const buildPlugins: () => (PluginOption | PluginOption[])[] = () => [
    ...createCompression(viteEnv),
  ];

  if (isBuild) {
    vitePlugins.push(...buildPlugins());
  }
  return vitePlugins.filter(Boolean);
}

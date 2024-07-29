import process from 'node:process';
import { resolve } from 'node:path';
import { type UserConfig, defineConfig as defineViteConfig, loadEnv, mergeConfig } from 'vite';
import createVitePlugins from '../plugins';
import { createDefineSystemInfo, getServerProxy } from '../helper/index';
import { cleanse } from '../esbuild/cleanse';

export function defineConfig(defineOptions: UserConfig = {}) {
  return defineViteConfig(async ({ mode, command }) => {
    const root = process.cwd();
    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const env = loadEnv(mode, root);
    const timestamp = new Date().getTime();
    const isBuild = command === 'build';
    const { VITE_OPEN_PROXY, VITE_BUILD_SOURCEMAP } = env;
    const serverProxy = getServerProxy(env, !isBuild && VITE_OPEN_PROXY === 'true');
    const __SYSTEM_INFO__ = await createDefineSystemInfo(root);
    const applicationConfig: UserConfig = {
      base: './',
      server: {
        open: true,
        host: true,
        proxy: serverProxy,
        watch: {
          ignored: ['!**/node_modules/@pubinfo/themes/src/system/**/*'],
        },
        warmup: {
          clientFiles: [
            './index.html',
            './src/{layouts,components}/*',
            './src/locales/**/*',
          ],
        },
      },
      resolve: {
        alias: [
          {
            find: /@\//,
            replacement: `${pathResolve('src')}/`,
          },
          {
            find: /#\//,
            replacement: `${pathResolve('types')}/`,
          },
        ],
      },
      optimizeDeps: {
        include: [
          'ant-design-vue/es/locale/zh_CN',
          'ant-design-vue/es/locale/en_US',
          '@ant-design/icons-vue',
          'dayjs',
          'dayjs/locale/eu',
          'dayjs/locale/zh-cn',
          '@pubinfo/pro-components',
          'qrcode',
          '@pubinfo/headlessui',
        ],
        esbuildOptions: {
          plugins: [
            cleanse(),
          ],
        },
      },
      build: {
        outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
        sourcemap: VITE_BUILD_SOURCEMAP === 'true',
        reportCompressedSize: false,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: {
            entryFileNames: `assets/entry/[name]-[hash]-${timestamp}.js`,
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router'],
              lodash: ['lodash-es'],
              antd: ['ant-design-vue', '@ant-design/icons-vue'],
              lottie: ['lottie-web'],
            },
          },
        },
      },
      define: {
        __SYSTEM_INFO__,
        _DEV_: mode === 'development',
        _PROD_: mode === 'production',
      },
      plugins: createVitePlugins(env, isBuild),
    };
    return mergeConfig(applicationConfig, defineOptions);
  });
}

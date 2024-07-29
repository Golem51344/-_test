/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-11-20 09:08:32
 * @LastEditTime: 2023-12-14 18:46:22
 * @LastEditors: wsy
 */
import process from 'node:process';
import { resolve } from 'node:path';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss';
import { presetThemes } from '@pubinfo/themes';
import global from 'fast-glob';

const pathResolve = (pathname: string) => resolve(process.cwd(), '.', pathname);

export const themesPath = global.sync(
  [
    pathResolve('node_modules/@pubinfo/themes/src/system/dark/*.ts'),
    pathResolve('node_modules/@pubinfo/themes/src/system/light/*.ts'),
  ],
  {
    onlyFiles: true,
  },
);

export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  theme: {
    colors: {
      'ui-primary': 'rgb(var(--ui-primary))',
      'ui-text': 'rgb(var(--ui-text))',
    },
    breakpoints: {
      'sm': '768px',
      'smd': '1024px',
      'md': '1366px',
      'lg': '1440px',
      'xl': '1600px',
      '2xl': '1920px',
    },
  },
  presets: [
    presetThemes(),
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/router/**/*.ts',
      ],
    },
  },
  configDeps: themesPath,
});

import autoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import { PubInfoResolver } from '../resolve/import';

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      'vitest',
      {
        alova: [
          'useRequest',
          'invalidateCache',
        ],
      },
    ],
    dts: './types/auto-imports.d.ts',
    dirs: [
      './src/utils/composables/**',
      './src/composables/**/*',
      './src/api/modules/**/*.ts',
    ],
    resolvers: [
      AntDesignVueResolver(),
      IconsResolver({
        prefix: 'i',
      }),
      PubInfoResolver(),
    ],
  });
}

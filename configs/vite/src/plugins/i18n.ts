import { resolve } from 'node:path';
import process from 'node:process';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';

export default function createI18n() {
  const root = process.cwd();
  const pathResolve = (pathname: string) => resolve(root, '.', pathname);
  return vueI18n({
    include: `${pathResolve('src')}/locales/lang/**`,
  });
}

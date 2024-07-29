import { resolve } from 'node:path';
import { defineWorkspace } from 'vitest/config';

const pathResolve = (pathname: string) => resolve('.', pathname);

export default defineWorkspace([
  {
    test: {
      name: 'apps/rbac',
      globals: true,
      root: 'apps/rbac',
      environment: 'happy-dom',
      setupFiles: pathResolve('tests/vitest.setup.ts'),
      include: ['src/tests/**/*.spec.ts'],
    },
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${pathResolve('apps/rbac/src')}/`,
        },
        {
          find: /#\//,
          replacement: `${pathResolve('apps/rbac/types')}/`,
        },
      ],
    },
  },
  'configs/*',
  'scripts/*',
  'packages/*',
]);

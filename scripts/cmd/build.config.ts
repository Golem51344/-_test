import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/changelog.ts'],
  outDir: 'dist',
  rollup: {
    esbuild: {
      target: 'esnext',
    },
  },
});

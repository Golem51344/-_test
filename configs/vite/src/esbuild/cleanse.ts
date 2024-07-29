import fs from 'node:fs/promises';
import type { Plugin } from 'esbuild';

export function cleanse(): Plugin {
  return {
    name: 'esbuild-plugin-cleanse',
    setup(build) {
      build.onLoad({ filter: /\/dist\/alova\.esm\.js$/ }, async (args) => {
        let alovaContnet = await fs.readFile(args.path, 'utf-8');
        alovaContnet = alovaContnet.replace(/\/\* c8 ignore start \*\/[\s\S]*?\/\* c8 ignore stop \*\//g, '');
        return {
          contents: `${alovaContnet}`,
        };
      });
    },
  };
}

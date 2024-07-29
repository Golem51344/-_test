import type { Plugin, UserConfig } from 'vite';
import fg from 'fast-glob';

interface PreprocessorOptions {
  globs: string[]
}

class Ctx {
  private root!: string;
  private globs: string[];
  private sourcePath!: string[];
  public path!: string;
  constructor(options: PreprocessorOptions) {
    this.globs = options.globs;
  }

  setRoot(root: string) {
    this.root = root;
  }

  searchGlob() {
    const { root, globs } = this;
    this.sourcePath = fg.sync(globs, {
      cwd: root,
      onlyFiles: true,
    });
    this.normalizePath();
  }

  normalizePath() {
    const path: string[] = [];
    for (const f of this.sourcePath) {
      path.push(`@use "${f}" as *;`);
    }
    this.path = path.join('');
  }
}

function scssPreprocessor(options: PreprocessorOptions): Plugin {
  const ctx = new Ctx(options);
  return {
    name: 'vite-plugin-scssPreprocessor',
    enforce: 'pre',
    config: (config: UserConfig) => {
      ctx.setRoot(config.root!);
      ctx.searchGlob();
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: ctx.path,
            },
          },
        },
      };
    },
  };
}

export default function createPreprocessor(): Plugin {
  return scssPreprocessor({
    globs: ['src/assets/styles/resources/*.scss'],
  });
}

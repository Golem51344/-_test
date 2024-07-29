import process from 'node:process';
import { join, relative, resolve } from 'node:path';
import { Buffer } from 'node:buffer';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import type { Plugin, ResolvedConfig } from 'vite';
import JSZip from 'jszip';
import fse from 'fs-extra/esm';
import { consola } from 'consola';

interface Options {
  root: string
  outDirName: string
}

class Ctx {
  root!: string;
  outDirName!: string;
  dir!: string;
  outDir!: string;

  setOptions(options: Options) {
    this.root = options.root;
    this.outDirName = options.outDirName;
    this.getDirPath();
  }

  getDirPath() {
    const dir = resolve(this.root, this.outDirName);
    const outDir = `${dir}.zip`;
    this.dir = dir;
    this.outDir = outDir;
  }

  async clean() {
    const pathExists: boolean = await fse.pathExists(this.outDir);
    if (pathExists) {
      fse.remove(this.outDir);
    }
  }

  async compress() {
    const zip = new JSZip();
    const files = this.getAllFiles(this.dir);
    if (files && Array.isArray(files) && files.length) {
      files.forEach((file: string) => {
        const fileData = readFileSync(file, { encoding: 'binary' });
        zip.file(relative(this.dir, file), fileData, { binary: true });
      });
    }
    const content = await zip.generateAsync({ type: 'arraybuffer' });
    writeFileSync(this.outDir, Buffer.from(content));
  }

  getAllFiles(dirPath: string): string[] {
    const files = readdirSync(dirPath);
    const result = [];
    for (const file of files) {
      const filePath = join(dirPath, file);
      if (statSync(filePath).isDirectory()) {
        result.push(...this.getAllFiles(filePath));
      }
      else {
        result.push(filePath);
      }
    }
    return result;
  }
}
const ctx = new Ctx();

function zipPack(): Plugin {
  return {
    name: 'vite-plugin-zip',
    apply: 'build',
    enforce: 'post',
    configResolved(configuration: ResolvedConfig) {
      const outDirName = configuration.build.outDir;
      const root = configuration.root;
      ctx.setOptions({ root, outDirName });
    },
    buildEnd() {
      let isCompress = false;
      process.on('beforeExit', async () => {
        if (isCompress) {
          return;
        }
        consola.start('将文件包压缩成zip...');
        isCompress = true;
        await ctx.clean();
        await ctx.compress();
        consola.success('文件压缩完成');
        consola.success('打包流程结束!');
      });
    },
  };
}

export default function createZip() {
  return zipPack();
}

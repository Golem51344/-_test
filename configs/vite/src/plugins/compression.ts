import compression from 'vite-plugin-compression';
import type { Plugin } from 'vite';

export default function createCompression(env: Record<string, string>) {
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const plugin: Plugin[] = [];
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        ext: '.gz',
        deleteOriginFile: false,
      }),
    );
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false,
      }),
    );
  }
  return plugin;
}

import { readPackageJSON } from 'pkg-types';
import dayjs from 'dayjs';
import type { ProxyOptions } from 'vite';
import consola from 'consola';
import chalk from 'chalk';

export async function createDefineSystemInfo(root: string) {
  try {
    const pkgJson = await readPackageJSON(root);
    const { dependencies, devDependencies, version } = pkgJson;
    const lastBuildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const SYSTEM_INFO = {
      pkg: {
        dependencies,
        devDependencies,
        version,
      },
      lastBuildTime,
    };
    return JSON.stringify(SYSTEM_INFO);
  }
  catch (error) {
    return '';
  }
}

export function getServerProxy(env: Record<string, string>, isProxy: boolean, rewrite = true) {
  if (!isProxy) {
    return {};
  }
  const targetPrefix = 'VITE_APP_API_';
  const proxyKey = Object.keys(env).filter(key => key.startsWith(targetPrefix));
  const serverProxy: Record<string, ProxyOptions> = {};
  for (const envKey of proxyKey) {
    const url = env[envKey];
    const { pathname } = new URL(url);
    const pk = `${pathname}/proxy`;
    if (pk in serverProxy) {
      consola.error(`The proxy key ${(chalk.bold.redBright(envKey))} ➜ ${chalk.bold.yellowBright(url)} already exists`);
    }
    else {
      serverProxy[pk] = {
        target: url,
        changeOrigin: rewrite,
        rewrite: (path) => {
          return path.replace(pk, '');
        },
      };
    }
  }
  return serverProxy;
}

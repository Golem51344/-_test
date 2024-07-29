// 重写 `pkg-types` 的 `findWorkspaceDir`
import process from 'node:process';
import { statSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'pathe';
import type { FindFileOptions, ResolveOptions } from 'pkg-types';
import { resolvePath } from 'mlly';

/**
 * Detects the workspace directory based on common project markers (`.git`, lockfiles, `package.json`).
 * Throws an error if the workspace root cannot be detected.
 * @param id - The base path to search, defaults to the current working directory.
 * @param options - Options to modify the search behaviour. See {@link ResolveOptions}.
 * @returns a promise resolving to the path of the detected workspace directory.
 */
export async function findWorkspaceDir(
  id: string = process.cwd(),
  options: ResolveOptions = {},
): Promise<string> {
  const resolvedPath = isAbsolute(id) ? id : await resolvePath(id, options);
  const _options = { startingFrom: resolvedPath, ...options };

  // Lookup for .git/config
  try {
    const r = await findNearestFile('.git/config', _options);
    return resolve(r, '../..');
  }
  catch {
    // Ignore
  }

  // Lookdown for lockfile
  try {
    const r = await resolveLockfile(resolvedPath, {
      ..._options,
      // reverse: true,
    });
    return dirname(r);
  }
  catch {
    // Ignore
  }

  // Lookdown for package.json
  try {
    const r = await findFile(resolvedPath, _options);
    return dirname(r);
  }
  catch {
    // Ignore
  }

  throw new Error(`Cannot detect workspace root from ${id}`);
}

const lockFiles = [
  'yarn.lock',
  'package-lock.json',
  'pnpm-lock.yaml',
  'npm-shrinkwrap.json',
  'bun.lockb',
];

export async function resolveLockfile(
  id: string = process.cwd(),
  options: ResolveOptions = {},
): Promise<string> {
  const resolvedPath = isAbsolute(id) ? id : await resolvePath(id, options);
  const _options = { startingFrom: resolvedPath, ...options };
  try {
    return await findNearestFile(lockFiles, _options);
  }
  catch {
    // Ignore
  }
  throw new Error(`No lockfile found from ${id}`);
}

/**
 * Asynchronously finds the next file with the given name, starting in the given directory and moving up.
 * Alias for findFile without reversing the search.
 * @param filename - The name of the file to find.
 * @param _options - Options to customise the search behaviour.
 * @returns A promise that resolves to the path of the next file found.
 */
export function findNearestFile(
  filename: string | string[],
  _options: FindFileOptions = {},
): Promise<string> {
  return findFile(filename, _options);
}

const defaultFindOptions: Required<FindFileOptions> = {
  startingFrom: '.',
  rootPattern: /^node_modules$/,
  reverse: false,
  test: (filePath: string) => {
    try {
      if (statSync(filePath).isFile()) {
        return true;
      }
    }
    catch {
      // Ignore
    }
  },
};

/**
 * Asynchronously finds a file by name, starting from the specified directory and traversing up (or down if reverse).
 * @param filename - The name of the file to find.
 * @param _options - Options to customise the search behaviour.
 * @returns a promise that resolves to the path of the file found.
 * @throws Will throw an error if the file cannot be found.
 */
export async function findFile(
  filename: string | string[],
  _options: FindFileOptions = {},
): Promise<string> {
  const filenames = Array.isArray(filename) ? filename : [filename];
  const options = { ...defaultFindOptions, ..._options };
  const basePath = resolve(options.startingFrom);
  const leadingSlash = basePath[0] === '/';
  const segments = basePath.split('/').filter(Boolean);

  // Restore leading slash
  if (leadingSlash) {
    segments[0] = `/${segments[0]}`;
  }

  // Limit to node_modules scope if it exists
  let root = segments.findIndex(r => r.match(options.rootPattern));
  if (root === -1) {
    root = 0;
  }

  if (options.reverse) {
    for (let index = root + 1; index <= segments.length; index++) {
      for (const filename of filenames) {
        const filePath = join(...segments.slice(0, index) as [], filename);
        if (await options.test(filePath)) {
          return filePath;
        }
      }
    }
  }
  else {
    for (let index = segments.length; index > root; index--) {
      for (const filename of filenames) {
        const filePath = join(...segments.slice(0, index) as [], filename);
        if (await options.test(filePath)) {
          return filePath;
        }
      }
    }
  }

  throw new Error(
    `Cannot find matching ${filename} in ${options.startingFrom} or parent directories`,
  );
}

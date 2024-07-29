import process from 'node:process';
import { basename } from 'node:path';
import { readPackageJSON } from 'pkg-types';
import fg from 'fast-glob';
import { findWorkspaceDir } from './rewrite-pkg-types';

type PackageJson = Awaited<ReturnType<typeof readPackageJSON>>;

export interface PackagesWorkspaceInfo {
  name: string
  path: string
  workspaceName: string
  description: string
}

/**
 * 获取工作区的根目录。
 * @returns {Promise<string>} 一个解析为工作区根目录的 Promise。
 */
export async function getWorkspaceRoot() {
  const cwd = process.cwd();
  const root = await findWorkspaceDir(cwd);
  return root;
}

/**
 * 从指定路径获取包信息。
 * @param {string} path - 包的路径。
 * @returns {Promise<PackageJson>} - 一个解析为包信息的 Promise。
 */
async function getPackageInfo(path: string): Promise<PackageJson> {
  const pkg = await readPackageJSON(path);
  return pkg;
}

/**
 * 根据给定的 areaWorkspace 迭代并获取每个 workspace 的包信息，从而对工作区信息进行规范化。
 * @param areaWorkspace 要规范化的 areaWorkspace。
 * @returns 包含规范化工作区信息的 PackagesWorkspaceInfo 对象数组。
 */
export async function normalizeWorkspaceInfo(areaWorkspace) {
  const packagesWorkspaceInfo: PackagesWorkspaceInfo[] = [];

  for await (const iterator of areaWorkspace) {
    const pkg = await getPackageInfo(iterator);
    const workspace = {
      name: basename(iterator),
      path: iterator,
      workspaceName: pkg.name!,
      description: pkg.description!,
    };
    packagesWorkspaceInfo.push(workspace);
  }
  return packagesWorkspaceInfo;
}

export async function getPackages(workspace) {
  const workspaceRoot = await getWorkspaceRoot();
  const subWorkspace = await fg.async('*',
    {
      cwd: `${workspaceRoot}/${workspace}`,
      onlyDirectories: true,
      absolute: true,
    });

  const packages = await normalizeWorkspaceInfo(subWorkspace);
  return packages;
}

export async function getAppsWorkspace() {
  const targetName = 'apps';
  const appWorkspaceInfo = await getPackages(targetName);
  return appWorkspaceInfo;
}

/**
 * 获取项目中所有工作区的信息。
 *
 * @returns 包含每个工作区的包信息的映射。
 */
export async function getAllWorkspace() {
  const root = await getWorkspaceRoot();
  const allWorkspace = await fg.async(['**/package.json'],
    {
      cwd: `${root}`,
      absolute: true,
      ignore: [
        '**/node_modules/**',
        `${root}/package.json`,
      ],
    });

  const allWorkspacePkgs: Map<string, PackageJson> = new Map();
  for await (const workspace of allWorkspace) {
    const pkg = await getPackageInfo(workspace);
    allWorkspacePkgs.set(pkg.name!, pkg);
  }
  return allWorkspacePkgs;
}

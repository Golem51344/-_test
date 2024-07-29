import consola from 'consola';
import { execa } from 'execa';
import chalk from 'chalk';
import { getAppsWorkspace } from '../utils/workspace';
import type { PackagesWorkspaceInfo } from '../utils/workspace';

function normalize(workspace: PackagesWorkspaceInfo[]) {
  const workspaceInfo = workspace.map(({ name, workspaceName, description }) =>
    ({
      value: workspaceName,
      label: name,
      hint: description,
    }),
  );
  return workspaceInfo;
}

async function main() {
  const workspace = await getAppsWorkspace();
  const options = await normalize(workspace);
  const selected = await consola.prompt(chalk.bold.green('🍰 请选择要执行打包命令的系统（可多选）'), {
    type: 'multiselect',
    required: false,
    options,
  }) as unknown as string[];

  const adaptationTurbo = selected.map(item => `--filter=${item}`);

  try {
    await execa('pnpm', ['turbo', 'run', 'build', ...adaptationTurbo], {
      stdio: 'inherit',
      preferLocal: true,
    });
  }
  catch (error) {
    consola.error(error.shortMessage);
  }
}

main();

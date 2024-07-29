import { consola } from 'consola';
import chalk from 'chalk';
import { getAppsWorkspace } from '../utils/workspace';
import { runScript } from '../utils/index';
import { bootstrop } from './log';

export async function run(command: string) {
  const appWorkspaceInfo = await getAppsWorkspace();
  const options = appWorkspaceInfo.map((app) => {
    return {
      label: app.name,
      value: app.workspaceName,
      hint: app.description,
    };
  });
  bootstrop();
  if (options.length === 1) {
    runScript(options[0].value, command);
    return;
  }
  const selectedWorkspace = await consola.prompt(chalk.bold.green(`🍰 选择要执行 ${chalk.bold.yellow(command)} 命令的仓库`), {
    type: 'select',
    options,
  }) as unknown as string;

  if (typeof selectedWorkspace === 'symbol') {
    return;
  }
  runScript(selectedWorkspace, command);
}

run('dev').catch((error) => {
  console.log(error);
});

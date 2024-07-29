import { consola } from 'consola';
import chalk from 'chalk';
import { execa } from 'execa';
import { isSymbol } from 'lodash-es';
import { getAllWorkspace } from '../utils/workspace';

async function main() {
  const workspaces = await getAllWorkspace();
  const nameScope = [...workspaces.keys()];

  const selectedWorkspace = await consola.prompt(chalk.bold.green(`请选择要执行指令的仓库\n`), {
    type: 'select',
    options: nameScope.map((item) => {
      return {
        label: `${chalk.bold.green('→')} ${item}`,
        value: item,
      };
    }),
  }) as unknown as string;

  if (isSymbol(selectedWorkspace)) {
    return;
  }

  const scripts = Object.keys(workspaces.get(selectedWorkspace).scripts || {});

  if (!scripts.length) {
    consola.info(`当前仓库没有可执行的脚本`);
    return;
  }

  const selectedScript = await consola.prompt(chalk.bold.green(`请选择要执行的指令\n`), {
    type: 'select',
    options: scripts,
  }) as unknown as string;

  if (isSymbol(selectedScript)) {
    return;
  }

  execa('pnpm', ['--filter', `${selectedWorkspace}`, 'run', `${selectedScript}`], {
    stdio: 'inherit',
    preferLocal: true,
  });
}

main();

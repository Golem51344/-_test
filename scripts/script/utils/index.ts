import { execa } from 'execa';

export async function runScript(workspace: string, command: string) {
  execa('pnpm', ['--filter', `${workspace}`, 'run', `${command}`], {
    stdio: 'inherit',
    preferLocal: true,
  });
}

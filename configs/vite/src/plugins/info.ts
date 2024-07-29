import boxen from 'boxen';
import chalk from 'chalk';
import type { PluginOption } from 'vite';

interface Options {
  root: string
}

class Ctx {
  public options!: Options;
  setOptions(options: Options) {
    this.options = options;
  }

  async createInfo() {
    // eslint-disable-next-line no-console
    console.log(
      boxen(`\
欢迎使用${chalk.bold.greenBright(' 技术底座管理系统 ')}

如果要修改${chalk.yellow('config/*')} 或者 ${chalk.yellow('scripts/*')}下的配置文件
请先执行${chalk.yellow(' pnpm run stub ')}启动文件监听编译\n
${chalk.green('使用文档地址')} ${chalk.green('➜')} http://124.223.184.245:10000/docs
`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
        borderColor: 'yellowBright',
        borderStyle: 'round',
      },
      ),
    );
  }
}

const ctx = new Ctx();

export function appInfo(): PluginOption {
  return {
    name: 'appInfo',
    apply: 'serve',
    enforce: 'pre',
    configResolved(configuration) {
      const root = configuration.root;
      ctx.setOptions({
        root,
      });
    },
    async buildStart() {
      ctx.createInfo();
    },
    configureServer(server) {
      const _printUrls = server.printUrls;
      server.printUrls = () => {
        // eslint-disable-next-line no-console
        console.log(`  ${chalk.green('➜')}  ${chalk.bold.bgBlueBright(` PUBINFO `)}${chalk.bold.bgYellowBright(` 前端基础框架 `)}`);
        _printUrls();
      };
    },
  };
}

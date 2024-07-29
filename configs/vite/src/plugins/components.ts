import components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import { PubInfoResolver } from '../resolve/components';

export default function createComponents() {
  return components({
    dirs: [
      'src/components',
      'src/layouts/ui-kit',
    ],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    resolvers: [
      IconsResolver(),
      AntDesignVueResolver({
        resolveIcons: true,
        importStyle: false,
      }),
      PubInfoResolver(),
    ],
    dts: './types/components.d.ts',
  });
}

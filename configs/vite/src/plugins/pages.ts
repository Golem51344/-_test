import VueRouter from 'unplugin-vue-router/vite';

export default function createPages() {
  return VueRouter({
    routesFolder: 'src/views',
    extensions: ['.vue'],
    exclude: [
      '**/components/**/*.vue',
    ],
    dts: './types/router.d.ts',
    importMode: 'async',
  });
}

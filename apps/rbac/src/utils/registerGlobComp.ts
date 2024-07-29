import type { App } from 'vue';
import FloatingVue from 'floating-vue';
import Message from 'vue-m-message';
import VXETable from 'vxe-table';

// TODO 需要在入口文件的位置，配置dayjs的语言，才能使ant中的时间选择组件显示正确的语言
import '@/utils/dayjs';

import 'vue-m-message/dist/style.css';
import 'floating-vue/dist/style.css';

import '@/assets/styles/vxe-table.scss';

export function registerGlobComp(app: App<Element>) {
  app.use(Message);
  app.use(FloatingVue, {
    distance: 12,
    themes: {
      'more-appley': {
        placement: 'bottom',
      },
      'not-cursor': {
        placement: 'bottom',
      },
    },
  });
  app.use(VXETable);
}

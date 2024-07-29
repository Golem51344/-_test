import MultilevelMenuExample from './modules/multilevel.menu.example';

import type { Menu } from '#/menu';

const menu: Menu.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
];

export default menu;

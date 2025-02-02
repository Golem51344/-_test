import type { Menu } from '#/menu';

const menus: Menu.recordRaw = {
  meta: {
    title: '多级导航',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: '/multilevel_menu_example/page',
      meta: {
        title: '导航1',
        icon: 'i-fluent-emoji-flat:backhand-index-pointing-left',
      },
    },
    {
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: '/multilevel_menu_example/level2/page',
          meta: {
            title: '导航2-1',
          },
        },
        {
          meta: {
            title: '导航2-2',
          },
          children: [
            {
              path: '/multilevel_menu_example/level2/level3/page1',
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: '/multilevel_menu_example/level2/level3/page2',
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default menus;

import { defineFakeRoute } from 'vite-plugin-fake-server/client';
import Mock from 'mockjs';

export default defineFakeRoute([
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      return {
        error: '',
        code: 0,
        data: Mock.mock({
          account: body.account,
          token: `${body.account}_@string`,
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
          avatar: '',
        }),
      };
    },
  },
  {
    url: '/mock/user/permission',
    method: 'get',
    response: ({ headers }) => {
      let permissions: string[] = [];
      if (headers.authorization?.indexOf('admin') === 0) {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ];
      }
      else if (headers.authorization?.indexOf('test') === 0) {
        permissions = [
          'permission.browse',
        ];
      }
      return {
        error: '',
        code: 0,
        data: {
          permissions,
        },
      };
    },
  },
  {
    url: '/mock/user/password/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: '/mock/user/preferences',
    method: 'get',
    response: ({ headers }) => {
      let preferences = '';
      if (headers.authorization?.indexOf('admin') === 0) {
        preferences = '{"app":{"colorScheme":"light"}}';
      }
      else if (headers.authorization?.indexOf('test') === 0) {
        preferences = '{"app":{"colorScheme":"dark"},"menu":{"menuMode":"head","isRounded":false,"menuActiveStyle":""},"layout":{"widthMode":"center"},"tabbar":{"enable":false}}';
      }
      return {
        error: '',
        code: 0,
        data: {
          preferences,
        },
      };
    },
  },
  {
    url: '/mock/user/preferences/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: '/mock/user/tabbar',
    method: 'get',
    response: ({ headers }) => {
      let tabbar = '';
      if (headers.token?.indexOf('admin') === 0) {
        tabbar = '';
      }
      return {
        error: '',
        code: 0,
        data: {
          tabbar,
        },
      };
    },
  },
  {
    url: '/mock/user/tabbar/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      };
    },
  },
  {
    url: '/mock/user/favorites',
    method: 'get',
    response: ({ headers }) => {
      let favorites = '';
      if (headers.token?.indexOf('admin') === 0) {
        favorites = '[{"fullPath":"/multilevel_menu_example/page","title":"导航1","i18n":"route.multimenu.page","icon":"i-heroicons-solid:menu-alt-3"}]';
      }
      return {
        error: '',
        code: 0,
        data: {
          favorites,
        },
      };
    },
  },
  {
    url: '/mock/user/favorites/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      };
    },
  },
]);

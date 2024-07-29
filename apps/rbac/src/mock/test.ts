import { defineFakeRoute } from 'vite-plugin-fake-server/client';

defineFakeRoute([
  {
    url: '/auth/login/validCode',
    method: 'get',
    response() {
      return {
        code: 0,
        data: {
          a: 1,
        },
      };
    },
  },
]);
